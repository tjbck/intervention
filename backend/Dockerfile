# syntax=docker/dockerfile:1

######## WebUI frontend ########
FROM node:21-alpine3.19 as build

WORKDIR /app

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ .
RUN npm run build

######## WebUI backend ########
FROM python:3.11-slim-bookworm as base

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY --chown=$UID:$GID --from=build /app/build /app/frontend/build
COPY . .

ENV ENV=prod
CMD [ "sh", "start.sh"]

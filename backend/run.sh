docker rm -f interventions || true
docker build -t interventions .
docker run -d -p 7777:7777 --env-file .env --name interventions --restart always interventions
docker image prune -f
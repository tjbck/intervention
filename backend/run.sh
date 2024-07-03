docker rm -f intervention || true
docker build -t intervention .
docker run -d -p 7777:7777 --env-file .env --name intervention --restart always intervention
docker image prune -f
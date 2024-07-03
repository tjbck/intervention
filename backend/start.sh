PORT="${PORT:-7777}"
HOST="${HOST:-0.0.0.0}"

uvicorn main:app --host "$HOST" --port "$PORT" --forwarded-allow-ips '*'

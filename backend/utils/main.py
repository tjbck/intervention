import requests
from config import WEBHOOK_URL


def send_webhook(content: str):
    if WEBHOOK_URL:
        r = requests.post(
            WEBHOOK_URL,
            json={
                "content": content,
                "embeds": None,
                "attachments": [],
            },
        )
        return r
    else:
        return None

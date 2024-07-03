from pymongo import MongoClient
from pathlib import Path
import os

from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())


####################################
# ENV
####################################

ENV = os.environ.get("ENV", "dev")

####################################
# DIR
####################################


BACKEND_DIR = Path(__file__).parent  # the path containing this file
FRONTEND_BUILD_DIR = Path(BACKEND_DIR / "frontend" / "build").resolve()


####################################
# DB
####################################


DB_URL = os.environ.get(
    "DB_URL", "mongodb://root:root@localhost:27017/?authSource=admin"
)

DB_CLIENT = MongoClient(f"{DB_URL}")
DB = DB_CLIENT["intervention"]


####################################
# OPENAI_API
####################################

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "")
OPENAI_API_BASE_URL = os.environ.get("OPENAI_API_BASE_URL", "")

if OPENAI_API_BASE_URL == "":
    OPENAI_API_BASE_URL = "https://api.openai.com/v1"

####################################
# WEBHOOK_URL
####################################

WEBHOOK_URL = os.environ.get("WEBHOOK_URL", "")

####################################
# MISCELLANEOUS
####################################

MAX_PARTICIPANTS_COUNT = int(os.environ.get("MAX_PARTICIPANTS_COUNT", 60))

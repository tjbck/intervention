from fastapi import Response
from fastapi import Cookie
from fastapi import Depends, FastAPI, HTTPException, status
from datetime import datetime, timedelta
from typing import List, Union

from fastapi import APIRouter
from pydantic import BaseModel
import time
import uuid

from apps.v1.models.usage import Usage, UsageForm, UsageModel
from apps.v1.models.users import Users
from config import ENV

router = APIRouter()

############################
# AddSessionUsage
############################


@router.post("/", response_model=UsageModel)
def add_session_usage(form_data: UsageForm):
    user = Users.get_user_by_id(form_data.user_id)
    if not user:
        raise HTTPException(status_code=400, detail="User ID not found")

    usage = Usage.insert_one(form_data)
    return usage

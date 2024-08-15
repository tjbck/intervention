from fastapi import Response
from fastapi import Cookie
from fastapi import Depends, FastAPI, HTTPException, status
from datetime import datetime, timedelta
from typing import List, Union

from fastapi import APIRouter
from pydantic import BaseModel
import time
import uuid


from apps.v1.models.users import Users, UserModel, UserSignUpForm, Survey, ExitSurvey
from utils.main import send_webhook

from config import ENV, MAX_PARTICIPANTS_COUNT


router = APIRouter()

#########################
# GetUsers
#########################


@router.get("/", response_model=List[UserModel])
def get_users():
    users = Users.get_users()
    return users


#########################
# GetUserCount
#########################


@router.get("/count")
def get_user_count():
    user_count = Users.get_user_count()
    return {"user_count": user_count, "max_participants_count": MAX_PARTICIPANTS_COUNT}


#########################
# GetUserById
#########################


@router.get("/{id}", response_model=UserModel)
def get_user_by_id(id: str):
    user = Users.get_user_by_id(id)
    if user:
        return user
    else:
        raise HTTPException(status_code=404, detail="User ID not found")


#########################
# SignUp
#########################


@router.post("/signup")
def signup(form_data: UserSignUpForm):
    print(form_data)
    user = Users.get_user_by_email(form_data.email)
    if user:
        return user
    else:
        user_count = Users.get_user_count()
        if user_count <= MAX_PARTICIPANTS_COUNT:
            try:
                send_webhook(
                    f'Invisible Interventions: User #{user_count} "{form_data.name}" has signed up!\nEmail: {form_data.email}\nID: {form_data.external_id}'
                )
                return Users.insert_new_user(form_data)
            except Exception as e:
                raise HTTPException(
                    status_code=404,
                    detail="Something went wrong, please contact us via (jaeryang_baek@sfu.ca)!",
                )
        else:
            raise HTTPException(
                status_code=404,
                detail="We're sorry! Our research program is at full capacity. Thank you for your interest, but we are unable to accept new participants at this time.",
            )


#########################
# Survey
#########################


@router.post("/survey", response_model=UserModel)
def submit_survey(form_data: Survey):
    user = Users.get_user_by_email(form_data.email)
    if user:
        Users.update_user_by_id(user.id, {"survey": form_data.model_dump()})
        send_webhook(
            f'Invisible Interventions: User "{user.email}" has started the study!'
        )
        return user
    else:
        raise HTTPException(
            status_code=404,
            detail=f"{form_data.email} not found, please make sure you have signed up first! If the issue persists, please contact us via (jaeryang_baek@sfu.ca)",
        )


#########################
# ExitSurvey
#########################


@router.post("/survey/exit", response_model=UserModel)
def submit_exit_survey(form_data: ExitSurvey):
    user = Users.get_user_by_email(form_data.email)
    if user:
        Users.update_user_by_id(user.id, {"exit_survey": form_data.model_dump()})
        send_webhook(
            f'Invisible Interventions: User "{user.email}" has finished the study!'
        )
        return user
    else:
        raise HTTPException(
            status_code=404,
            detail="Something went wrong, please contact us via (jaeryang_baek@sfu.ca): User ID not found",
        )


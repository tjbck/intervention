from pydantic import BaseModel, ConfigDict
from typing import List, Union, Optional
from pymongo import ReturnDocument
import time
import uuid

from internal.db import get_next_sequence
from config import DB

####################
# User DB Schema
####################


class Survey(BaseModel):
    email: str
    date: str
    age: str | int
    gender: str
    race: str
    app_usage_frequency: str
    mindless_usage_frequency: str
    average_mindless_usage_duration_minutes: str | int
    model_config = ConfigDict(extra="allow")


class ExitSurvey(BaseModel):
    email: str
    date: str
    helpfulness: str
    continuedUse: str
    socialMediaEnjoyment: str
    usagePatternChange: str
    primaryGoal: str
    goalAchievement: str
    specificChanges: str
    concentration: str
    productivity: str
    usability: str
    selfAwareness: str
    control: str
    intrusiveness: str
    wellBeingImprovement: str
    likedMost: str
    dislikedMost: str
    improvementSuggestions: Optional[str]
    additionalComments: Optional[str]
    model_config = ConfigDict(extra="allow")


class UserModel(BaseModel):
    id: str
    external_id: Optional[str] = None
    email: str
    createdAt: int
    survey: Optional[Survey] = None
    exit_survey: Optional[ExitSurvey] = None


####################
# Forms
####################


class UserSignUpForm(BaseModel):
    external_id: Optional[str] = None
    email: str
    survey: Optional[Survey] = None


class UsersTable:
    def __init__(self, db):
        self.db = db
        self.table = db.users

    def insert_new_user(self, form_data: UserSignUpForm) -> Optional[UserModel]:
        user_id = get_next_sequence("user_id")
        user = UserModel(
            **{
                **form_data.model_dump(exclude_none=True),
                "id": str(user_id),
                "createdAt": int(time.time()),
            }
        )
        result = self.table.insert_one(user.model_dump())
        if result:
            return user
        else:
            return None

    def get_user_by_email(self, email: str) -> Optional[UserModel]:
        user = self.table.find_one({"email": email}, {"_id": False})

        if user:
            return UserModel(**user)
        else:
            return None

    def get_user_by_id(self, id: str) -> Optional[UserModel]:
        user = self.table.find_one({"id": id}, {"_id": False})

        if user:
            return UserModel(**user)
        else:
            return None

    def update_user_by_id(self, id: str, updated: dict) -> Optional[UserModel]:
        user = self.table.find_one_and_update(
            {"id": id}, {"$set": updated}, return_document=ReturnDocument.AFTER
        )
        return UserModel(**user)

    def get_users(self) -> List[UserModel]:
        users = self.table.find({}, {"_id": False})
        return [UserModel(**user) for user in users]

    def get_user_count(self) -> int:
        return self.table.count_documents({})


Users = UsersTable(DB)

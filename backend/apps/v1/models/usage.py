from pydantic import BaseModel, ConfigDict
from typing import List, Union, Optional
from pymongo import ReturnDocument
import time
import uuid

from config import DB

####################
# Usage Schema
####################


class UsageModel(BaseModel):
    id: str
    user_id: str
    extension_id: str
    timestamp: int
    model_config = ConfigDict(extra="allow")


####################
# Forms
####################


class UsageForm(BaseModel):
    user_id: str
    extension_id: str
    event_id: Optional[str] = None


class UsageTable:
    def __init__(self, db):
        self.db = db
        self.table = db.usage

    def insert_one(self, form_data: UsageForm) -> Optional[UsageModel]:
        usage = UsageModel(
            **{
                **form_data.model_dump(),
                "id": str(uuid.uuid4()),
                "timestamp": int(time.time()),
            }
        )

        result = self.table.insert_one(usage.model_dump())
        if result:
            return usage
        else:
            return None

    def get_usage_by_user_id(self, user_id: str) -> List[UsageModel]:
        usages = self.table.find({"user_id": user_id}, {"_id": False})
        return [UsageModel(**usage) for usage in usages]

    def get_usage_by_extension_id(self, extension_id: str) -> List[UsageModel]:
        usages = self.table.find({"extension_id": extension_id}, {"_id": False})
        return [UsageModel(**usage) for usage in usages]

    def get_usage_by_user_id_and_extension_id(
        self, user_id: str, extension_id: str
    ) -> List[UsageModel]:
        usages = self.table.find(
            {"user_id": user_id, "extension_id": extension_id}, {"_id": False}
        )
        return [UsageModel(**usage) for usage in usages]


Usage = UsageTable(DB)

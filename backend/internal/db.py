from pymongo.collection import ReturnDocument
from config import DB


def get_next_sequence(name):
    if DB["counters"].find_one({"_id": name}) is None:
        DB["counters"].insert_one({"_id": name, "seq": 0})

    counter = DB["counters"].find_one_and_update(
        {"_id": name}, {"$inc": {"seq": 1}}, return_document=ReturnDocument.AFTER
    )
    return counter["seq"]

"""Database functions for Topics"""

# pylint: disable=unspecified-encoding
import datetime
import json
from typing import Any
from bson import json_util

from dailytide.config import MakeConfig
from dailytide.db.session import upsert_to_mongo


def get_topics(db, start_date, end_date):
    """Get topics from the database"""
    collection = db["Topics"]
    return collection.find(
        {"start_time": {"$gte": start_date}, "end_time": {"$lte": end_date}}
    )


def _update_existing_topics(db: Any):
    """Update existing topics to have an end_time of now"""
    db["Topics"].update_many(
        {"end_time": datetime.datetime.fromisoformat("9999-12-31")},
        {"$set": {"end_time": datetime.datetime.now()}},
    )


def ingest_topics(db: Any):
    """Ingest topics into the database"""
    with open(MakeConfig.selected_results, "r") as f:
        data = json_util.loads(f.read())
    _update_existing_topics(db)

    # get datetime today, but change the time to 5am
    start_time = datetime.datetime.now().replace(
        hour=5, minute=0, second=0, microsecond=0
    )

    data = [
        {
            **topic,
            "start_time": start_time,
            "end_time": datetime.datetime.fromisoformat(
                "9999-12-31"
            ),  # setting it to inifinity for the latest topic collection
        }
        for topic in data
    ]
    upsert_to_mongo(data, db, collection_name="Topics")
    print("successfully ingested topics")

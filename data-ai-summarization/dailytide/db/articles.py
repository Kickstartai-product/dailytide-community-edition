"""Database functions for Articles"""

# pylint: disable=unspecified-encoding
import datetime
from typing import Any, Optional

import bson.json_util

from dailytide.config import MakeConfig
from dailytide.db.session import upsert_to_mongo


def get_articles(
    db,
    start_date: datetime.datetime,
    end_date: datetime.datetime,
    article_type: Optional[str] = None,
):
    """Get articles from the database by date range (inclusive)"""
    db_filter: dict[str, Any] = {"created": {"$gte": start_date, "$lte": end_date}}

    if article_type:
        db_filter["source"] = article_type

    collection = db["Articles"]
    return collection.find(db_filter)


def ingest_articles(db: Any):
    """Ingest articles into the database"""
    with open(MakeConfig.data, "r") as f:
        json_str = f.read()
    data = bson.json_util.loads(json_str)
    upsert_to_mongo(data, db, collection_name="Articles")

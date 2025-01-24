"""Database functions for Categories"""

from typing import Any

# pylint: disable=unspecified-encoding


def get_categories(db) -> list[Any]:
    """Get articles from the database by date range (inclusive)"""

    collection = db["Categories"]
    return list(collection.find({}))

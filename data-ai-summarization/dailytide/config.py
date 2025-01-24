"""Configuration settings for the project"""

# pylint: disable=too-few-public-methods
import os
from typing import Optional

from dotenv import load_dotenv

load_dotenv()


class MakeConfig:
    """Dataclass to store configuration settings"""

    # JSON file paths
    data: str = "data/articles.json"
    first_topics: str = "data/first_topics.json"
    selected_results: str = "data/selected_results.json"

    # ENV Variables
    DATA_SOURCES: list[str] = os.getenv("DATA_SOURCES", "News,X").split(",")
    X_ACCOUNTS: list[str] = os.getenv("X_ACCOUNTS", "rowancheung,ylecun").split(",")
    TWITTER_TOKEN: Optional[str] = os.getenv("TWITTER_TOKEN")
    BING_SUBSCRIPTION_KEY: Optional[str] = os.getenv("BING_SUBSCRIPTION_KEY")
    OPENAI_API_KEY: Optional[str] = os.getenv("OPENAI_API_KEY")
    TOPIC_MODE: str = os.getenv("TOPIC_MODE", "llm")
    NEWS_DAYS: int = int(os.getenv("NEWS_DAYS", "1"))
    TWEET_DAYS: int = int(os.getenv("NEWS_DAYS", "1"))

    # DB env
    MONGODB_USERNAME = os.environ.get("MONGODB_USERNAME")
    MONGODB_PASSWORD = os.environ.get("MONGODB_PASSWORD")
    MONGODB_HOST = os.environ.get("MONGODB_HOST")

    # Other settings
    SEED = 42
    TOKEN_LIMIT = 10000
    DATA_DIR = "data"
    X_LIST_ID = 1775451926517149922


class TopicConfig:
    """Dataclass to store topic configuration settings,
    should also be able to modify these later on"""

    N_MAX_LINKS: int = 5

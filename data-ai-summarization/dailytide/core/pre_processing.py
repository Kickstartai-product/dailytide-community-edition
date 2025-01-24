"""Module to preprocess the data"""

# pylint: disable=unspecified-encoding
import datetime

from dailytide.config import MakeConfig
from dailytide.db.articles import get_articles
from dailytide.db.session import make_connection
from dailytide.models import Article


def load_articles_from_database() -> list[Article]:
    """Load articles from the database"""
    articles = []
    db_conn = make_connection()

    for data_source in MakeConfig.DATA_SOURCES:
        if data_source == "X":
            time_window = MakeConfig.TWEET_DAYS
        elif data_source == "News":
            time_window = MakeConfig.NEWS_DAYS
        else:
            raise ValueError(f"Invalid document type: {data_source}")

        now = datetime.datetime.now()
        start_date = now - datetime.timedelta(days=time_window)

        print(f"Loading {data_source} articles from {start_date} to {now} (inclusive)")
        articles.extend(
            [
                Article(**a)
                for a in list(
                    get_articles(db_conn, start_date, now, article_type=data_source)
                )
            ]
        )

    return articles


def preprocess_data() -> list[Article]:
    """Preprocess the data
    Load the result from `extract_data.py`, and filter out the tweets that are not relevant
    All articles from other sources are kept
    """
    articles = load_articles_from_database()
    print(f"Loaded {len(articles)} articles")

    return [article for article in articles if article.is_valid()]

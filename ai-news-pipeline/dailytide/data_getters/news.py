"""Module to get news articles on ML/AI from Bing and Brave API"""

from typing import Any, Optional

import requests
from dateutil import parser

from dailytide.config import MakeConfig
from dailytide.data_getters import DEFAULT_TIMEOUT
from dailytide.utils import delay_execution


@delay_execution(seconds=5, tries=5, default_return=[])
def make_bing_request(endpoint, headers, params):
    """Make a request to the Bing API"""
    response = requests.get(
        endpoint, headers=headers, params=params, timeout=DEFAULT_TIMEOUT
    )
    response.raise_for_status()
    return response.json()["value"]


def get_bing(n_articles=100) -> list[dict[str, Any]]:
    """Get bing articles on on ML/AI
    :return: a list of dictionaries with the following keys: author, title, link, text
    """

    subscription_key: Optional[str] = MakeConfig.BING_SUBSCRIPTION_KEY

    if subscription_key is None:
        raise ValueError("Bing subscription key not found")

    # Add your Bing Search V7 subscription key and endpoint to your environment variables.
    endpoint = "https://api.bing.microsoft.com/v7.0/news/search"

    # Query term(s) to search for.
    query = "Machine learning AND artificial intelligence"

    # Construct a request
    mkt = "en-US"
    params = {"q": query, "mkt": mkt, "count": 100, "freshness": "Day"}
    headers = {"Ocp-Apim-Subscription-Key": subscription_key}
    progressive_offsets = [100 * i for i in range(n_articles // 100)]
    data = []

    for offset in progressive_offsets:
        page = make_bing_request(
            endpoint, headers=headers, params={"offset": offset, **params}
        )
        data += page
    unique_results = {d["url"]: d for d in data}.values()

    processed_results = [
        {
            "source_link": d.pop("url"),
            "summary": d.pop("description"),
            "created": parser.parse(d.pop("datePublished")),
            "source": "News",
            "author": d["provider"][0]["name"],
            "title": d.pop("name"),
        }
        for d in unique_results
    ]

    return processed_results

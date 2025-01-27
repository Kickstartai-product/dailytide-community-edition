"""Module to get data from Reddit"""

from datetime import datetime

import requests
from requests.exceptions import HTTPError

from dailytide.data_getters import DEFAULT_TIMEOUT


def get_reddit(subreddit_name: str, user_agent: str):
    """Get the top posts from a given subreddit
    :return: a list of dictionaries with the following keys: title, text, date, author, score
    """
    try:
        res = requests.get(
            f"https://www.reddit.com/r/{subreddit_name}/top.json",
            params={"t": "day"},
            headers={"User-agent": user_agent},
            timeout=DEFAULT_TIMEOUT,
        )
        res.raise_for_status()
    except Exception as e:
        raise HTTPError(f"status_code={res.status_code}, detail={res.text}") from e

    res_json = res.json()
    children = res_json["data"]["children"]
    posts = []
    for child in children:
        title = child["data"]["title"]
        text = child["data"]["selftext"]
        date = child["data"]["created_utc"]
        date = datetime.fromtimestamp(date)
        author = child["data"]["author"]
        _id = str(child["data"]["id"])
        link = "https://reddit.com" + child["data"]["permalink"]
        posts.append(
            {
                "title": title,
                "summary": text,
                "created": date,
                "author": author,
                "source": "Reddit",
                "link": link,
                "id": _id,
            }
        )

    return posts

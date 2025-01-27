"""Module to get the top 50 posts from Hacker News"""

from datetime import datetime

import requests

from dailytide.data_getters import DEFAULT_TIMEOUT


def get_hackernews():
    """Get the top 50 posts from Hacker News
    :return: a list of dictionaries with the following keys: author, title, link, text
    """
    url = "https://hacker-news.firebaseio.com/v0/topstories.json?"
    res = requests.get(url, timeout=DEFAULT_TIMEOUT)
    res = res.json()

    def _get_item_url(x):
        return f"https://hacker-news.firebaseio.com/v0/item/{x}.json"

    posts = []
    for item in res[:10]:
        item_res = requests.get(_get_item_url(item), timeout=DEFAULT_TIMEOUT)
        item_res = item_res.json()
        print(item_res)
        author = item_res["by"]
        title = item_res["title"]
        link = f"https://news.ycombinator.com/item?id={item}"
        original_link = item_res["url"] if "url" in item_res else ""
        text = item_res["text"] if "text" in item_res else ""
        time = item_res["time"]  # e.g. 1622659200
        _id = str(item)
        # convert time to datetime
        time = datetime.fromtimestamp(time)

        posts.append(
            {
                "author": author,
                "title": title,
                "link": link,
                "original_link": original_link,
                "summary": text,
                "created": time,
                "id": _id,
                "source": "Hackernews",
            }
        )
    return posts

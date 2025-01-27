"""Module to get tweets from the X accounts"""

# pylint: disable=broad-exception-caught
from time import sleep
from typing import Any, Optional

import pandas as pd
import requests
from dateutil import parser

from dailytide.config import MakeConfig
from dailytide.data_getters import (
    DEFAULT_TIMEOUT,
    X_Accounts,
    daily_cutoff_time,
    logger,
)
from dailytide.utils import delay_execution


@delay_execution(seconds=35, tries=2, default_return=[])
def get_list_tweets(
    bearer_token: str,
    list_id: int,
    page_size: int = 10,
    cutoff_date_str: Optional[str] = None,
    cutoff_n_tweets: int = 10,
) -> list[dict]:
    """Get the latest tweets from a list"""
    logger.info("Getting tweets from list %s", list_id)

    data = []
    users = []
    next_token = None
    if cutoff_date_str is not None:
        cutoff_date = parser.parse(cutoff_date_str)

    while True:
        params = {
            "tweet.fields": "created_at",
            "user.fields": "username",
            "max_results": page_size,
            "expansions": "author_id",
        }
        if next_token is not None:
            params["pagination_token"] = next_token
        res = requests.get(
            url=f"https://api.twitter.com/2/lists/{list_id}/tweets",
            params=params,  # type: ignore
            headers={"Authorization": f"Bearer {bearer_token}"},
            timeout=DEFAULT_TIMEOUT,
        )

        try:
            res_dict = res.json()
            data += res_dict["data"]
            users += res_dict["includes"]["users"]
        except Exception:  # pylint: disable=broad-exception-raised
            logger.error("Could not get tweets from list %s: %s", list_id, res)
            break

        next_token = res_dict.get("meta", {}).get("next_token")
        if next_token is None:
            break
        last_date = parser.parse(data[-1]["created_at"])
        if cutoff_date is not None and last_date < cutoff_date:
            logger.info("Reached cutoff date %s, cutoff_date")
            break
        if cutoff_n_tweets is not None and len(data) >= cutoff_n_tweets:
            logger.info("Reached cutoff number of tweets %s", cutoff_n_tweets)
            break
        sleep(10)

    data_df = pd.DataFrame(data)
    users_df = pd.DataFrame(users)
    users_df.rename(columns={"id": "author_id"}, inplace=True)
    data_df.rename(columns={"id": "author_id"}, inplace=True)

    # drop duplicates on author_id
    users_df.drop_duplicates(subset="author_id", inplace=True)

    # if users is empty, return empty list
    if users_df.empty:
        return []

    data_df = data_df.merge(users_df, on="author_id")
    data_df = data_df.drop(columns=["author_id"])
    data_df["created_at"] = pd.to_datetime(data_df["created_at"])
    # rename text column to summary
    data_df = data_df.rename(
        columns={"text": "summary", "created_at": "created", "username": "author"}
    )
    data_df["source"] = "X"
    data_df["title"] = ""
    data_df["source_link"] = data_df.apply(
        lambda x: f'https://twitter.com/{x["author"]}/status/{x["id"]}', axis=1
    )
    data_df.drop(columns=["edit_history_tweet_ids", "id", "name"], inplace=True)
    return data_df.to_dict(orient="records")


@delay_execution(seconds=35, tries=5, default_return=[])
def get_tweets(
    bearer_token: str, account_name: str, n_tweets: int = 100
) -> list[dict[str, Any]]:
    """Get the latest `n_tweets` tweets from a given account
    As per the Twitter API docs (v2) by default, a request will return the most recent Tweets first
    :return: a list of dictionaries"""
    logger.info("Getting tweets from %s", account_name)

    res = requests.get(
        url="https://api.twitter.com/2/tweets/search/recent",
        params={
            "query": f"from:{account_name} -is:reply",
            "tweet.fields": "created_at",
            "max_results": n_tweets,
            "start_time": daily_cutoff_time,
        },  # type: ignore
        headers={"Authorization": f"Bearer {bearer_token}"},
        timeout=DEFAULT_TIMEOUT,
    )

    try:
        res_dict = res.json()
        return res_dict["data"]
    except Exception:  # pylint: disable=broad-exception-raised
        logger.error("Could not get tweets from %s: %s", account_name, res)
        return []


def get_all_tweets() -> list[dict[str, Any]]:
    """Get the latest tweets from all the X accounts"""
    bearer_token: Optional[str] = MakeConfig.TWITTER_TOKEN
    all_tweets: list = []

    if bearer_token is None:
        logger.error("Bearer token not found")
        return all_tweets

    for account_name in X_Accounts:
        tweets = get_tweets(bearer_token=bearer_token, account_name=account_name)
        tweets = [
            {
                "summary": tweet.pop("text"),
                "created": parser.parse(tweet.pop("created_at")),
                "source": "X",
                "author": account_name,
                "title": "",
                "source_link": f'https://twitter.com/{account_name}/status/{tweet["id"]}',
            }
            for tweet in tweets
        ]

        all_tweets += tweets
    return all_tweets

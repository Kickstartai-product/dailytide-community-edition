"""Module to filter the data"""

# pylint: disable=too-few-public-methods
import re
from typing import Any

from dailytide.core.genai_functions import (
    complete_openai_request_parralel,
    load_filter_tweet_prompt,
)


class TwitterFilter:
    """Filter to check if a tweet is relevant and informative"""

    @classmethod
    def execute_filter(cls, tweets: list[Any]) -> list[Any]:
        """Ask OpenAI if a tweet is relevant and informative
        If the response of OpenAI is not in the expected format, we
        assume the tweet is relevant and informative"""

        prompts_ = [
            load_filter_tweet_prompt(tweet=tweet["summary"], author=tweet["author"])
            for tweet in tweets
        ]
        responses_ = complete_openai_request_parralel(prompts_)
        return [
            tweet
            for tweet, response in zip(tweets, responses_)
            if response["relevant"] and response["informative"]
        ]


class NewsFilter:
    """Filter to check if a news article is specific and important"""

    pattern: re.Pattern = re.compile(
        r"(artificial intelligence|robotics|ai|(deep|machine) learning|\
        computer vision|and|news|content|articles|concepts|automation)"
    )
    pre_process: re.Pattern = re.compile(r"[-:,\\/!\?]")

    @classmethod
    def execute_filter(cls, articles: list[Any]) -> list[Any]:
        """Check for obvious geenric headlines using
        regex and then ask open AI if the news is relevant"""

        def is_not_category(title):
            reduced_title = cls.pre_process.sub("", title.lower())
            pattern_match = cls.pattern.sub("", reduced_title)
            return len(pattern_match.strip().split()) > 1

        return [news for news in articles if is_not_category(news["title"])]

"""Extract data from different sources and write to a file"""

# pylint: disable=unspecified-encoding
import os
from typing import Any, List

import bson.json_util

from dailytide.config import MakeConfig
from dailytide.core.filtering import NewsFilter as news_filter
from dailytide.core.filtering import TwitterFilter as x_filter
from dailytide.data_getters import daily_cutoff_time
from dailytide.data_getters.news import get_bing
from dailytide.data_getters.twitter import get_list_tweets
from dailytide.utils import clean_dict, create_id_from_string


def extract_data():
    """Extract data from different sources and write to file
    Currently supports Bing (News) and Twitter (X) as data sources
    """
    consolidated_data: List[Any] = []

    # created a directory for data storage
    try:
        os.mkdir("data")
    except:  # pylint: disable=bare-except
        pass

    for source in MakeConfig.DATA_SOURCES:
        try:
            if source == "News":
                data = get_bing()
                data = news_filter.execute_filter(articles=data)
            elif source == "X":
                data = get_list_tweets(
                    bearer_token=MakeConfig.TWITTER_TOKEN,
                    list_id=MakeConfig.X_LIST_ID,
                    cutoff_date_str=daily_cutoff_time,
                    cutoff_n_tweets=100,
                    page_size=80,
                )
                data = x_filter.execute_filter(tweets=data)

            data = [
                clean_dict(
                    {"_id": create_id_from_string(article["source_link"]), **article}
                )
                for article in data
            ]
            consolidated_data += data

        except Exception as e:  # pylint: disable=broad-exception-caught
            print(f"Could not fetch data from {source}: {e}")

    if consolidated_data:
        print(f"Writing {len(consolidated_data)} articles to {MakeConfig.data}")
        with open(MakeConfig.data, "w") as outfile:
            outfile.write(bson.json_util.dumps(consolidated_data))
    else:
        print("No data to write")


if __name__ == "__main__":
    extract_data()
    print("Data extraction completed.")

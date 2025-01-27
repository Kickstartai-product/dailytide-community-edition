"""Module to generate topics from the data"""

# pylint: disable=unspecified-encoding
import logging
import os
from typing import List

from bson import json_util

from dailytide.config import MakeConfig
from dailytide.core.pre_processing import preprocess_data
from dailytide.core.topics import (
    classify_topics_parralel,
    combine_topics,
    determine_category_and_labels,
    evaluate_topics,
    interpret_topics,
    make_topics_from_documents,
)
from dailytide.models.data_models import Article, Topic

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)


if __name__ == "__main__":
    try:
        os.mkdir("data")
    except:  # pylint: disable=bare-except
        pass
    
    # Load Processed Data
    logger.info("Preprocessing data...")
    articles_: List[Article] = preprocess_data()

    # Create a Topic List
    topic_list_ = []

    # NEWS ARTICLES
    logger.info("Create Topics for News...")
    topic_list_ += make_topics_from_documents(
        documents=[
            article.document for article in articles_ if article.source == "News"
        ],
        type_="news articles",
    )

    # TWEETS
    logger.info("Create Topics for Tweets...")
    topic_list_ += make_topics_from_documents(
        documents=[article.document for article in articles_ if article.source == "X"],
        type_="news articles",
    )

    # COMBINE TOPICS
    logger.info("%s topics were generated", len(topic_list_))
    logger.info("Combining similar topics...")
    topics_ = combine_topics(topic_list_)
    logger.info("%s topics remained", len(topics_))

    # CREATE TOPICS OBJECT DICT
    topics_ = {idx: Topic(title=topic) for idx, topic in enumerate(topics_)}

    # CLASSIFY TOPICS
    logger.info("Classifying topics...")
    topic_index_for_articles = classify_topics_parralel(articles_, topics_)
    for topic_idx, article_ in zip(topic_index_for_articles, articles_):
        if 0 <= int(topic_idx) < len(topics_.values()):
            topics_[topic_idx].reference_links.append(article_)
        else:
            logger.error("Invalid index: %s", topic_idx)
    logger.info("Classifying Finished.")

    topics_ = list(topics_.values())

    # EVALUATE TOPICS
    logger.info("Evaluating topics...")
    topics_ = evaluate_topics(topics=topics_)

    # INTERPRET TOPICS
    logger.info("Interpreting topics...")
    topics_ = interpret_topics(topics=topics_)

    # FIND CATEGORY FOR TOPICS
    logger.info("Finding category for topics...")
    topics_ = determine_category_and_labels(topics=topics_)

    # SAVE RESULTS
    logger.info("Saving results at %s", MakeConfig.first_topics)
    with open(MakeConfig.first_topics, "w") as outfile:
        outfile.write(json_util.dumps([topic.make_json() for topic in topics_]))
    logger.info("Process completed.")

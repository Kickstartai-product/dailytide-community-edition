"""Module to generate topics from the data"""

# pylint: disable=unspecified-encoding
import logging
from itertools import chain
from typing import Any, List

import tiktoken

from dailytide.config import MakeConfig, TopicConfig
from dailytide.core.genai_functions import (
    chunk_documents,
    complete_openai_request,
    complete_openai_request_parralel,
    load_evaluate_topic_prompt,
    load_find_category_prompt,
    load_interpretation_prompt,
    load_shorten_prompt,
    load_topic_classification_prompt,
    load_topic_combination_prompt,
    load_topic_creation_prompt,
)
from dailytide.db.categories import get_categories
from dailytide.db.session import make_connection
from dailytide.models.data_models import Article, Topic
from dailytide.utils import delay_execution

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)
enc = tiktoken.encoding_for_model("gpt-4")


def combine_topics(topic_list: list[str]):
    """Combine similar topics using LLM call"""
    prompt = load_topic_combination_prompt(topic_list)
    topics = complete_openai_request(prompt)["topics"]
    return topics


def make_topics_from_documents(documents: list[str], type_: str) -> list[str]:
    """Create topics from a list of documents
    The documents are chunked into `MakeConfig.TOKEN_LIMIT` tokens,
    and a prompt is created for each chunk. Topics are received from OpenAI and
    are then combined into a single list
    """
    chunks = chunk_documents(documents, enc.encode, MakeConfig.TOKEN_LIMIT)

    topic_list = []
    prompts = []
    for chunk in chunks:
        prompts.append(load_topic_creation_prompt(chunk, type_=type_))

    responses = complete_openai_request_parralel(prompts)
    topic_list = [response["topics"] for response in responses]

    # chain together the topics
    topic_list = list(chain(*topic_list))
    logger.info("Topics generated from %s: %s", type_, topic_list)
    return topic_list


@delay_execution(seconds=2, tries=5, default_return=[])
def classify_topics(article: Article, topics):
    """Classify the topics of an article"""
    prompt = load_topic_classification_prompt(
        article.document, topics, article.doc_type
    )
    idx = complete_openai_request(prompt)["topic"]
    return idx


def classify_topics_parralel(
    articles: List[Article], topics: dict[int, Topic]
) -> list[str]:
    """Classify the topics of a list of articles in parallel
    Each article is matched to exactly 1 topic"""
    topic_titles = [topic.title for topic in topics.values()]
    prompts = [
        load_topic_classification_prompt(
            article.document, topic_titles, article.doc_type
        )
        for article in articles
    ]
    responses = complete_openai_request_parralel(prompts)
    return [response["topic"] for response in responses]


def evaluate_topics(topics: List[Topic]) -> List[Topic]:
    """Evaluate the genericity of the topics using GPT model if more than the MAX_LINKS
    limit is found. If not generic and still more than the limit, the links are reduced.
    """
    topics_with_substance: List[Topic] = []

    for selected_topic in topics:
        if len(selected_topic.reference_links) > TopicConfig.N_MAX_LINKS:
            response = complete_openai_request(
                load_evaluate_topic_prompt(selected_topic.title)
            )
            if not response["is_generic"]:
                continue
            selected_topic.reference_links = selected_topic.reference_links[
                : TopicConfig.N_MAX_LINKS
            ]
        topics_with_substance.append(selected_topic)
    return topics_with_substance


def interpret_topics(topics: List[Topic]) -> Any:
    """Interpret the topics and generate summaries and descriptions"""

    failed_topics = []

    # Detailed Description
    prompts_ = [
        load_interpretation_prompt(
            topic.title,
            [article_.document for article_ in topic.reference_links],
            long=True,
        )
        for topic in topics
    ]
    responses_ = complete_openai_request_parralel(prompts_)

    for response, topic in zip(responses_, topics):
        try:
            topic.description = response["description"]
            topic.title = response["name"]
        except Exception as e:  # pylint: disable=W0718
            failed_topics.append(topic.title)
            logger.error(e)

    # Short Summary
    prompts_ = [
        load_interpretation_prompt(
            topic.title,
            [article_.document for article_ in topic.reference_links],
            short=True,
        )
        for topic in topics
    ]
    responses_ = complete_openai_request_parralel(prompts_)

    for response, topic in zip(responses_, topics):
        try:
            topic.summary = response["description"]
        except Exception as e:  # pylint: disable=W0718
            failed_topics.append(topic.title)
            logger.error(e)

    # Summary Shortening if not adhering to the limits
    prompts_ = []
    idxs_ = []
    for idx, topic in enumerate(topics):
        # find all summaries that are too long
        if topic.title in failed_topics:
            idxs_.append(idx)

        if len(topic.summary) > 350:
            prompts_.append(load_shorten_prompt(topic.summary))
            idxs_.append(idx)

    responses_ = complete_openai_request_parralel(prompts_)
    for topic_idx in idxs_:
        topics[topic_idx].summary = responses_.pop()["description"]
    return topics


def get_topic_categories() -> List[Any]:
    """Load the topic categories"""
    db_conn = make_connection()
    topic_categories = get_categories(db=db_conn)
    return topic_categories


@delay_execution(seconds=2, tries=5, default_return=[])
def determine_category_and_labels(topics: List[Topic]) -> List[Topic]:
    """For each topic, determine a general  category and additionally
    generate labels (tags) for the topic"""

    topic_categories = {
        category["name"]: category["_id"] for category in get_topic_categories()
    }

    for selected_topic in topics:
        response = complete_openai_request(
            load_find_category_prompt(
                selected_topic.summary, topic_categories=list(topic_categories.keys())
            )
        )
        selected_topic.category = topic_categories.get(response["category"])  # type: ignore
        selected_topic.tags = response["keywords"]
    return topics

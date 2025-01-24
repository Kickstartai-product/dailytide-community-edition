"""Module containing genai prompts and functions"""

# pylint: disable=line-too-long
import asyncio
import json
from itertools import chain
from typing import Any, Callable

import aiohttp
from openai import OpenAI

from dailytide.config import MakeConfig
from dailytide.utils import delay_execution, delay_execution_async

client = OpenAI(api_key=MakeConfig.OPENAI_API_KEY)


def chunk_documents(
    documents: list[str], tokenizer_function: Callable, max_tokens: int
) -> list[list[str]]:
    """This function splits a list of documents into chunks of size max_tokens."""
    chunks: list[list[str]] = [[]]
    current_num_tokens = 0
    for document in documents:
        tokens = len(tokenizer_function(document))
        if current_num_tokens + tokens < max_tokens:
            chunks[-1].append(document)
            current_num_tokens += tokens
        else:
            chunks.append([document])
            current_num_tokens = tokens
    return chunks


def load_topic_creation_prompt(
    documents: list[str], type_: str = "news articles"
) -> str:
    """This function takes a list of machine learning documents and returns a prompt that can be used to return a list of topics."""

    prompt = f"""Your task will be to distill a list of topics from the following {type_} about AI/Machine Learning:\n\n"""
    prompt += "\n DOCUMENT: ".join(documents)
    prompt += "Your response should be a JSON in the following format: {'topics': ['topic1', 'topic2', 'topic3']}"
    prompt += "Topics should not be too specific, but also not too general. For example, 'machine learning for medical' is too general. But 'SAMSUNG releases new phone with AI chip' is too specific."
    prompt += "A topic does not need to be present in multiple documents."

    return prompt


def load_topic_combination_prompt(topic_lists: list[str]) -> str:
    """This function takes a list of lists of topics and returns a
    prompt that can be used to return a list of topics."""
    topic_list = list(chain(*topic_lists))

    prompt = "Your task will be too distill a list of core topics from the following topics:\n\n"
    prompt += "\n TOPIC:".join(topic_list)
    prompt += "Your response should be a JSON in the following format: {'topics': ['topic1', 'topic2', 'topic3']}"
    prompt += "Remove duplicate topics and merge topics that are too general. Merge topics together that are too specific.  For example, 'machine learning for medical' is too general. But 'SAMSUNG releases new phone with AI chip' is too specific."

    return prompt


def load_topic_classification_prompt(
    document: str, topics: list[str], type_: str = "news article"
) -> str:
    """This function takes a document and a list of topics and returns
    a prompt that can be used to classify the document into one of the topics."""
    enum_topics: enumerate[str] = enumerate(topics)
    prompt = f"Your task will be to classify the following {type_} into one of the following topics:\n\n"
    prompt += f"DOCUMENT: {document}\n\n"
    prompt += "\n".join([f"#{index}: {topic}" for index, topic in enum_topics])
    prompt += "Your response should be a JSON in the following format: {'topic': idx}"
    prompt += "The index should be the index of the topic in the list of topics."
    prompt += "If you think the document does not belong to any of the topics, you can also return {'topic': -1}."
    return prompt


def load_interpretation_prompt(
    name: str, documents: list[str], long=False, short=False
) -> str:
    """This function takes a category name and a list of documents and
    returns a prompt that can be used to reformulate the category name and
    write a description based on the documents."""
    prompt = (
        "The following documents have been identified to be about the category '"
        + name
        + "'\n\n"
    )
    prompt += "\n DOCUMENT: ".join(documents)
    prompt += "\n\nReformulate the category name to be more fitting, or keep it as is if it's already good."
    prompt += "In addition, write a description based on the documents, you may describe the documents seperately or together, whatever you think is best. Write the description as if for a news article. Use simple english where possible. Remain neutral in tone, do not blindly copy the positive tone of the documents. Additionally, refer to the documents exclusively as 'articles', do not self reference to the category like 'this collection holds'. The output is for an news site on AI, so do not explain what AI/ML is, but rather what the articles are about (e.g., how is AI applied in this case)."
    prompt += "The one exception is tweets, if an article is a tweet it will say TWEET, and it will have an AUTHOR. In this case, you can refer to the tweet as a tweet, and you can refer to the author as the author, make sure to include the author's name in the description."
    prompt += f"The number of articles is {len(documents)}, do not refer to the articles as a 'set' if there is only one article."
    if short:
        prompt += "As an additional command, keep the text focused, assume prior knowledge. The description should be around 300 characters."
    if long:
        prompt += "As an additional command, make the text detailed, clearly outline important details using bullet points. Detailed does not mean long, but rather that the text is informative. The description should be around 600 characters."
    prompt += "Your response should be a JSON with 'name' and 'description' as the only two keys in the following format:"
    prompt += """
        {'name': 'category_name', 'description': 'category_description'}"
    """
    return prompt


def load_shorten_prompt(text: str) -> str:
    """Shorten a summary to be around 300 characters."""
    prompt = f"You are given a summary of a group of articles about the same topic. The current length is {len(text)} which is too long. Please shorten the text to be around 300 characters. The text is as follows:\n\n{text}"
    prompt += "\n\nYour response should be a JSON in the following format: {'description': 'shortened_text'}"
    return prompt


def load_filter_tweet_prompt(tweet: str, author: str) -> str:
    """This function takes a tweet and an author and returns a prompt that can
    be used to determine if the tweet is relevant to AI/Machine Learning
    and if it is informative."""
    prompt = f"You will be provided with a tweet from an author ({author}) who is tied to AI/Machine Learning. However, not all of this author's tweets are actually relevant to AI/Machine Learning."
    prompt += "You will thus determine if this tweet is relevant to AI/Machine Learning or not. In addition, you will determine if this tweet contains sufficient information to be informative."
    prompt += "For example, the tweet 'Check out this new method to do object segmentation called method X' or 'I don't think LLM's can reach AGI' informative, whereas 'Hmm, I have a coding problem' is not. The tweet will follow now:"
    prompt += f"\n\n TWEET: {tweet}\n\n"
    prompt += "Your response should be a JSON in the following format: {'relevant': True/False, 'informative': True/False}"
    return prompt


def load_find_category_prompt(topic_summary: str, topic_categories: list[str]) -> str:
    """Generate a prompt to find labels for a topic from a pre-defined set of labels"""
    return f"""
    You have following list of topics labels:
    TOPIC_CATEGORIES = {str(topic_categories)}
    based on the TOPIC_CATEGORIES your task is to decide which one of the categories are most relevant to the topic described below.
    Additionally, please provide 3 key words that you think are most relevant to the topic, make sure the keywords are short and specific.
    TOPIC: "{topic_summary}"
    respond in JSON format, with 'category' as key and value as a string, and 'keywords' as key and value as a list of strings.
    """


def combine_topic_sets(topic, topic_set):
    """This function takes a topic and a list of topics and returns a prompt that
    classifies the topic into one of the topics in the list."""
    prompt = "You will be provided with the a topic, represented by a name and a description. Then, you will be provided with a list of topics that is numbered."
    prompt += "Your task is to classify the topic into one of the topics in the list. If you think the topic does not belong to any of the topics in the list, you can also return {'topic': -1}."
    prompt += "Don't be afraid to retun -1, it is better to return -1 than to classify a topic incorrectly. An example of a classifcation is:"
    prompt += "EXAMPLE START"
    prompt += "NAME: 'Computer vision succesfully used in surgery', DESCRIPTION: 'Machine learning is used in healthcare to predict the risk of heart attacks'"
    prompt += "The list of topics is as follows:"
    prompt += "#0: 'Machine Learning trends in 2023'"
    prompt += "#1: 'Machine Learning in Healthcare'"
    prompt += "#2: 'Machine Learning in Finance'"
    prompt += "#3: 'Machine Learning in Education'"
    prompt += "Response: {'topic': 1}"
    prompt += "EXAMPLE END"
    prompt += f"The topic is as follows: NAME: {topic['name']}, DESCRIPTION: {topic['description']}"
    prompt += "The list of topics is as follows:"
    prompt += "\n".join([f"#{index}: {topic}" for index, topic in enumerate(topic_set)])
    prompt += "Your response should be a JSON in the following format: {'topic': idx}"
    return prompt


def load_evaluate_topic_prompt(topic_title) -> str:
    """Generate a prompt to evaluate the genericity of a topic"""
    return f"""
    Below provides a topic with a title and its description and various news sources
    TOPIC = {topic_title}
    Your task is to assess its genericity;
    Examples of generic topics are:
    - "Artificial Intelligence"
    - 'AI in Healthcare'
    - 'Machine Learning'
    - 'Latest AI trends'
    Your task is to assess its genericity,
    If the topic is too generic, then respond in JSON format, with 'is_generic' as key and value as boolean.
    """


@delay_execution(seconds=5, tries=3)
def complete_openai_request(
    prompt: str, model: str = "gpt-4-turbo", timeout: int = 30
) -> dict:
    """This function takes a prompt and returns the response from the OpenAI API."""
    response = client.chat.completions.create(
        model=model,
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant designed to output JSON.",
            },
            {"role": "user", "content": prompt},
        ],
        timeout=timeout,
        temperature=0.2,
    )

    json_string = response.choices[0].message.content

    json_dict = {}
    if json_string is not None:
        json_dict = json.loads(json_string)
    return json_dict


@delay_execution_async(seconds=5, tries=30)
async def complete_openai_request_http(session, prompt, model, timeout):
    """This function takes a prompt and returns the response from the OpenAI API."""
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {MakeConfig.OPENAI_API_KEY}",
    }
    data = {
        "model": model,
        "response_format": {"type": "json_object"},
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant designed to output JSON.",
            },
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.2,
    }
    timeout = aiohttp.ClientTimeout(
        total=timeout
    )  # Set the total timeout for the whole operation
    async with session.post(
        "https://api.openai.com/v1/chat/completions",
        headers=headers,
        json=data,
        timeout=timeout,
    ) as response:
        response.raise_for_status()  # This will raise an exception for HTTP errors
        response_json = await response.json()
        response_json = response_json["choices"][0]["message"]["content"]
        return json.loads(response_json)


def complete_openai_request_parralel(
    prompts: list[str],
    model: str = "gpt-4-turbo",
    timeout: int = 30,
    batch_size: int = 1_000,
) -> list[dict]:
    """This function takes a list of prompts and returns the responses from the OpenAI API."""

    async def parralel_openai_request(
        prompts: list[str], model: str, timeout: int, batch_size: int
    ) -> list[dict]:
        """Parallelize the OpenAI requests."""
        async with aiohttp.ClientSession() as session:
            tasks = [
                complete_openai_request_http(session, prompt, model, timeout)
                for prompt in prompts
            ]
            all_objects: list[Any] = []
            # gather preserves the order of the tasks
            for i in range(0, len(tasks), batch_size):
                responses = await asyncio.gather(
                    *tasks[i : i + batch_size], return_exceptions=True
                )
                for response in responses:
                    if isinstance(response, Exception):
                        # return None if there was an error
                        all_objects.append(None)
                    else:
                        all_objects.append(response)

            return all_objects

    responses = asyncio.run(
        parralel_openai_request(prompts, model, timeout, batch_size)
    )
    return responses

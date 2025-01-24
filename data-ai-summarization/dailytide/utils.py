"""Module for utility functions"""

# pylint: disable=too-few-public-methods,disable=protected-access
import asyncio
import hashlib
import logging
import time
from functools import wraps

from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)


def create_id_from_string(string: str) -> str:
    """Create an ID from a string"""
    if not string:
        raise ValueError("String cannot be empty")
    encoded_string = string.encode("utf-8")  # Encode the string
    hashed_string = hashlib.sha256(
        encoded_string
    ).hexdigest()  # Hash the encoded string
    return hashed_string


def clean_dict(d):
    """Clean a dictionary by replacing newlines with spaces"""

    def clean(v):
        if v is None:
            return ""
        if isinstance(v, dict):
            return clean_dict(v)
        if isinstance(v, str):
            return v.replace("\n", " ")
        return v

    return {k: clean(value) for k, value in d.items()}


def log_list(logger_class, str_list):
    """Log a type of list"""
    logger_class.info(str)
    for string in str_list:
        logger_class.info(string)


logger.log_list = log_list  # type: ignore


def delay_execution(
    seconds=4, tries=5, default_return=[], exponential=1
):  # pylint: disable=dangerous-default-value
    """Decorator to delay the execution of a function, iteratively wait longer each time"""

    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for i in range(1, tries):
                try:
                    result = func(*args, **kwargs)
                    return result
                except Exception as e:  # pylint: disable=broad-exception-caught
                    logger.error("Error: %s. Retrying in {seconds*i} seconds", e)
                    time.sleep(seconds * i * exponential)
            return default_return

        return wrapper

    return decorator


def delay_execution_async(
    seconds=4, tries=5, default_return=[], exponential=1
):  # pylint: disable=dangerous-default-value
    """Asynchronous decorator to delay the execution of a function, with exponential backoff"""

    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            for i in range(1, tries + 1):
                try:
                    # Await the asynchronous function call
                    result = await func(*args, **kwargs)
                    return result
                except Exception as e:  # pylint: disable=broad-exception-caught
                    wait_time = seconds * (exponential ** (i - 1))
                    logger.error("Error: %s. Retrying in %s seconds", e, wait_time)
                    # Use asyncio.sleep for non-blocking delay
                    await asyncio.sleep(wait_time)
            return default_return

        return wrapper

    return decorator

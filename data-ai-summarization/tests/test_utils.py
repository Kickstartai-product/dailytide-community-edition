"""Tests for dailytide.utils."""

from dailytide.utils import clean_dict, create_id_from_string


def test_clean_dict():
    """Test clean_dict function."""
    d = {"a": "a\nb", "b": None, "c": 1}
    assert clean_dict(d) == {"a": "a b", "b": "", "c": 1}


def test_clean_dict_empty():
    """Test clean_dict function with empty dictionary."""
    d = {}
    assert clean_dict(d) == {}


def test_clean_dict_nested():
    """Test clean_dict function with nested dictionaries."""
    d = {"a": {"b": "a\nb"}, "c": 1}
    assert clean_dict(d) == {"a": {"b": "a b"}, "c": 1}


def test_create_id_from_string():
    """Test create_id_from_string function."""
    string = "test"
    assert (
        create_id_from_string(string)
        == "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
    )


def test_create_id_from_string_empty():
    """Test create_id_from_string function with empty string."""
    string = ""
    try:
        create_id_from_string(string)
    except ValueError as e:
        assert str(e) == "String cannot be empty"


def test_create_id_for_the_same_tweet_yields_same_id():
    """Test create_id_from_string function with the same string."""
    string = "test"
    assert create_id_from_string(string) == create_id_from_string(string)

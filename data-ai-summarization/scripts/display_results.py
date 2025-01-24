"""Module to display results"""

# pylint: disable=unspecified-encoding
import json

from dailytide.config import MakeConfig


def show_results():
    """Show the results of the data extraction"""
    with open(MakeConfig.selected_results, "r") as f:
        topics = json.load(f)

    for index, topic in enumerate(topics):
        print("""Topic: {} - {}""".format(index, topic["title"].replace("\n", " ")))
        print("""Topic: {} - {}""".format(index, topic["summary"].replace("\n", " ")))


if __name__ == "__main__":
    show_results()

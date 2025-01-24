"""Module to define the data models used in the application"""

# pylint: disable=too-many-instance-attributes, protected-access
from dataclasses import asdict, dataclass, field
from typing import Any, List

from bson.objectid import ObjectId


@dataclass
class Article:
    """Article dataclass: this stores an article"""

    title: str
    source: str
    summary: str
    author: str
    source_link: str
    _id: str = ""
    created: Any = None

    def __post_init__(self):
        """Post init method to set the document type and document string"""
        self.set_doc_type_and_document()

    def set_doc_type_and_document(self):
        """Set the document type and document string based on the source of the article"""
        self.document = (
            f"TITLE: {self.title}\nCONTENT: {self.summary}"
            if self.source == "News"
            else f"AUTHOR: {self.author}, TWEET: {self.summary}"
        )
        self.doc_type = "news article" if self.source == "News" else "tweet"

    def is_valid(self):
        """Check if the article is valid"""
        return not (not self.title and not self.summary)

    def make_json(self):
        """Return the article as a json object"""
        return asdict(self)


@dataclass
class Topic:
    """Topic dataclass: this stores a topic of interest"""

    title: str
    summary: str = field(default_factory=str)
    description: str = field(default_factory=str)
    reference_links: List[Article] = field(default_factory=list)
    tags: List[str] = field(default_factory=list)
    _id: ObjectId = field(default_factory=str)  # type: ignore
    category: ObjectId = field(default_factory=str)  # type: ignore

    def __post_init__(self):
        self.reference_links = []

    def make_json(self):
        """Return the topic as a json object"""
        self.reference_links = [
            {
                "title": reference.title,
                "source_name": reference.source,
                "link": reference.source_link,
                "_id": reference._id,
            }
            for reference in self.reference_links
        ]
        return asdict(self)

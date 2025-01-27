"""Module to post process the data"""

# pylint: disable=unspecified-encoding
import json
import logging

import bson.json_util
from bson.objectid import ObjectId

from dailytide.config import MakeConfig

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)


if __name__ == "__main__":
    with open(MakeConfig.first_topics, "r") as f:
        selected_results = json.load(f)
        selected_results = [
            {**result, "_id": ObjectId(), "popularity": i + 1}
            for i, result in enumerate(selected_results)
            if result["reference_links"]
        ]

    logger.info("Selected results: %s", selected_results)
    with open(MakeConfig.selected_results, "w") as f:
        f.write(bson.json_util.dumps(selected_results, indent=4))

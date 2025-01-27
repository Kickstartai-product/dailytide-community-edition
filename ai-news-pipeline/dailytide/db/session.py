"""MongoDB connection and data insertion functions"""

from urllib.parse import quote

import pymongo

from dailytide.config import MakeConfig


def make_connection():
    """Make connection to MongoDB"""
    mongodb_username = MakeConfig.MONGODB_USERNAME
    mongodb_password = MakeConfig.MONGODB_PASSWORD
    host = MakeConfig.MONGODB_HOST

    if mongodb_username and mongodb_password:
        if "localhost" in host:
            client = pymongo.MongoClient(
                (
                    f"mongodb://{mongodb_username}:{mongodb_password}"
                    f"@{host}/?retryWrites=true&w=majority"
                )
            )
        else:
            try:
                client = pymongo.MongoClient(
                    (
                        f"mongodb+srv://{quote(mongodb_username)}:"
                        f"{quote(mongodb_password)}@{host}/?retryWrites=true&w=majority"
                    )
                )
                # get server info
                client.admin.command("ping")
            except pymongo.errors.ConnectionFailure as e:
                print(f"Could not connect to MongoDB: {e}")
    else:
        raise Exception(  # pylint: disable=broad-exception-raised
            "MongoDB username and password are required"
        )
    db = client["KickstartAI"]
    return db


def insert_to_mongo(data, db, collection_name):
    """Insert data into a MongoDB collection"""
    collection = db[collection_name]
    return collection.insert_many(data)


def upsert_to_mongo(data, db, collection_name):
    """Upsert data into a MongoDB collection"""
    collection = db[collection_name]
    results = []

    for document in data:
        # Assuming '_id' is the unique identifier for each document.
        # Change this field name if your identifier is different.
        filter_condition = {"_id": document["_id"]}

        # $set updates the document with the given values.
        update_data = {"$set": document}

        # Perform the upsert operation.
        result = collection.update_one(filter_condition, update_data, upsert=True)
        results.append(result)

    return results


# pylint: disable=unspecified-encoding


def change_validation_schema(db, collection_name, schema):
    """Change the validation schema of a collection in MongoDB
    Modify the collection to apply new validation rules"""
    db.command("collMod", collection_name, validator=schema)

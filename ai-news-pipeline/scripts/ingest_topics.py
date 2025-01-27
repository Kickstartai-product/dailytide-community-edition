"""Module to ingest the data into the database"""

from dailytide.db.session import make_connection
from dailytide.db.topics import ingest_topics

if __name__ == "__main__":
    db_conn = make_connection()
    ingest_topics(db=db_conn)
    print("successfully ingested topics")

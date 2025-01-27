"""Module to ingest the data into the database"""

from dailytide.db.articles import ingest_articles
from dailytide.db.session import make_connection

if __name__ == "__main__":
    db_conn = make_connection()
    ingest_articles(db=db_conn)
    print("successfully ingested articles")

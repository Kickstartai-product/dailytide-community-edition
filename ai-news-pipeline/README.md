# 🌊 Daily Tide - Community Edition (CE) - AI News Pipeline

<img src="https://github.com/Kickstartai-product/dailytide-community-edition/blob/main/repo-assets/logo.png?raw=true" height="75" /> <img src="https://github.com/Kickstartai-product/dailytide-community-edition/blob/main/repo-assets/logo-kai.svg?raw=true" height="45" /><br><br>

Welcome to the **Daily Tide AI News Pipeline - Community Edition**! 🌊 This repository houses the **proof-of-concept** AI News Pipeline for the Daily Tide project, designed to provide streamlined and efficient backend services for delivering daily insights into trending topics.

## Setup

Make sure to have [poetry](https://python-poetry.org) installed (e.g. `brew install poetry`)

```bash
poetry install
poetry run pre-commit install
cp template.env .env
```

Update `.env` with the relevant environment variables in order to run locally.

## Run Tests

To run all tests, simply run:

```
poetry run pytest .
```

from the root of this project.

## Overview

This repository contains features necessary to accomplish the following tasks periodically:

1. **Extract News/Other Data Daily** (`python scripts/extract_data.py`):

   - Utilizes BingAPI to extract news articles from Bing's News Search API.
   - Fetches the latest tweets from a select list of Twitter accounts. (related to Machine Learning)

2. **Generate Topics** (`python scripts/generate_topics.py`):

   - Pre-processes downloaded articles.
   - Performs Topic Collection and Classification using various prompts defined in `dailytide.core.genai_functions.py`.
   - Saves results at `data/first_topics.json`.

3. **Post-Processing** (`python scripts/post_processing.py`):

   - Assigns a popularity index to show the order of the articles.
   - Removes articles with no references.
   - Save data at `data/selected_results.json`.

4. **Ingest Data** (`python scripts/ingest_data.py`):
   - Ingest Articles and Topics to MongoDB

## Run locally

In case you would like to run the pipeline on your own, first please edit out the limits described within the `data_getters` files for news and twitter, since we do not want to exhaust the API Limits. Afterwards, simply follow how the pipeline is designed

```bash
poetry run python scripts/extract_data.py
poetry run python scripts/generate_topics.py
poetry run python scripts/post_processing.py
poetry run python scripts/display_results.py
```

Note: `poetry run` is not needed once you are in the `poetry env`, which can be selected in VSCode. Using terminal, you can always enter the environment with `poetry shell` from the root of this project.

## Github Workflow

The repository currently contains two Github Workflows in `.github/workflows`. These describe the relevant flow through this repository.

1. `daily_insight.yml`: Pipeline to create topics based on newly fetched articles and create and store content in the MongoDB. This pipeline is scheduled to run daily.
2. `display_results.yml`: This pipeline does the same thing as (1), but instead of writing to the database, it is displaying (printing) the end result using `display_results.py`.

## Running the job

### Production run

The daily job (`daily_insight.yml`) is setup using a Github Workflow and runs on the [standard Github Runner instance](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners). Note that the pipeline uses several environment variables that need to be configured in Github.

## Data Sources

Currently the job is fetching articles from the following sources:

1. Bing: we fetch **800 articles** from Bing on the query `Machine learning AND artificial intelligence` from **the last week**, sorted by **freshness**.
2. Twitter (X): we fetch the last 100 tweets from a list of Twitter accounts (default = `rowancheung, ylecun`). Alternatively this list can be set in the environment variables defined in the Github Workflow.

## Notes

1. **Local Web-App Environment**:

   - If you wish to run a local web-app environment for The Daily Tide, please refer to the README guides in the backend ([GitHub](https://github.com/Kickstartai-product/ai-insights-REST-nodejs)) and frontend ([GitHub](https://github.com/Kickstartai-product/AI_Insights)) repositories. Note that the Python repository is not used in this setup.

2. **MongoDB Database**:

   - Feel free to set up a MongoDB database in your local environment. Remember to edit the environment variables for your local machine accordingly. However, it is recommended to avoid using APIs in this setup.

   To set up a local `mongodb`, follow the next steps:

   1. Set up Docker on your local machine, e.g. through installing Docker Desktop
   2. Pull the latest mongo container: `docker pull mongo`
   3. Start the docker container: `docker run -d --name mongo_local -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=pass mongo`

   Now you will be able to connect to your local mongodb by specifying the following environment variables:

   ```bash
   MONGODB_USERNAME=admin
   MONGODB_PASSWORD=pass
   MONGODB_HOST=localhost:27017
   ```

---

Feel free to dive into the repository, explore the codebase, and adapt it to your needs. If you have any questions or feedback, don't hesitate to reach out. Happy coding! 😊

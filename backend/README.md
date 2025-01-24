# Daily Tide Backend - CE

This is a Proof-of-Concept of the API for the Daily Tide.

## Entrypoint

-> server.ts

## Configuration

For local development create an environment variable .env.development and use .env.example as a base

## Important Commands

`prod` - Run the api server in production mode after building.<br />
`dev` - Run the api server in dev mode.<br />
`build` - Builds the app so you can deploy a bundle.<br />

## Building a docker image

We have created a Dockerfile.development that builds and creates a docker image with the API backend in it. It copies the `.env.development` environment variables file.

## Patterns

If you access `src/api/v1/` you will see a folder structure that replicates the API paths structure.<br />
Some routes are documented with Swagger.

## Important files to check

Static data like messages or values are stored in constants.ts<br />
You can change this accordingly to your needs.<br />
Configurations are stored in `src/Configs`.

## Controlers

Find it in `src/Controllers`

## Database

MongoDB was the choice for a database. You can find more about it in `src/Models` and `src/Database`.

## Types

`src/Interfaces`

## Authentication Middleware

`src/Middlewares`

## Utility functions

We have stored some utility functions in `src/Untils/index.ts`. Mostly functions to format dates, format news sources, hashing emails etc.

## Formatting and linting

Prettier and eslint.

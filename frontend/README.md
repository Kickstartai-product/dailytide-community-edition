# Daily Tide - CE

This is a proof-of-concept for the Daily Tide frontend.

## Package manager

We chose Yarn as our package manager.

## Running the project

`dev` - Run app in dev mode
`build` - Build the app
`analyze` - Analyze bundle. You can use variants of this command to analyze:server and analyze:browser.
`start` - Start command for nextJS.
`lint` - Lint code. You can use the :fix variant to fix lint issues.
`cypress` - Run cypress. Currently not in use.
`test` - Test the code via Jest. Currently not in use.
`generate` - Create pages or components in one click.
`storybook` - Run storybook to see Component documentation.

## Project structure

`.storybook` - Storybook configurations
`.vscode` - IDE settings
`build-tools` - Plop generator configurations
`cypress` - Cypress configurations. Currently not in use.
`public` - Contains fonts, incons and images publicly accessible

Src folder
`app` - App router containing pages, Next-Auth logic and the api.
`components` - Components with stories viewable in storybook. Some basic components don't have a story.
`context` - Contains a theme context to switch between dark and light mode. Ideally we would have used css variables to toggle dark and light mode.
`data` - Contains data for error messages, etc.
`endpoints` - Contains all api endpoints.
`hooks` - Custom hooks.
`interfaces` - Contains TS types.
`marketing` - Google Analytics abstraction
`providers` - Contains providers for authentication, store and queries.
`redux` - Contains actions and reducers for our store.
`styles` - Contains general css markup
`utils` - Utility functions for Auth and Topics

## Font licensing

Some fonts were under a license that does not allow us to share through our repository.
These are the affected fonts: `ABCDiatypeSemi-Mono-Bold`, `ABCDiatypeSemi-Mono-Regular`
Feel free to replace these fonts with free to use or any of your liking.

## Fomatting and linting

Prettier and ESLint.

## Containers

We have created a dockerfile that you can use to contain the app in a docker image container.

## Environment variables

There is a .env.example that you can use as a base to run this project. You will need to add your own credentials and api keys to make the project fully functional.

## Configurations

You can find some important configurations files at the root of the project, such as: `constants.t`s, `middleware.ts`, `plopfile.js`, `cypress.config.ts`, `jest.config.mjs`, etc.

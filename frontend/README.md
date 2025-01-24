# Daily Tide - CE

This is a proof-of-concept for the Daily Tide frontend.

## Package manager

We chose Yarn as our package manager.

## Running the project

`dev` - Run app in dev mode<br />
`build` - Build the app<br />
`analyze` - Analyze bundle. You can use variants of this command to analyze:server and analyze:browser.<br />
`start` - Start command for nextJS.<br />
`lint` - Lint code. You can use the :fix variant to fix lint issues.<br />
`cypress` - Run cypress. Currently not in use.<br />
`test` - Test the code via Jest. Currently not in use.<br />
`generate` - Create pages or components in one click.<br />
`storybook` - Run storybook to see Component documentation.<br />

## Project structure

`.storybook` - Storybook configurations.<br />
`.vscode` - IDE settings.<br />
`build-tools` - Plop generator configurations<br />
`cypress` - Cypress configurations. Currently not in use.<br />
`public` - Contains fonts, incons and images publicly accessible.<br />

### `src` folder<br />

`app` - App router containing pages, Next-Auth logic and the api.<br />
`components` - Components with stories viewable in storybook. Some basic components don't have a story.<br />
`context` - Contains a theme context to switch between dark and light mode. Ideally we would have used css variables to toggle dark and light mode.<br />
`data` - Contains data for error messages, etc.<br />
`endpoints` - Contains all api endpoints.<br />
`hooks` - Custom hooks.<br />
`interfaces` - Contains TS types.<br />
`marketing` - Google Analytics abstraction<br />
`providers` - Contains providers for authentication, store and queries.<br />
`redux` - Contains actions and reducers for our store.<br />
`styles` - Contains general css markup.<br />
`utils` - Utility functions for Auth and Topics.<br />

## Font licensing

Some fonts were under a license that does not allow us to share through our repository.<br />
These are the affected fonts: `ABCDiatypeSemi-Mono-Bold`, `ABCDiatypeSemi-Mono-Regular`<br />
Feel free to replace these fonts with free to use or any of your liking.

## Fomatting and linting

Prettier and ESLint.

## Containers

We have created a dockerfile that you can use to contain the app in a docker image container.

## Environment variables

There is a .env.example that you can use as a base to run this project. You will need to add your own credentials and api keys to make the project fully functional.

## Configurations

You can find some important configurations files at the root of the project, such as: `constants.t`s, `middleware.ts`, `plopfile.js`, `cypress.config.ts`, `jest.config.mjs`, etc.

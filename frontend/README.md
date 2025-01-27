# 🌊 Daily Tide - Community Edition (CE) - Frontend

<img src="https://github.com/Kickstartai-product/dailytide-community-edition/blob/main/repo-assets/logo.png?raw=true" height="75" /> <img src="https://github.com/Kickstartai-product/dailytide-community-edition/blob/main/repo-assets/logo-kai.svg?raw=true" height="45" /><br><br>

## Package Manager 📦

We have chosen **Yarn** as our package manager for this project. Yarn ensures fast, reliable, and secure dependency management, making development and collaboration smooth and efficient.

## Running the Project 🚀

This project comes with several commands to manage and run the application:

- **`dev`** - Runs the app in development mode. Ideal for live debugging and feature testing. 🔄
- **`build`** - Builds the app for production. Generates an optimized bundle for deployment. 📦
- **`analyze`** - Analyzes the app's bundle size. Variants like `analyze:server` and `analyze:browser` are available to target specific environments. 📊
- **`start`** - Starts the production build using Next.js. 🏁
- **`lint`** - Lints the codebase to ensure coding standards. Use the `:fix` variant to automatically resolve issues. 🔧
- **`cypress`** - Runs Cypress for end-to-end testing (currently not in use). 🧪
- **`test`** - Runs tests via Jest (currently not in use). 🧷
- **`generate`** - Quickly creates pages or components with minimal effort. ⚡
- **`storybook`** - Launches Storybook for visualizing and documenting components. 📚

## Project Structure 🗂️

This project is organized into multiple folders for better modularity and scalability. Here's an overview:

### Root-Level Directories:

- **`.storybook`** - Contains configurations for Storybook, allowing for seamless component documentation and visualization.
- **`.vscode`** - IDE settings to standardize the development environment. 🖥️
- **`build-tools`** - Configuration files for the Plop generator to streamline component or page creation. 🛠️
- **`cypress`** - Houses configurations for Cypress tests (not currently in use).
- **`public`** - Contains static assets like fonts, icons, and images that are publicly accessible. 🌐

### `src` Folder Structure:

- **`app`** - The core of the app router, including pages, Next-Auth logic, and API integrations. 🚪
- **`components`** - Reusable components for the frontend. Some components include stories viewable in Storybook, while simpler ones might not. 🧩
- **`context`** - Includes a theme context for switching between dark and light modes. Ideally, CSS variables would be used for this functionality. 🌗
- **`data`** - Stores data such as error messages and other static information. 📋
- **`endpoints`** - A centralized directory for API endpoint definitions. 🔗
- **`hooks`** - Custom React hooks to encapsulate reusable logic. 🪝
- **`interfaces`** - Contains TypeScript types and interfaces for strong type checking. ✅
- **`marketing`** - A simple abstraction for Google Analytics, enabling easy integration of tracking events. 📈
- **`providers`** - Houses providers for authentication, state management, and API queries. 🛡️
- **`redux`** - Contains actions and reducers for the Redux store, providing state management for the app. 🔄
- **`styles`** - General CSS files for global styling and theming. 🎨
- **`utils`** - Utility functions, including those for authentication and topic handling. ⚙️

## Font Licensing 🖋️

Certain fonts used in the project are not licensed for redistribution through this repository. These fonts are:

- `ABCDiatypeSemi-Mono-Bold`
- `ABCDiatypeSemi-Mono-Regular`

Feel free to replace these fonts with freely available alternatives or any fonts of your choice that align with the project’s style.

## Formatting and Linting 📏

To maintain a clean and consistent codebase, the project uses **Prettier** and **ESLint**. These tools ensure adherence to coding standards and a uniform style across the codebase.

## Containers 🐳

A **Dockerfile** is included in the project to containerize the app. This makes it simple to build and deploy the application in a Docker container for consistent environments.

## Environment Variables 🔑

The project requires specific environment variables to run. An example file, `.env.example`, is provided as a template. You will need to add your own credentials and API keys to make the application fully functional.

## Configurations ⚙️

Important configuration files can be found at the root of the project, including:

- **`constants.ts`** - Stores static constants used throughout the app.
- **`middleware.ts`** - Middleware configurations for Next.js.
- **`plopfile.js`** - Plop generator configuration for creating new components or pages.
- **`cypress.config.ts`** - Cypress test configuration (if enabled).
- **`jest.config.mjs`** - Jest testing configuration (if enabled).

---

Feel free to dive into the repository, explore the codebase, and adapt it to your needs. If you have any questions or feedback, don't hesitate to reach out. Happy coding! 😊

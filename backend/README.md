# 🌊 Daily Tide - Community Edition (CE) - Backend

<img src="https://github.com/Kickstartai-product/dailytide-community-edition/blob/main/repo-assets/logo.png?raw=true" height="75" /> <img src="https://github.com/Kickstartai-product/dailytide-community-edition/blob/main/repo-assets/logo-kai.svg?raw=true" height="45" /><br><br>

Welcome to the **Daily Tide Backend - Community Edition**! 🌊 This repository houses the proof-of-concept API for the Daily Tide project, designed to provide streamlined and efficient backend services for delivering daily insights into trending topics.

## Entrypoint 🏁

The main entry point for the backend is the **`server.ts`** file. This is where the application bootstraps and initializes the server for handling API requests. 🚀

## Configuration ⚙️

To get started with local development, create a `.env.development` file to define environment variables required by the backend. Use the provided `.env.example` as a base template to ensure all necessary configurations are included. 📂 Proper configuration is critical for smooth operation and debugging during development.

## Important Commands 🛠️

This project includes several commands to manage and operate the backend:

- **`prod`** - Run the API server in production mode after building the application. 🚀 Ideal for live deployments.
- **`dev`** - Run the API server in development mode. 🛠️ This mode includes features such as hot reloading for a more efficient workflow.
- **`build`** - Builds the app, creating a bundle that can be deployed. 📦 Ensure the app is built properly before running in production.

## Building a Docker Image 🐳

For containerized deployments, we provide a `Dockerfile.development`. This Dockerfile creates an image with the API backend, including the `.env.development` environment variables. Docker ensures consistency across environments, making it easy to replicate the backend setup locally or in staging. 📋

## Patterns 🗂️

The API follows a modular folder structure to ensure scalability and maintainability. In the `src/api/v1/` directory, you will find a structure that mirrors the API paths, making it intuitive to locate and modify specific routes. Additionally, some routes are documented using Swagger 📜 to provide clear and interactive API documentation.

## Important Files to Check 🔍

- **Static Data**: Files like **`constants.ts`** store static data, such as predefined messages or values. These can be adjusted to suit your specific needs. 🛠️
- **Configuration**: Application-wide settings and configurations are located in the **`src/Configs`** directory. 🗒️ Keeping configurations organized simplifies project management.

## Controllers 🎛️

The core business logic is implemented in the **`src/Controllers`** directory. Controllers handle incoming API requests and provide appropriate responses, serving as the heart of the backend's functionality.

## Database 🗄️

The backend utilizes **MongoDB** as the database of choice. MongoDB offers a flexible and efficient NoSQL solution. The database-related implementation can be found in:

- **`src/Models`**: Defines the data schemas and models.
- **`src/Database`**: Handles the database connection and configuration.

## Types 🧩

Type definitions are maintained in **`src/Interfaces`**, ensuring strong typing throughout the codebase. This improves code reliability and helps catch errors early in the development process.

## Authentication Middleware 🔑

Authentication-related logic is located in the **`src/Middlewares`** directory. Middleware ensures secure access to routes by validating tokens and user credentials before processing requests.

## Utility Functions 🧰

Reusable utility functions are stored in **`src/Utils/index.ts`**. These include operations such as:

- Formatting dates 📅
- Standardizing news sources 📰
- Hashing sensitive data like emails (optional if you are a cybersecurity freak) 🔒

These utilities help maintain clean and DRY (Don't Repeat Yourself) code. ✨

## Formatting and Linting 📏

To ensure a clean and consistent codebase, we use **Prettier** and **ESLint**. These tools enforce coding standards and formatting conventions, making collaboration seamless and code easier to read. 🖋️

---

Feel free to dive into the repository, explore the codebase, and adapt it to your needs. If you have any questions or feedback, don't hesitate to reach out. Happy coding! 😊

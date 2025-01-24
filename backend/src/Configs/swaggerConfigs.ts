export const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "The Daily Tide API",
      version: "0.1.0",
      description: "This is the API for the Daily Tide application.",
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:3001",
        description: "Development server",
      },
    ],
  },
  apis: ["./api/v1/**/*.ts"],
};

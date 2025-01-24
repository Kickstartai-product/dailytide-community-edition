import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import compression from "compression";
import cluster from "cluster";
import os from "os";
import { rateLimit } from "express-rate-limit";

let numCPUs = 1;

if (process.env.NODE_ENV === "production") {
  numCPUs = os.availableParallelism();
}

// Load environment variables from the appropriate .env file
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: ".env.development" });
}

import {
  topicRouter,
  articleRouter,
  voteRouter,
  commentRouter,
  userRouter,
  replyRouter,
  authRouter,
  categoryRouter,
} from "./src/api/v1";
import { connectToDatabase } from "@/Database/database";
import { SERVER_CONNECTION, HEALTHY } from "./constants";
import { swaggerOptions } from "./src/Configs";

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", () => {
    cluster.fork();
  });
} else {
  const app = express();
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 1000,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  });

  // Middleware
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.disable("etag");
  app.use(limiter);

  app.use(
    compression({
      level: 6,
      threshold: 1 * 1000,
      filter: (req, res) => {
        if (req.headers["x-no-compression"]) {
          return false;
        }
        return compression.filter(req, res);
      },
    }),
  );

  // Connect to MongoDB
  connectToDatabase();

  // swagger docs
  if (process.env.NODE_ENV === "development") {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)));
  }

  // This is a health check endpoint
  app.get("/healthy", (req: Request, res: Response) => {
    res.status(200).send({ msg: HEALTHY });
  });

  // Routes - api/v1
  app.use("/api/v1/topics", topicRouter);
  app.use("/api/v1/articles", articleRouter);
  app.use("/api/v1/votes", voteRouter);
  app.use("/api/v1/comments", commentRouter);
  app.use("/api/v1/replies", replyRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/auth", authRouter);

  // Error handling
  app.use((err: Error, req: Request, res: Response) => {
    console.error("Error Handling Middleware:", err.stack);
    if (typeof res.status !== "function") {
      console.error("res.status is not a function. Current type of res.status:", typeof res.status);
    }
    return res.status(500).send(err.message);
  });

  app.listen(process.env.PORT, () => {
    console.log(SERVER_CONNECTION, process.pid);
  });
}

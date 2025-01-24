import express from "express";

import { getTopics, getTopicById } from "@/Controllers/topicControllers";

const topicRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Topic:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         description: The auto-generated id of the topic
 *         title:
 *           type: string
 *         summary:
 *           type: string
 *         period:
 *           type: string
 *         popularity:
 *           type: number
 *         reference_links:
 *           type: array
 *         categories:
 *          type: array
 *         start_time:
 *          type: string
 *          format: date-time
 *         end_time:
 *          type: string
 *          format: date-time
 *
 * /api/v1/topics:
 *   get:
 *     summary: Get a list of topics
 *     responses:
 *       '200':
 *         description: A list of topics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Topic'
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *         description: Number of topics to skip
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of topics to return
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Filter topics by search
 *       - in: query
 *         name: category[]
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: Filter topics by category
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *         description: Filter topics by generated period
 *       - in: query
 *         name: date
 *         schema:
 *           type: date
 *         description: Filter topics by date
 */

topicRouter.get("/", getTopics);

/**
 * @swagger
 * /api/v1/topics/{topicId}:
 *   get:
 *     summary: Get a topic by ID
 *     parameters:
 *       - in: path
 *         name: topicId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the topic to retrieve
 *     responses:
 *       '200':
 *         description: A topic object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topic'
 *       '404':
 *         description: Topic not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 */

topicRouter.get("/topic/:topicId", getTopicById);

export default topicRouter;

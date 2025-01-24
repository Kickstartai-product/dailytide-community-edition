import express from "express";
import { getArticles, getArticleById } from "../../../Controllers/articleControllers";

const articlesRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       properties:
 *         _id:
 *          type: string
 *         title:
 *          type: string
 *         summary:
 *          type: string
 *         source:
 *          type: string
 *         source_link:
 *          type: string
 *         created:
 *          type: string
 * /api/v1/articles:
 *   get:
 *     summary: Get a list of articles
 *     responses:
 *       '200':
 *         description: A list of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *         description: Number of articles to skip
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of articles to return
 *       - in: query
 *         name: source
 *         schema:
 *           type: string
 *         description: Filter articles by source
 *       - in: query
 *         name: date
 *         schema:
 *           type: date
 *         description: Filter topics by date
 */

articlesRouter.get("/", getArticles);

/**
 * @swagger
 * /api/v1/articles/{articleId}:
 *   get:
 *     summary: Get an article by ID
 *     parameters:
 *       - in: path
 *         name: articleId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the article to retrieve
 *     responses:
 *       '200':
 *         description: An article object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       '400':
 *          description: Invalid ID
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *       '404':
 *         description: Article not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 */

articlesRouter.get("/:articleId", getArticleById);

export default articlesRouter;

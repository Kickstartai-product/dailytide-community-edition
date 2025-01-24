import { Request, Response, NextFunction } from "express";
import type { Article } from "../Interfaces/articleInterfaces";
import { ArticleModel } from "../Models/articles";
import { ObjectId } from "mongodb";
import { INVALID_ID, MS_PER_DAY, NOT_FOUND, QUERY_LIMIT } from "@/root/constants";
import { getSource } from "../Utils";
import { FilterQuery } from "mongoose";

async function getArticles(req: Request, res: Response, next: NextFunction) {
  try {
    const skip: number = Number(req.query.skip as string) || 0;
    const limit: number = Number(req.query.limit as string) || QUERY_LIMIT;
    const source: string = (req.query.source as string) || "";
    const date: number = Date.parse(req.query.date as string);
    let filter: FilterQuery<Article> = {};

    filter = source ? { ...filter, "source": getSource(source) } : filter;
    filter = !isNaN(date)
      ? { ...filter, "created": { "$gte": new Date(date - MS_PER_DAY), "$lte": new Date(date) } }
      : filter;

    const articles: Article[] = await ArticleModel.find(filter).skip(skip).limit(limit);

    return res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
}

async function getArticleById(req: Request, res: Response, next: NextFunction) {
  try {
    if (!ObjectId.isValid(req.params.articleId)) {
      return res.status(400).json({ msg: INVALID_ID });
    }

    const article: Article | null = await ArticleModel.findById(req.params.articleId);

    if (!article) {
      return res.status(404).json({ msg: NOT_FOUND });
    } else {
      return res.status(200).json(article);
    }
  } catch (error) {
    next(error);
  }
}

export { getArticles, getArticleById };

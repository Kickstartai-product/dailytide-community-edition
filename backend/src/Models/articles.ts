import mongoose, { Schema } from "mongoose";
import type { Article } from "@/Interfaces/articleInterfaces";

export const articleSchema = new Schema<Article>(
  {
    title: String,
    summary: String,
    created: Date,
    source: String,
    full_text: String,
    char_count: Number,
    upvotes: Number,
    downvotes: Number,
    comments: Number,
    author: String,
    author_link: String,
    publisher: String,
    publisher_link: String,
    source_link: String,
  },
  { collection: process.env.ARTICLE_COLLECTION },
);

export const ArticleModel = mongoose.model<Article>(process.env.ARTICLE_COLLECTION || "", articleSchema);

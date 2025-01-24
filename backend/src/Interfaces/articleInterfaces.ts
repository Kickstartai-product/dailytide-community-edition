import { Source } from "./enums";

export type Article = {
  title: string;
  summary: string;
  created: Date;
  source: Source;
  full_text?: string;
  char_count?: number;
  upvotes?: number;
  downvotes?: number;
  comments?: number;
  author?: string;
  author_link?: string;
  publisher?: string;
  publisher_link?: string;
  source_link?: string;
};

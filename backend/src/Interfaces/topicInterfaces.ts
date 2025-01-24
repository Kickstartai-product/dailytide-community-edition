import { Source, TopicPeriod, VoteType } from "./enums";
import { Types } from "mongoose";

export type SourcePopularity = {
  date: Date;
  score: number;
  source: Source;
  articles: string[];
  upvotes?: number;
  downvotes?: number;
  comments?: number;
};

export type HistoricalPopularity = {
  date: Date;
  score: number;
  sources: SourcePopularity[];
};

export type ReferenceLinks = {
  _id?: string;
  title: string;
  link: string;
  source_name: string;
};

export type Vote = {
  userId: string;
  vote: VoteType;
  date: Date;
};

export type TopicVote = {
  _id?: string;
  topicId: string;
  active: boolean;
  votes: Vote[];
};

export type Topic = {
  _id?: Types.ObjectId;
  category: Types.ObjectId;
  title: string;
  popularity: number;
  summary?: string;
  reference_links?: ReferenceLinks[];
  period?: TopicPeriod;
  start_time: Date;
  end_time: Date;
};

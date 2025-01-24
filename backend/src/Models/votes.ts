import mongoose, { Schema, Types } from "mongoose";
import { TopicVote } from "@/Interfaces/topicInterfaces";

const topicVotesSchema = new Schema<TopicVote>(
  {
    _id: Types.ObjectId,
    topicId: Types.ObjectId,
    active: Boolean,
    votes: [
      {
        userId: Types.ObjectId,
        date: Date,
        vote: String,
        _id: false,
      },
    ],
  },
  { collection: process.env.TOPIC_VOTES_COLLECTION, strict: false },
);

export const TopicVotesModel = mongoose.model<TopicVote>(process.env.TOPIC_VOTE_COLLELCTION || "", topicVotesSchema);

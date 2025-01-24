import mongoose, { Schema, Types } from "mongoose";
import { Comment, Reply } from "@/Interfaces/commentsInterfaces";

const replySchema = new Schema<Reply>({
  content: String,
  user: {
    _id: Types.ObjectId,
  },
  topicId: Types.ObjectId,
  created: Date,
  updated: Date,
  flag: String,
  verified: Boolean,
  active: Boolean,
  votes: [{ type: Schema.Types.ObjectId, ref: process.env.TOPIC_VOTES_COLLECTION }],
});

const commentSchema = new Schema<Comment>(
  {
    content: String,
    user: {
      _id: Types.ObjectId,
    },
    replies: [replySchema],
    topicId: Types.ObjectId,
    created: Date,
    updated: Date,
    flag: String,
    verified: Boolean,
    active: Boolean,
    votes: [{ type: Schema.Types.ObjectId, ref: process.env.TOPIC_VOTES_COLLECTION }],
  },
  { collection: process.env.TOPIC_COMMENTS_COLLECTION },
);

export const CommentsModel = mongoose.model<Comment>(process.env.TOPIC_COMMENTS_COLLECTION || "", commentSchema);

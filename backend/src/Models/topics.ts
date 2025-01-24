import mongoose, { Schema } from "mongoose";
import { Topic, ReferenceLinks } from "@/Interfaces/topicInterfaces";
import { Types } from "mongoose";

const ReferenceLinksSchema = new Schema<ReferenceLinks>({
  _id: String,
  source_name: String,
  link: String,
  title: String,
});

const topicSchema = new Schema<Topic>(
  {
    _id: Types.ObjectId,
    title: String,
    popularity: Number,
    summary: String,
    period: String,
    reference_links: [ReferenceLinksSchema],
    start_time: Date,
    end_time: Date,
  },
  { collection: process.env.TOPIC_COLLECTION },
);

export const TopicModel = mongoose.model<Topic>(process.env.TOPIC_COLLECTION || "", topicSchema);

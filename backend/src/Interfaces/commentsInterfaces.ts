import { ObjectId } from "mongodb";

type UserRef = {
  _id: ObjectId;
};

type Reply = {
  content: string;
  user: UserRef;
  topicId: ObjectId;
  active: boolean;
  created: Date;
  updated: Date;
  flag: string;
  verified: boolean;
  votes: ObjectId[];
};

type Comment = {
  content: string;
  user: UserRef;
  topicId: ObjectId;
  replies: Reply[];
  active: boolean;
  created: Date;
  updated: Date;
  flag: string;
  verified: boolean;
  votes: ObjectId[];
};

export type { Comment, Reply, UserRef };

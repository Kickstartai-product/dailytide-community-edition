import { Types } from "mongoose";

type UserRef = {
  _id: Types.ObjectId;
  username: string;
  name: string;
  userProfilePic?: string;
};

type Users = {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  token?: string;
  name: string;
  summary?: string;
  userProfilePic?: string;
  phone?: string;
  role?: string;
  verificationCode?: string;
  created: Date;
  updated: Date;
  last_login?: Date;
  last_logout?: Date;
  activationKey: string;
  active: boolean;
  verified: boolean;
};

export { Users, UserRef };

// UserModel.ts
import mongoose, { Schema, Document, Types } from "mongoose";
import { Users, UserRef } from "@/Interfaces/userInterfaces";
import bcrypt from "bcrypt";

export const UserRefSchema = new Schema<UserRef>({
  _id: Types.ObjectId,
  username: String,
  name: String,
  userProfilePic: String,
});

interface UserDocument extends Users, Document {
  _id: Types.ObjectId;
  activationKey: string;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    _id: Types.ObjectId,
    username: String,
    email: { type: String, required: true },
    name: String,
    phone: String,
    summary: String,
    password: { type: String, required: true },
    token: String,
    userProfilePic: String,
    verificationCode: String,
    role: String,
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    last_login: Date,
    activationKey: String,
    active: { type: Boolean, default: true },
    verified: { type: Boolean, default: false },
  },
  { collection: process.env.USER_COLLECTION },
);

userSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export const UserModel = mongoose.model<UserDocument>(process.env.USER_COLLECTION || "User", userSchema);

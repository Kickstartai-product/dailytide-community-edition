import mongoose, { Schema } from "mongoose";
import type { Category } from "@/Interfaces/categoryInterfaces";

export const categorySchema = new Schema<Category>(
  {
    _id: Schema.Types.ObjectId,
    name: String,
  },
  { collection: process.env.CATEGORY_COLLECTION },
);

export const CategoryModel = mongoose.model<Category>(process.env.CATEGORY_COLLECTION || "", categorySchema);

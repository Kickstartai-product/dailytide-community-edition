import { Request, Response, NextFunction } from "express";
import { Category } from "@/Interfaces/categoryInterfaces";
import { CategoryModel } from "@/Models/categories";

export async function getCategories(req: Request, res: Response, next: NextFunction) {
  try {
    const categories: Category[] = await CategoryModel.find();

    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
}

export async function getCategoryById(req: Request, res: Response, next: NextFunction) {
  try {
    const category: Category | null = await CategoryModel.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
}

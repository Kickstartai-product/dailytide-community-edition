import express from "express";
import { getCategories, getCategoryById } from "@/Controllers/categoryControllers";

const categoryRouter = express.Router();

categoryRouter.get("/", getCategories);
categoryRouter.get("/category/:id", getCategoryById);

export default categoryRouter;

import express from "express";
import { getComments, addComment, deleteComment, editComment } from "@/Controllers/commentController";

import { addReply, editReply, deleteReply } from "@/Controllers/replyControllers";

import { authenticateToken } from "@/Middlewares/index";

const commentRouter = express.Router();

commentRouter.post("/:id", getComments);

commentRouter.post("/", authenticateToken, addComment);

commentRouter.delete("/", authenticateToken, deleteComment);

commentRouter.patch("/", authenticateToken, editComment);

commentRouter.post("/reply", authenticateToken, addReply);

commentRouter.patch("/reply", authenticateToken, editReply);

commentRouter.delete("/reply", authenticateToken, deleteReply);

export default commentRouter;

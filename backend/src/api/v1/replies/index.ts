import express from "express";
import { getReplies, addReply, editReply, deleteReply } from "@/Controllers/replyControllers";

import { authenticateToken } from "@/Middlewares/index";

const replyRouter = express.Router();

replyRouter.get("/", getReplies);

replyRouter.post("/", authenticateToken, addReply);

replyRouter.delete("/", authenticateToken, deleteReply);

replyRouter.patch("/", authenticateToken, editReply);

export default replyRouter;

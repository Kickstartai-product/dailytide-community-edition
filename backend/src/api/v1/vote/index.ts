import express from "express";
import { addVote, getVotes } from "@/Controllers/voteController";
import { authenticateToken } from "@/Middlewares/index";

const voteRouter = express.Router();

voteRouter.post("/", getVotes);

voteRouter.post("/vote", authenticateToken, addVote);

export default voteRouter;

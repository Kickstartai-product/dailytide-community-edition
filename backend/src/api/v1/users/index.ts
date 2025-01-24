import express from "express";
import {
  signup,
  login,
  activateAccount,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from "@/Controllers/userControllers";

import { authenticateToken } from "@/root/src/Middlewares";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/activateAccount", activateAccount);
userRouter.get("/profile/:userId", getUserProfile);
userRouter.put("/profile/:userId", updateUserProfile);
userRouter.delete("/profile/:userId", authenticateToken, deleteUserProfile);

export default userRouter;

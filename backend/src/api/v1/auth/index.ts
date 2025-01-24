import { Router } from "express";
import { register, signin, validateUserRegistration } from "@/Controllers/authControllers";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.get("/signin", signin);
authRouter.get("/validateUserRegistration", validateUserRegistration);

export default authRouter;

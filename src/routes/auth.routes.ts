import express from "express";
import { signIn, signUp } from "../controller";
import { signinAuthDto, signupAuthDto } from "../dto";
import { validateRequest } from "../middlewares";

const authRouter = express.Router();

authRouter.post("/signup", validateRequest(signupAuthDto), signUp);
authRouter.post("/signin", validateRequest(signinAuthDto), signIn);

export default authRouter;

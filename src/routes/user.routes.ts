import { Router } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const users = await AppDataSource.getRepository(User).find();
  res.json(users);
});

export default userRouter;

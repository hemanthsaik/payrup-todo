import express from "express";

const authRouter = express.Router();

authRouter.post("/signup", (req, res) => {
  res.send("user is singing up ");
});
authRouter.post("/signin", (req, res) => {
  res.send("user is signing in");
});

export default authRouter;

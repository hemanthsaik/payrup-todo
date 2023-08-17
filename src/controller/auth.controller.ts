import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const signUp = (req: Request, res: Response) => {
  res.send("user is singing up ");
};

export const signIn = (req: Request, res: Response) => {
  res.send("user is singing in ");
};

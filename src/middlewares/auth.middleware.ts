import { NextFunction, Request, Response } from "express";
import { ValidationChain } from "express-validator";
import jwt from "jsonwebtoken";
import { userInfo } from "os";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secrat-key");
    const userId = decodedToken.sub;
    req.body = { ...req.body, userId };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Unauthorized user",
    });
  }
};

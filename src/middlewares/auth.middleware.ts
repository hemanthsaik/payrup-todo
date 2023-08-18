import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, "secrat-key");
      console.log(decodedToken);

      next();
    } catch (error) {
      console.log(error);

      res.status(401).json({
        error: "Invalid request!",
      });
    }
  };
};

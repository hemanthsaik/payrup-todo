import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secrat-key");
    const userId = decodedToken.sub;
    req.body = { ...req.body, userId };
    next();
  } catch (error) {
    console.log(error);
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({
        error: "token expired login again",
      });
    }
    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({
        error: "invalid header",
      });
    }
    res.status(401).json({
      error: "Unauthorized user",
    });
  }
};

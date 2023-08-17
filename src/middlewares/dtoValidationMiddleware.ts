import { validationResult, ValidationChain } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validateRequest = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const result = validationResult(req);
    if (result.isEmpty()) {
      next();
    } else {
      res.status(422).json({ errors: result.array() });
    }
  };
};

export default validateRequest;

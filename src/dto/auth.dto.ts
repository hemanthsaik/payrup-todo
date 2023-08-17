import { body } from "express-validator";

const MustBeUserName = body("userName")
  .notEmpty()
  .withMessage("must not be empty")
  .isString()
  .withMessage("must be a char");

const MustBeEmail = body("email")
  .notEmpty()
  .withMessage("must not be empty")
  .isEmail()
  .withMessage("must be valid email");

const MustBePassword = body("password")
  .notEmpty()
  .withMessage("must not be empty")
  .isLength({ min: 8, max: 20 })
  .withMessage("must have 8 char and max 20 char");

export const signupAuthDto = [MustBeEmail, MustBePassword, MustBeUserName];
export const signinAuthDto = [MustBeEmail, MustBePassword];

import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import jwt from "jsonwebtoken";

const createJwtToken = (user: User) => {
  const token = jwt.sign(
    {
      sub: user.id,
      name: user.name,
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
    },
    "secrat-key"
  );
  return token;
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    const user = await AppDataSource.getRepository(User).findOneBy({ email });
    if (user) return res.send("user is already exist please login");

    const newUser = new User();

    newUser.email = email;
    newUser.name = username;
    newUser.password = password;

    const result = await AppDataSource.getRepository(User).save(newUser);
    const token = createJwtToken(result);
    res.json({ token });
  } catch (error) {
    console.log(error);

    res.send("someting went wrong");
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await AppDataSource.getRepository(User).findOneBy({ email });
    if (!user) return res.send("user doesn't exist please signup");

    const passwordVerified = password === user.password;

    if (passwordVerified) {
      const token = createJwtToken(user);
      res.json({ token });
      return;
    }
    res.send("invalid credential");
  } catch (error) {
    console.log(error);
    res.send("someting went wrong");
  }
};

import { Request, Response } from "express";
import { validationResult } from "express-validator";
import db from "../utils/database";
import { AppDataSource } from "../data-source";
import { Todo } from "../entity/Todo";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    console.log(userId);

    const todos = await AppDataSource.getRepository(Todo).find({
      where: {
        user: { id: userId },
      },
      relations: ["user"],
    });

    res.json(todos);
  } catch (error) {
    console.log(error);
    res.json({ msg: "error something went wrong" });
  }
};

export const postTodo = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
      const { task, isDone } = req.body;
      const createdTodo = await db.createTodo(task, isDone);
      res.json(createdTodo);
    } catch (error) {
      res.json({ msg: "error something went wrong" });
    }
  } else {
    res.json({ errors: result.array() });
  }
};

export const putTodoTask = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
      const { id } = req.params;
      const { task } = req.body;
      const updatedTodo = await db.updateTodoTaskById(id, task);
      res.json(updatedTodo);
    } catch (error) {
      res.json({ msg: "error something went wrong" });
    }
  } else {
    res.json({ errors: result.array() });
  }
};

export const putTodoisDone = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
      const { id } = req.params;
      const { isDone } = req.body;
      const updatedTodo = await db.updateTodoIsDone(id, isDone);
      res.json(updatedTodo);
    } catch (error) {
      console.log(error);
      res.json({ msg: "error something went wrong" });
    }
  } else {
    res.json({ errors: result.array() });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
      const { id } = req.params;
      await db.deleteTodoById(id);
      res.json({ msg: "todo deleted successfuly" });
    } catch (error) {
      console.log(error);
      res.json({ msg: "error somtiong went wrong" });
    }
  } else {
    res.json({ errors: result.array() });
  }
};

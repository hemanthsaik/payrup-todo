import { Request, Response } from "express";
import { validationResult } from "express-validator";
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
    });

    res.json(todos);
  } catch (error) {
    console.log(error);
    res.json({ msg: "error something went wrong" });
  }
};

export const postTodo = async (req: Request, res: Response) => {
  try {
    const { task, isDone, userId } = req.body;
    console.log(req.body.userId);

    const todo = new Todo();
    todo.task = task;
    todo.isDone = isDone;
    todo.user = userId;

    const createdTodo = await AppDataSource.getRepository(Todo).save(todo);
    res.json(createdTodo);
  } catch (error) {
    res.json({ msg: "error something went wrong" });
  }
};

export const putTodoTask = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { task, userId } = req.body;

    const todoRepository = AppDataSource.getRepository(Todo);
    const todoToUpdate = await todoRepository.findOne({
      where: {
        id,
        user: { id: userId },
      },
    });

    if (!todoToUpdate) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    todoToUpdate.task = task;
    const updatedTodo = await todoRepository.save(todoToUpdate);
    res.json(updatedTodo);
  } catch (error) {
    res.json({ msg: "error something went wrong" });
  }
};

export const putTodoisDone = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { isDone, userId } = req.body;
    const todoRepository = AppDataSource.getRepository(Todo);
    const todoToUpdate = await todoRepository.findOne({
      where: {
        id,
        user: { id: userId },
      },
    });

    if (!todoToUpdate) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    todoToUpdate.isDone = isDone;
    const updatedTodo = await todoRepository.save(todoToUpdate);
    res.json(updatedTodo);
  } catch (error) {
    console.log(error);
    res.json({ msg: "error something went wrong" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const todoRepository = AppDataSource.getRepository(Todo);
    const todoToDelete = await todoRepository.findOne({
      where: {
        id,
      },
    });

    if (!todoToDelete) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    await todoRepository.remove(todoToDelete);

    res.json({ msg: "Todo deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ msg: "error somtiong went wrong" });
  }
};

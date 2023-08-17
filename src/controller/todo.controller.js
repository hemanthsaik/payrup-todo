import { validationResult } from "express-validator";
import db from "../utils/database.js";

export const getTodos = async (req, res) => {
  try {
    res.json(await db.getAllTodos());
  } catch (error) {
    console.log(error);
    res.json({ msg: "error somtiong went wrong" });
  }
};

export const postTodo = async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
      const { task, isDone } = req.body;
      const createdTodo = await db.createTodo(task, isDone);
      res.json(createdTodo);
    } catch (error) {
      res.json({ msg: "error somtiong went wrong" });
    }
  } else {
    res.json({ errors: result.array() });
  }
};

export const putTodoTask = async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
      const { id } = req.params;
      const { task } = req.body;
      const updatedTodo = await db.updateTodoTaskById(id, task);
      res.json(updatedTodo);
    } catch (error) {
      res.json({ msg: "error somtiong went wrong" });
    }
  } else {
    res.json({ errors: result.array() });
  }
};

export const putTodoisDone = async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
      const { id } = req.params;
      const { isDone } = req.body;
      const updatedTodo = await db.updateTodoIsDone(id, isDone);
      res.json(updatedTodo);
    } catch (error) {
      console.log(error);
      res.json({ msg: "error somtiong went wrong" });
    }
  } else {
    res.json({ errors: result.array() });
  }
};

export const deleteTodo = async (req, res) => {
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

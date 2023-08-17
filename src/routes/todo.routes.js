import { Router } from "express";

import {
  postTodo,
  getTodos,
  putTodoTask,
  putTodoisDone,
  deleteTodo,
} from "../controller/todo.controller.js";

import {
  creteTodoDto,
  deleteTodoDto,
  updateTodoIsDoneDto,
  updateTodoTaskDto,
} from "../dto/todo.dto.js";

const todoRouter = Router();

todoRouter.get("/all", getTodos);

todoRouter.post("/", creteTodoDto, postTodo);

todoRouter.put("/:id/task", updateTodoTaskDto, putTodoTask);

todoRouter.put("/:id/isdone", updateTodoIsDoneDto, putTodoisDone);

todoRouter.delete("/:id", deleteTodoDto, deleteTodo);

export default todoRouter;

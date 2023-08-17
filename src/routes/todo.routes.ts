import { Router } from "express";

import {
  postTodo,
  getTodos,
  putTodoTask,
  putTodoisDone,
  deleteTodo,
} from "../controller";

import {
  creteTodoDto,
  deleteTodoDto,
  updateTodoIsDoneDto,
  updateTodoTaskDto,
} from "../dto";

const todoRouter = Router();

todoRouter.get("/all", getTodos);

todoRouter.post("/", creteTodoDto, postTodo);

todoRouter.put("/:id/task", updateTodoTaskDto, putTodoTask);

todoRouter.put("/:id/isdone", updateTodoIsDoneDto, putTodoisDone);

todoRouter.delete("/:id", deleteTodoDto, deleteTodo);

export default todoRouter;

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
  getAllTodoDto,
  updateTodoIsDoneDto,
  updateTodoTaskDto,
} from "../dto";
import { auth } from "../middlewares/auth.middleware";
import validateRequest from "../middlewares/dtoValidationMiddleware";

const todoRouter = Router();

todoRouter.get("/all", validateRequest(getAllTodoDto), auth, getTodos);

todoRouter.post("/", auth, creteTodoDto, postTodo);

todoRouter.put("/:id/task", auth, updateTodoTaskDto, putTodoTask);

todoRouter.put("/:id/isdone", auth, updateTodoIsDoneDto, putTodoisDone);

todoRouter.delete("/:id", auth, deleteTodoDto, deleteTodo);

export default todoRouter;

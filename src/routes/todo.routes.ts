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

todoRouter.put("/:id/task", updateTodoTaskDto, putTodoTask);

todoRouter.put("/:id/isdone", updateTodoIsDoneDto, putTodoisDone);

todoRouter.delete("/:id", deleteTodoDto, deleteTodo);

export default todoRouter;

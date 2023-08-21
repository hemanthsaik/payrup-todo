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
import { validateRequest } from "../middlewares/dtoValidationMiddleware";

const todoRouter = Router();

todoRouter.get("/all", validateRequest(getAllTodoDto), getTodos);

todoRouter.post("/", validateRequest(creteTodoDto), postTodo);

todoRouter.put("/:id/task", validateRequest(updateTodoTaskDto), putTodoTask);

todoRouter.put(
  "/:id/isdone",
  validateRequest(updateTodoIsDoneDto),
  putTodoisDone
);

todoRouter.delete("/:id", validateRequest(deleteTodoDto), deleteTodo);

export default todoRouter;

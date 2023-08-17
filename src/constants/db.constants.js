export const GET_ALL_TODOS = "SELECT * from todos";
export const GET_TODO_BY_ID = "SELECT * from todos WHERE id = ?";
export const INSERT_TODO = "INSERT INTO todos (task, isDone) VALUES (?,?);";
export const DELETE_TODO_BY_ID = "DELETE FROM todos WHERE id = ?";
export const DELETE_TODOS = "DELETE FROM todos;";
export const UPDATE_TODO_TASK = "UPDATE todos SET task = ? WHERE id = ?;";
export const UPDATE_TODO_IS_DONE = "UPDATE todos SET isDone = ? WHERE id = ?;";
export const COUNT_TODO =
  "SELECT COUNT(*) AS todo_count FROM todos WHERE id = ?;";

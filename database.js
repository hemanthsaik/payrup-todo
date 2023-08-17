import dotenv from "dotenv";
import mysql from "mysql2/promise";
import {
  DELETE_TODOS,
  DELETE_TODO_BY_ID,
  GET_ALL_TODOS,
  GET_TODO_BY_ID,
  INSERT_TODO,
  UPDATE_TODO_IS_DONE,
  UPDATE_TODO_TASK,
} from "./src/constants/db.constants.js";

dotenv.config();

class Database {
  constructor() {
    // database connection
    this.pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
  }

  //   Query runner
  async executeQuery(query, params = []) {
    try {
      const [res] = await this.pool.query(query, params);
      return res;
    } catch (error) {
      throw new Error("Database error: " + error.message);
    }
  }

  async getAllTodos() {
    return this.executeQuery(GET_ALL_TODOS);
  }

  async getTodoById(id) {
    const res = await this.executeQuery(GET_TODO_BY_ID, [id]);
    return res[0];
  }

  async createTodo(task, isDone = false) {
    const res = await this.executeQuery(INSERT_TODO, [task, isDone]);
    const id = res.insertId;
    return await this.getTodoById(id);
  }

  async deleteTodoById(id) {
    await this.executeQuery(DELETE_TODO_BY_ID, [id]);
  }

  async deleteALLTodos() {
    await this.executeQuery(DELETE_TODOS);
  }

  async updateTodoTaskById(id, task) {
    const res = await this.executeQuery(UPDATE_TODO_TASK, [task, id]);
    if (res.affectedRows > 0) return await this.getTodoById(id);

    throw new Error("todo doesn't exist or incurrect id");
  }

  async updateTodoIsDone(id, isDone) {
    const res = await this.executeQuery(UPDATE_TODO_IS_DONE, [isDone, id]);
    if (res.affectedRows > 0) return await this.getTodoById(id);

    throw new Error("todo doesn't exist or incurrect id");
  }

  async checkIfTodoExist(id) {
    return "check if todo exist";
  }
}

const db = new Database();
export default db;

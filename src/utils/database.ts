import dotenv from "dotenv";
import * as mysql from "mysql2/promise";
import {
  DELETE_TODOS,
  DELETE_TODO_BY_ID,
  GET_ALL_TODOS,
  GET_TODO_BY_ID,
  INSERT_TODO,
  UPDATE_TODO_IS_DONE,
  UPDATE_TODO_TASK,
} from "../constants";

dotenv.config();

class Database {
  private pool: mysql.Pool;
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
  async executeQuery(query: string, params: any[] = []) {
    try {
      const [res] = await this.pool.query(query, params);
      return res;
    } catch (error: any) {
      throw new Error("Database error: " + error.message);
    }
  }

  async getAllTodos() {
    return this.executeQuery(GET_ALL_TODOS);
  }

  async getTodoById(id: string) {
    const res: any = await this.executeQuery(GET_TODO_BY_ID, [id]);
    return res[0];
  }

  async createTodo(task: string, isDone = false) {
    const res: any = await this.executeQuery(INSERT_TODO, [task, isDone]);
    const id = res.insertId;
    return await this.getTodoById(id);
  }

  async deleteTodoById(id: string) {
    await this.executeQuery(DELETE_TODO_BY_ID, [id]);
  }

  async deleteALLTodos() {
    await this.executeQuery(DELETE_TODOS);
  }

  async updateTodoTaskById(id: string, task: string) {
    const res: any = await this.executeQuery(UPDATE_TODO_TASK, [task, id]);
    if (res.affectedRows > 0) return await this.getTodoById(id);

    throw new Error("todo doesn't exist or incurrect id");
  }

  async updateTodoIsDone(id: string, isDone: boolean) {
    const res: any = await this.executeQuery(UPDATE_TODO_IS_DONE, [isDone, id]);
    if (res.affectedRows > 0) return await this.getTodoById(id);

    throw new Error("todo doesn't exist or incurrect id");
  }

  async checkIfTodoExist(id: number) {
    return "check if todo exist";
  }
}

const db = new Database();
export default db;


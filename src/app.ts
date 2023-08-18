import express from "express";

import authRouter from "./routes/auth.routes";
import todoRouter from "./routes/todo.routes";
import { AppDataSource } from "./data-source";
import userRouter from "./routes/user.routes";
import { auth } from "./middlewares/auth.middleware";

const app = express();

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) =>
    console.log("Error during Data Source initialization:", error)
  );

app.use("/api", express.static("public"));

app.get("/", (req, res) => {
  res.redirect("http://localhost:3000/api");
});

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/todo", todoRouter);
app.get("/test", auth, (req, res) => {
  res.send("hello world");
});

export default app;

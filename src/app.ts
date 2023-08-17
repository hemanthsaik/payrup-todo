import express from "express";

import authRouter from "./routes/auth.routes";
import todoRouter from "./routes/todo.routes";
const app = express();

app.use(express.json());

app.use("/api", express.static("public"));

app.get("/", (req, res) => {
  res.redirect("http://localhost:3000/api");
});

app.use("/auth", authRouter);
app.use("/todo", todoRouter);

export default app;

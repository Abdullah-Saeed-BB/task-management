import express from "express";
import cors from "cors";

// Routes
import projectRouter from "./routes/projectRouter";
import taskRouter from "./routes/taskRouter";
import userEmployeeRouter from "./routes/userEmployeeRouter";
import userManagerRouter from "./routes/userManagerRouter";
import userRouter from "./routes/userRouter";

const app = express();

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} - ${req.path}`);
  next();
});

// Using routes
app.use("/api/project", projectRouter);
app.use("/api/task", taskRouter);
app.use("/api/user/employee", userEmployeeRouter);
app.use("/api/user/manager", userManagerRouter);
app.use("/api/user", userRouter);

app.listen(4000, () => {
  console.log("Successful - server is running");
});

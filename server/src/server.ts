import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import jwt, { Secret } from "jsonwebtoken";

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
app.use("/api/project", authenticateToken, projectRouter);
app.use("/api/task", authenticateToken, taskRouter);
app.use("/api/user/employee", authenticateToken, userEmployeeRouter);
app.use("/api/user/manager", authenticateToken, userManagerRouter);
app.use("/api/user", userRouter);

app.listen(4000, () => {
  console.log("Successful - server is running");
});

export default app;

// Authentication middleware

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN as Secret, (err, user) => {
    if (err) return res.sendStatus(403);

    req.body.user = user;

    next();
  });
}

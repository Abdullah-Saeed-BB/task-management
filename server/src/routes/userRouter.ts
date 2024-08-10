import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { authenticateToken } from "../server";

const router = express.Router();

const prisma = new PrismaClient();

interface User {
  id: string;
  role: "EMPLOYEE" | "MANAGER";
}

router.get("/", async (req: Request, res: Response) => {
  const allUsers = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(allUsers);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!(await prisma.user.findFirst({ where: { id } })))
    return res.status(400).json("This user already deleted");

  try {
    await prisma.task.deleteMany({
      where: { assignedToId: id },
    });

    await prisma.user.update({
      where: { id },
      data: { projects: { set: [] } },
    });

    const deletedUser = await prisma.user.delete({ where: { id } });

    res.json(deletedUser);
  } catch {
    res.status(400).json("Error happened during deleting this user");
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!(await prisma.user.findFirst({ where: { id } }))) {
    return res.status(400).json("The user you want to update, does not exist");
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: req.body,
      include: { projects: true, tasks: true },
    });

    res.json(updatedUser);
  } catch {
    res.status(400).json("There is an error happened during update this user");
  }
});

// Authentication

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!password || !email)
    return res.status(400).json("There is no email or passowrd");

  const user = await prisma.user.findFirst({
    where: {
      password,
      email,
    },
  });

  if (!user) return res.status(401).json("Wrong password or email");

  const accessToken = jwt.sign(
    { id: user.id, isEmployee: user.role == "EMPLOYEE" },
    process.env.ACCESS_TOKEN as Secret
  );

  res.json({ accessToken, user });
});

export default router;

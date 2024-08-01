import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const router = express.Router();

const prisma = new PrismaClient();

router.get("/", async (req: Request, res: Response) => {
  const allManagers = await prisma.user.findMany({
    where: { role: "MANAGER" },
    orderBy: { createdAt: "desc" },
  });

  res.json(allManagers);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const manager = await prisma.user.findFirst({
      where: { id },
    });

    if (!manager) throw new Error("We did not find this manager");

    res.json(manager);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { name, email, password, tasks } = req.body;

  try {
    const createdManager = await prisma.user.create({
      data: {
        name,
        email,
        password,
        tasks,
        role: "MANAGER",
      },
    });

    res.json(createdManager);
  } catch (err: any) {
    res.status(400).json("Cannot create this manager, there is error happened");
  }
});

export default router;

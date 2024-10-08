import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const router = express.Router();

const prisma = new PrismaClient();

router.get("/", async (req: Request, res: Response) => {
  const allTasks = await prisma.task.findMany({
    include: { assignedTo: true },
    orderBy: { createdAt: "desc" },
  });

  res.json(allTasks);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const task = await prisma.task.findFirst({
    where: { id },
    include: { assignedTo: true, project: true },
  });

  if (!task) return res.status(400).json("We did not find task");

  res.json(task);
});

router.post("/", async (req: Request, res: Response) => {
  const {
    title,
    description,
    notes,
    status,
    dueDate,
    assignedToId,
    projectId,
  } = req.body;

  try {
    const createdTask = await prisma.task.create({
      data: {
        title,
        description,
        notes,
        status,
        dueDate,
        assignedToId,
        projectId,
      },
    });

    res.json(createdTask);
  } catch (err: any) {
    res.status(400).json("Cannot create this task, there is error happened");
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedTask = await prisma.task.delete({
      where: { id },
      include: { assignedTo: true, project: true },
    });

    res.json(deletedTask);
  } catch {
    res.status(400).json("Error happened during deleting this task");
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, status, assignedToId, dueDate, notes } = req.body;

  if (!(await prisma.task.findFirst({ where: { id } }))) {
    return res.status(400).json("The task you want to update, does not exist");
  }

  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        status,
        assignedToId,
        dueDate,
        notes,
      },
      include: { assignedTo: true, project: true },
    });

    res.json(updatedTask);
  } catch (err: any) {
    res.status(400).json("There is an error happened during update this task");
  }
});

export default router;

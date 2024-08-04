import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const router = express.Router();

const prisma = new PrismaClient();

const colors: String[] = [
  "#84cc16",
  "#4ade80",
  "#10b981",
  "#2dd4bf",
  "#06b6d4",
  "#38bdf8",
  "#3b82f6",
  "#818cf8",
  "#8b5cf6",
  "#c084fc",
];

router.get("/", async (req: Request, res: Response) => {
  const allProjects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { users: true, _count: { select: { tasks: true } } },
  });

  res.json(allProjects);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const project = await prisma.project.findFirst({
      where: { id },
      include: {
        tasks: {
          include: { assignedTo: { select: { id: true, name: true } } },
          orderBy: { createdAt: "desc" },
        },
        users: true,
      },
    });

    if (!project) throw new Error("We did not find this project");

    res.json(project);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const createdProject = await prisma.project.create({
      data: { ...req.body, color: randomColor },
    });

    res.json(createdProject);
  } catch {
    res.status(400).json("Cannot create this project, there is error happened");
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!(await prisma.project.findFirst({ where: { id } })))
    return res.status(400).json("This project already deleted");

  try {
    await prisma.task.deleteMany({
      where: { projectId: id },
    });

    const deletedProject = await prisma.project.delete({
      where: { id },
      include: { users: true, tasks: true },
    });

    res.json(deletedProject);
  } catch (err: any) {
    res.status(400).json("Error happened during deleting this project");
    // res.status(400).json(err.message);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!(await prisma.project.findFirst({ where: { id } }))) {
    return res
      .status(400)
      .json("The project you want to update, does not exist");
  }

  try {
    const updatedProject = await prisma.project.update({
      where: { id },
      data: req.body,
    });

    res.json(updatedProject);
  } catch {
    res
      .status(400)
      .json("There is an error happened during update this project");
  }
});

router.put("/:projectId/:userId", async (req: Request, res: Response) => {
  const { projectId, userId } = req.params;

  if (!(await prisma.project.findFirst({ where: { id: projectId } }))) {
    return res
      .status(400)
      .json("The project you want to assigned, does not exist");
  }
  if (!(await prisma.user.findFirst({ where: { id: userId } }))) {
    return res
      .status(400)
      .json("The user you want to get assigned does not exist");
  }

  try {
    const assignedProject = await prisma.project.update({
      data: {
        users: { connect: { id: userId } },
      },
      where: { id: projectId },
      include: { users: true },
    });

    res.json(assignedProject);
  } catch {
    res
      .status(400)
      .json("There is an error when assigning the user to the project");
  }
});

export default router;

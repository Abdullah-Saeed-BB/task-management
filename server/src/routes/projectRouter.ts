import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const router = express.Router();

const prisma = new PrismaClient();

const colors: string[] = [
  "#f59e0b",
  "#facc15",
  "#84cc16",
  "#4ade80",
  "#2dd4bf",
  "#38bdf8",
  "#3b82f6",
  "#8b5cf6",
  "#c084fc",
  "#d946ef",
];

router.get("/", async (req: Request, res: Response) => {
  const { id, isEmployee } = req.body.user;

  const allProjects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { users: true, _count: { select: { tasks: true } } },
    where: isEmployee ? { users: { some: { id } } } : {},
  });

  res.json(allProjects);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id: userId } = req.body.user;

  try {
    const project = await prisma.project.findFirst({
      where: { id },
      include: {
        users: true,
      },
    });

    const tasksAT = await prisma.task.findMany({
      where: { assignedToId: userId, projectId: id },
      include: { assignedTo: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });

    const tasksNAT = await prisma.task.findMany({
      where: { assignedToId: { not: userId }, projectId: id },
      include: { assignedTo: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });

    if (!project) throw new Error("We did not find this project");

    res.json({ ...project, tasks: [...tasksAT, ...tasksNAT] });
  } catch (err: any) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

router.get("/:id/users", async (req: Request, res: Response) => {
  const { id } = req.params;

  const projectsUsers = await prisma.project.findFirst({
    where: {
      id,
    },
    select: {
      users: {
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          tasks: true,
        },
      },
    },
  });

  res.json(projectsUsers);
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const createdProject = await prisma.project.create({
      data: { title: req.body.title, color: randomColor },
    });

    res.json(createdProject);
  } catch (err: any) {
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
  const { color, title } = req.body;

  if (!(await prisma.project.findFirst({ where: { id } }))) {
    return res
      .status(400)
      .json("The project you want to update, does not exist");
  }

  try {
    const updatedProject = await prisma.project.update({
      where: { id },
      data: { color, title },
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
      where: { id: projectId },
      data: {
        users: { connect: { id: userId } },
      },
      include: { users: true },
    });

    res.json(assignedProject);
  } catch {
    res
      .status(400)
      .json("There is an error when assigning the user to the project");
  }
});

router.put(
  "/disconnect/:projectId/:userId",
  async (req: Request, res: Response) => {
    const { projectId, userId } = req.params;

    if (!(await prisma.project.findFirst({ where: { id: projectId } }))) {
      return res
        .status(400)
        .json("The project you want to disconnect, does not exist");
    }
    if (!(await prisma.user.findFirst({ where: { id: userId } }))) {
      return res
        .status(400)
        .json("The user you want to get disconnect does not exist");
    }

    try {
      const disconnectProject = await prisma.project.update({
        where: { id: projectId },
        data: {
          users: { disconnect: { id: userId } },
        },
        include: { users: true },
      });

      await prisma.task.deleteMany({
        where: { assignedToId: userId, projectId },
      });

      res.json(disconnectProject);
    } catch {
      res
        .status(400)
        .json("There is an error when disconnect the user to the project");
    }
  }
);

export default router;

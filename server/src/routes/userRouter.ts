import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const router = express.Router();

const prisma = new PrismaClient();

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

export default router;

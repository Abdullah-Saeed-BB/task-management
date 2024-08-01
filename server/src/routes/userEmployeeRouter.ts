import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const router = express.Router();

const prisma = new PrismaClient();

router.get("/", async (req: Request, res: Response) => {
  const allEmployees = await prisma.user.findMany({
    where: { role: "EMPLOYEE" },
    include: { projects: true },
    orderBy: { createdAt: "desc" },
  });

  res.json(allEmployees);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const employee = await prisma.user.findFirst({
      where: { id },
      include: { projects: true },
    });

    if (!employee) throw new Error("We did not find this employee");

    res.json(employee);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { name, email, password, tasks } = req.body;

  try {
    const createdEmployee = await prisma.user.create({
      data: {
        name,
        email,
        password,
        tasks,
        role: "EMPLOYEE",
      },
      include: { projects: true },
    });

    res.json(createdEmployee);
  } catch (err: any) {
    res
      .status(400)
      .json("Cannot create this employee, there is error happened");
    // res.status(400).json(err.message);
  }
});

export default router;

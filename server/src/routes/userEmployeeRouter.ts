import { Prisma, PrismaClient } from "@prisma/client";
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
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code == "P2002") {
        return res
          .status(400)
          .json("This email already exist, try another one");
      }
    }
    res
      .status(400)
      .json("Cannot create this employee, there is error happened");
  }
});

export default router;

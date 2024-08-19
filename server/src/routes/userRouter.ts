import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import jwt, { Secret, VerifyErrors, VerifyOptions } from "jsonwebtoken";
import { authenticateToken } from "../server";

const router = express.Router();

const prisma = new PrismaClient();

interface User {
  id: string;
  name: string;
  isEmployee: boolean;
}

router.get("/", authenticateToken, async (req: Request, res: Response) => {
  const allUsers = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { projects: true },
  });

  res.json(allUsers);
});

router.get(
  "/client",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { id } = req.body.user;

    const client = await prisma.user.findFirst({ where: { id } });

    res.json(client);
  }
);

router.get("/:id", authenticateToken, async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findFirst({
      where: { id },
      include: {
        projects: {
          select: {
            id: true,
            title: true,
            color: true,
            tasks: { where: { assignedToId: id }, select: { status: true } },
          },
        },
      },
    });

    if (!user) throw new Error("We did not find this user");

    res.json(user);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
});

router.delete(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { id: clientId } = req.body.user;

    if (clientId === id)
      return res.status(400).json("You can't delete yourself");

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
  }
);

router.put("/:id", authenticateToken, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const { email: clinetEmail } = req.body.user;

  if (!(await prisma.user.findFirst({ where: { id } }))) {
    return res.status(400).json("The user you want to update, does not exist");
  }

  try {
    if (email === "admin") {
      return res.status(400).json("You can't update 'admin' user");
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email, password },
      include: { projects: true, tasks: true },
    });

    res.json(updatedUser);
  } catch {
    res.status(400).json("There is an error happened during update this user");
  }
});

// Authentication

router.post("/refresh", async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN as Secret,
    (err: VerifyErrors | null, user: User | any) => {
      if (err) return res.sendStatus(403);

      if (user.id) {
        const newAccessToken = generateAccessToken({
          id: user.id,
          name: user.name,
          isEmployee: user.isEmployee,
        });

        return res.json({ accessToken: newAccessToken });
      }
    }
  );
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Authentication user
  if (!password || !email)
    return res.status(400).json("There is no email or passowrd");

  if (
    password === "admin" &&
    email === "admin" &&
    !(await prisma.user.findFirst({
      where: { email: "admin", password: "admin" },
    }))
  ) {
    await prisma.user.create({
      data: {
        name: "Admin",
        email,
        password,
        role: "MANAGER",
      },
    });
  }
  const user = await prisma.user.findFirst({
    where: {
      password,
      email,
    },
  });
  if (!user) return res.status(401).json("Wrong password or email");

  // Generate token
  const userToken = {
    id: user.id,
    name: user.name,
    isEmployee: user.role === "EMPLOYEE",
  };

  const accessToken = generateAccessToken(userToken);
  const refreshToken = jwt.sign(
    userToken,
    process.env.REFRESH_TOKEN as Secret,
    { expiresIn: "3d" }
  );

  res.json({ accessToken, refreshToken });
});

function generateAccessToken(user: Object) {
  return jwt.sign(user, process.env.ACCESS_TOKEN as Secret, {
    expiresIn: "1h",
  });
}

export default router;

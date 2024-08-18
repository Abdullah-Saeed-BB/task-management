"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
const colors = [
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
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, isEmployee } = req.body.user;
    const allProjects = yield prisma.project.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            users: true,
            tasks: { select: { status: true } },
        },
        where: isEmployee ? { users: { some: { id } } } : {},
    });
    res.json(allProjects);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { id: userId } = req.body.user;
    try {
        const project = yield prisma.project.findFirst({
            where: { id },
            include: {
                users: true,
            },
        });
        if (!project)
            throw new Error("We did not find this project");
        const tasksAT = yield prisma.task.findMany({
            where: { assignedToId: userId, projectId: id },
            include: { assignedTo: { select: { id: true, name: true } } },
            orderBy: { createdAt: "desc" },
        });
        const tasksNAT = yield prisma.task.findMany({
            where: { assignedToId: { not: userId }, projectId: id },
            include: { assignedTo: { select: { id: true, name: true } } },
            orderBy: { createdAt: "desc" },
        });
        res.json(Object.assign(Object.assign({}, project), { tasks: [...tasksAT, ...tasksNAT] }));
    }
    catch (err) {
        res.status(400).json(err.message);
    }
}));
router.get("/:id/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const projectsUsers = yield prisma.project.findFirst({
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
    if (!projectsUsers)
        return res.status(400).json("We did not find this project");
    res.json(projectsUsers);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const createdProject = yield prisma.project.create({
            data: { title: req.body.title, color: randomColor },
        });
        res.json(createdProject);
    }
    catch (err) {
        res.status(400).json("Cannot create this project, there is error happened");
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!(yield prisma.project.findFirst({ where: { id } })))
        return res.status(400).json("This project already deleted");
    try {
        yield prisma.task.deleteMany({
            where: { projectId: id },
        });
        const deletedProject = yield prisma.project.delete({
            where: { id },
            include: { users: true, tasks: true },
        });
        res.json(deletedProject);
    }
    catch (err) {
        res.status(400).json("Error happened during deleting this project");
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { color, title } = req.body;
    if (!(yield prisma.project.findFirst({ where: { id } }))) {
        return res
            .status(400)
            .json("The project you want to update, does not exist");
    }
    try {
        const updatedProject = yield prisma.project.update({
            where: { id },
            data: { color, title },
        });
        res.json(updatedProject);
    }
    catch (_a) {
        res
            .status(400)
            .json("There is an error happened during update this project");
    }
}));
router.put("/:projectId/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, userId } = req.params;
    if (!(yield prisma.project.findFirst({ where: { id: projectId } }))) {
        return res
            .status(400)
            .json("The project you want to assigned, does not exist");
    }
    if (!(yield prisma.user.findFirst({ where: { id: userId } }))) {
        return res
            .status(400)
            .json("The user you want to get assigned does not exist");
    }
    try {
        const assignedProject = yield prisma.project.update({
            where: { id: projectId },
            data: {
                users: { connect: { id: userId } },
            },
            include: { users: true },
        });
        res.json(assignedProject);
    }
    catch (_a) {
        res
            .status(400)
            .json("There is an error when assigning the user to the project");
    }
}));
router.put("/disconnect/:projectId/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, userId } = req.params;
    if (!(yield prisma.project.findFirst({ where: { id: projectId } }))) {
        return res
            .status(400)
            .json("The project you want to disconnect, does not exist");
    }
    if (!(yield prisma.user.findFirst({ where: { id: userId } }))) {
        return res
            .status(400)
            .json("The user you want to get disconnect does not exist");
    }
    try {
        const disconnectProject = yield prisma.project.update({
            where: { id: projectId },
            data: {
                users: { disconnect: { id: userId } },
            },
            include: { users: true },
        });
        yield prisma.task.deleteMany({
            where: { assignedToId: userId, projectId },
        });
        res.json(disconnectProject);
    }
    catch (_a) {
        res
            .status(400)
            .json("There is an error when disconnect the user to the project");
    }
}));
exports.default = router;

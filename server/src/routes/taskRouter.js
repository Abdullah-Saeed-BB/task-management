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
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allTasks = yield prisma.task.findMany({
        include: { assignedTo: true },
        orderBy: { createdAt: "desc" },
    });
    res.json(allTasks);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const task = yield prisma.task.findFirst({
        where: { id },
        include: { assignedTo: true, project: true },
    });
    if (!task)
        return res.status(400).json("We did not find task");
    res.json(task);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, notes, status, dueDate, assignedToId, projectId, } = req.body;
    try {
        const createdTask = yield prisma.task.create({
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
    }
    catch (err) {
        res.status(400).json("Cannot create this task, there is error happened");
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedTask = yield prisma.task.delete({
            where: { id },
            include: { assignedTo: true, project: true },
        });
        res.json(deletedTask);
    }
    catch (_a) {
        res.status(400).json("Error happened during deleting this task");
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, status, assignedToId, dueDate, notes } = req.body;
    if (!(yield prisma.task.findFirst({ where: { id } }))) {
        return res.status(400).json("The task you want to update, does not exist");
    }
    try {
        const updatedTask = yield prisma.task.update({
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
    }
    catch (err) {
        res.status(400).json("There is an error happened during update this task");
    }
}));
exports.default = router;

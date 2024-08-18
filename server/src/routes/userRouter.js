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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_1 = require("../server");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get("/", server_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        include: { projects: true },
    });
    res.json(allUsers);
}));
router.get("/client", server_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body.user;
    const client = yield prisma.user.findFirst({ where: { id } });
    res.json(client);
}));
router.get("/:id", server_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield prisma.user.findFirst({
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
        if (!user)
            throw new Error("We did not find this user");
        res.json(user);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
}));
router.delete("/:id", server_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { id: clientId } = req.body.user;
    if (clientId === id)
        return res.status(400).json("You can't delete yourself");
    if (!(yield prisma.user.findFirst({ where: { id } })))
        return res.status(400).json("This user already deleted");
    try {
        yield prisma.task.deleteMany({
            where: { assignedToId: id },
        });
        yield prisma.user.update({
            where: { id },
            data: { projects: { set: [] } },
        });
        const deletedUser = yield prisma.user.delete({ where: { id } });
        res.json(deletedUser);
    }
    catch (_a) {
        res.status(400).json("Error happened during deleting this user");
    }
}));
router.put("/:id", server_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const { email: clinetEmail } = req.body.user;
    if (!(yield prisma.user.findFirst({ where: { id } }))) {
        return res.status(400).json("The user you want to update, does not exist");
    }
    console.log(req.body.user);
    try {
        if (email === "admin") {
            return res.status(400).json("You can't update 'admin' user");
        }
        const updatedUser = yield prisma.user.update({
            where: { id },
            data: { name, email, password },
            include: { projects: true, tasks: true },
        });
        res.json(updatedUser);
    }
    catch (_a) {
        res.status(400).json("There is an error happened during update this user");
    }
}));
// Authentication
router.post("/refresh", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    if (!refreshToken)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
        if (err)
            return res.sendStatus(403);
        if (user.id) {
            const newAccessToken = generateAccessToken({
                id: user.id,
                name: user.name,
                isEmployee: user.isEmployee,
            });
            return res.json({ accessToken: newAccessToken });
        }
    });
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Authentication user
    if (!password || !email)
        return res.status(400).json("There is no email or passowrd");
    if (password === "admin" &&
        email === "admin" &&
        !(yield prisma.user.findFirst({
            where: { email: "admin", password: "admin" },
        }))) {
        yield prisma.user.create({
            data: {
                name: "Admin",
                email,
                password,
                role: "MANAGER",
            },
        });
    }
    const user = yield prisma.user.findFirst({
        where: {
            password,
            email,
        },
    });
    if (!user)
        return res.status(401).json("Wrong password or email");
    // Generate token
    const userToken = {
        id: user.id,
        name: user.name,
        isEmployee: user.role === "EMPLOYEE",
    };
    const accessToken = generateAccessToken(userToken);
    const refreshToken = jsonwebtoken_1.default.sign(userToken, process.env.REFRESH_TOKEN, { expiresIn: "3d" });
    res.json({ accessToken, refreshToken });
}));
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign(user, process.env.ACCESS_TOKEN, {
        expiresIn: "1h",
    });
}
exports.default = router;

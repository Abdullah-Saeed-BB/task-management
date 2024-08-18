"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Routes
const projectRouter_1 = __importDefault(require("./routes/projectRouter"));
const taskRouter_1 = __importDefault(require("./routes/taskRouter"));
const userEmployeeRouter_1 = __importDefault(require("./routes/userEmployeeRouter"));
const userManagerRouter_1 = __importDefault(require("./routes/userManagerRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Using routes
app.use("/api/project", authenticateToken, projectRouter_1.default);
app.use("/api/task", authenticateToken, taskRouter_1.default);
app.use("/api/user/employee", authenticateToken, userEmployeeRouter_1.default);
app.use("/api/user/manager", authenticateToken, userManagerRouter_1.default);
app.use("/api/user", userRouter_1.default);
app.listen(4000, () => {
    console.log("Successful - server is running");
});
exports.default = app;
// Authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err)
            return res.sendStatus(403);
        req.body.user = user;
        next();
    });
}

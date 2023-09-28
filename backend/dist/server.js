"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(routes_1.router);
app.use("/files", express_1.default.static(path_1.default.resolve(__dirname, "..", "tmp", "uploads")));
// Exemplo: http://localhost:3333/files/767f6e2cf01e41e5b2239b15bccda0f6-man-make-baber.jpg
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }
    return res.status(500).json({
        status: "error",
        message: "Internal server error"
    });
});
app.get('/', (_req, res) => {
    return res.send('Bien venido!');
});
app.listen(3333, () => console.log('Servidor online!'));

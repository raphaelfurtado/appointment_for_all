import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import path from "path";
import { router } from "./routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.use("/files", express.static(path.resolve(__dirname, "..", "tmp", "uploads")));
// Exemplo: http://localhost:3333/files/767f6e2cf01e41e5b2239b15bccda0f6-man-make-baber.jpg

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){
        return res.status(400).json({
            error: err.message
        });
    }

    return res.status(500).json({
        status: "error",
        message: "Internal server error"
    });
});

app.listen(3333, () => console.log('Servidor online!'))
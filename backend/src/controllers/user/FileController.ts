import { Request, Response } from "express"
import { FileUserService } from "../../services/user/FileUserService";

class FileController{

    async handle(req: Request, res: Response) {

        const { originalname: name, filename: path } = req.file;

        const fileUserService = new FileUserService;

        const user = await fileUserService.execute({
            name,
            path
        });

        return res.json(user)
    }

}

export {FileController}
import { Request, Response } from "express";
import { UpdateUserService } from "../../services/user/UpdateUserService";

class UpdateUserController {
    async handle(req: Request, res: Response){
        const {name, email, oldPassword, password} = req.body;

        const updateUserService = new UpdateUserService();

        const user = await updateUserService.execute({
            id: req.user_id, 
            name, 
            email,
            oldPassword,
            password
        });

        console.log(user);

        return res.json(user);
    }
}

export {UpdateUserController}
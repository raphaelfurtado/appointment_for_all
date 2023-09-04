import * as Yup from "yup";
import { Request, Response } from "express";
import { UpdateUserService } from "../../services/user/UpdateUserService";

class UpdateUserController {
    async handle(req: Request, res: Response){

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6, "Mínimo de 6 caracteres"),
            password: Yup.string().min(6).when("oldPassword", (oldPassword, field) => 
                oldPassword ? field.required() : field
            ),
            confirmPassword: Yup.string().when("password", (password, field) => 
                password ? field.required().oneOf([Yup.ref("password")]) : field
            )
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "Validation fails"})
        }

        const {name, email, oldPassword, password, avatar_id} = req.body;

        const updateUserService = new UpdateUserService();

        const user = await updateUserService.execute({
            id: req.user_id, 
            name, 
            email,
            oldPassword,
            password,
            avatar_id
        });

        return res.json(user);
    }
}

export {UpdateUserController}
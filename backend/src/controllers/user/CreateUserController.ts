import * as Yup from "yup";
import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
    async handle(req: Request, res: Response) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password_hash: Yup.string().required().min(6, "Mínimo de 6 caracteres"),
            provider: Yup.string().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "Validation fails"})
        }

        const { name, email, password_hash, provider } = req.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            name,
            email,
            password_hash,
            provider
        });

        return res.json(user);
    }
}

export { CreateUserController }
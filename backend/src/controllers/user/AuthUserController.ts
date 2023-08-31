import * as Yup from "yup";
import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController  {
    async handle(req: Request, res: Response){

        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "Validation fails"})
        }

        const {email, password} = req.body;

        const authUserService = new AuthUserService();

        const auth = await authUserService.execute({
            email,
            password,
        });

        return res.json(auth);
    }
}

export {AuthUserController }
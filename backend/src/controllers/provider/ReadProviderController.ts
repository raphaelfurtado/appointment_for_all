import * as Yup from "yup";
import { Request, Response } from "express";
import { ReadProviderService } from "../../services/provider/ReadProviderService";

class ReadProviderController {
    async handle(req: Request, res: Response) {

        // const schema = Yup.object().shape({
        //     name: Yup.string().required(),
        //     email: Yup.string().email().required(),
        //     password_hash: Yup.string().required().min(6, "Mínimo de 6 caracteres"),
        //     provider: Yup.string().required()
        // });

        const readProviderService = new ReadProviderService();

        const providers = await readProviderService.execute();

        return res.json(providers);
    }
}

export { ReadProviderController }
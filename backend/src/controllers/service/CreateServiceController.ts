import * as Yup from "yup";
import { Request, Response } from "express";
import { CreateService } from "../../services/service/CreateService";

class CreateServiceController {
    async handle(req: Request, res: Response) {

        const schema = Yup.object().shape({
            name: Yup.string().required("Nome é obrigatório"),
            description: Yup.string(),
            price: Yup.number().required(),
            duration: Yup.number().required(),
            categoryServiceId: Yup.number().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "Validation fails"})
        }

        const { name, description, price, duration, categoryServiceId } = req.body;

        const createService = new CreateService();

        const category = await createService.execute({
            name,
            description,
            price,
            duration,
            categoryServiceId
        });

        return res.json(category);
    }
}

export { CreateServiceController }
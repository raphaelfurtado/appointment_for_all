import * as Yup from "yup";
import { Request, Response } from "express";
import { UpdateCategoryService } from "../../services/category/UpdateCategoryService";
import { UpdateService } from "../../services/service/UpdateService";

class UpdateServiceController {
    async handle(req: Request, res: Response) {

        const schema = Yup.object().shape({
            name: Yup.string().required("Nome é obrigatório"),
            description: Yup.string(),
            price: Yup.number().required(),
            duration: Yup.number().required(),
            categoryServiceId: Yup.number().required(),
            active: Yup.boolean().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "Validation fails"})
        }

        const serviceId = parseInt(req.params.id);
        const { name, description, price, duration, categoryServiceId, active } = req.body;

        const updateService = new UpdateService();

        const category = await updateService.execute({
            id: serviceId,
            name,
            description,
            price,
            duration,
            categoryServiceId,
            active
        });

        return res.json(category);
    }
}

export { UpdateServiceController }
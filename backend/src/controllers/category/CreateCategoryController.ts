import * as Yup from "yup";
import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

class CreateCategoryController {
    async handle(req: Request, res: Response) {

        const schema = Yup.object().shape({
            name: Yup.string().required("Nome é obrigatório"),
            description: Yup.string(),
            active: Yup.boolean(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "Validation fails"})
        }

        const { name, description, active } = req.body;

        const createCategoryService = new CreateCategoryService();

        const category = await createCategoryService.execute({
            name,
            description,
            active
        });

        return res.json(category);
    }
}

export { CreateCategoryController }
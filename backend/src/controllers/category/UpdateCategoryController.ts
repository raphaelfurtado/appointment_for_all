import * as Yup from "yup";
import { Request, Response } from "express";
import { UpdateCategoryService } from "../../services/category/UpdateCategoryService";

class UpdateCategoryController {
    async handle(req: Request, res: Response) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "Validation fails"})
        }

        const categoryId = parseInt(req.params.id);
        const { name, description } = req.body;

        const updateCategoryService = new UpdateCategoryService();

        const category = await updateCategoryService.execute({
            id: categoryId,
            name,
            description
        });

        return res.json(category);
    }
}

export { UpdateCategoryController }
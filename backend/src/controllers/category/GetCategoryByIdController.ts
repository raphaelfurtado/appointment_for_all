import { Request, Response } from "express";
import { GetCategoryByIdService } from "../../services/category/GetCategoryByIdService";

class GetCategoryByIdController {
    async handle(req: Request, res: Response) {

        const { id } = req.query;

        const parsedId = Number(id);

        const categories = new GetCategoryByIdService();

        const categoriesList = await categories.execute({
            id: parsedId
        });

        return res.json(categoriesList);
    }
}

export { GetCategoryByIdController }
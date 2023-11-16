import { Request, Response } from "express";
import { ListAvailableService } from "../../services/available/ListAvailableService";
import { format, setHours, setMinutes, setSeconds, isAfter } from "date-fns";
import prismaClient from "../../prisma";
import { ListCategoryService } from "../../services/category/ListCategoryService";

class ListCategoryController {
    async handle(req: Request, res: Response) {

        const { search } = req.query;

        const valor: string = typeof search === 'string' ? search : '';


        const categories = new ListCategoryService();

        const categoriesList = await categories.execute({
            search: valor
        });

        return res.json(categoriesList);
    }
}

export { ListCategoryController }
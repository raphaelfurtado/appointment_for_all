import { Request, Response } from "express";
import { ListService } from "../../services/service/ListService";

class ListServiceController {
    async handle(req: Request, res: Response) {

        const { search } = req.query;

        const valor: string = typeof search === 'string' ? search : '';

        const service = new ListService();

        const servicesList = await service.execute({
            search: valor
        });

        return res.json(servicesList);
    }
}

export { ListServiceController }
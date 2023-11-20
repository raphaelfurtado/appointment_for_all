import { Request, Response } from "express";
import { GetServiceById } from "../../services/service/GetServiceById";

class GetServiceByIdController {
    async handle(req: Request, res: Response) {

        const { id } = req.query;

        const parsedId = Number(id);

        const service = new GetServiceById();

        const serviceList = await service.execute({
            id: parsedId
        });

        return res.json(serviceList);
    }
}

export { GetServiceByIdController }
import * as Yup from "yup";
import { Request, Response } from "express";
import { ListScheduleService } from "../../services/schedule/ListScheduleService";

class ListScheduleController {
    async handle(req: Request, res: Response) {

        const { date } = req.query;

        const dateAsString = typeof date === 'string' ? date : String(date);

        const listScheduleService = new ListScheduleService();

        const schedule = await listScheduleService.execute({
            user_id: parseInt(req.user_id),
            date: dateAsString
        });

        return res.json(schedule);
    }
}

export { ListScheduleController }
import * as Yup from "yup";
import { Request, Response } from "express";
import { ListAppointmentService } from "../../services/appointment/ListAppointmentService";

class ListAppointmentController {
    async handle(req: Request, res: Response) {

        const { page = 1 } = req.query;

        const pageAsString = typeof page === 'string' ? page : String(page);

        const listAppointmentService = new ListAppointmentService();

        const appointment = await listAppointmentService.execute({
            user_id: parseInt(req.user_id),
            page: parseInt(pageAsString)
        });

        return res.json(appointment);
    }
}

export { ListAppointmentController }
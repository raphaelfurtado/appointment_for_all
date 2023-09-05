import * as Yup from "yup";
import { Request, Response } from "express";
import { FindAppointmentService } from "../../services/appointment/FindAppointmentService";

class FindAppointmentController {
    async handle(req: Request, res: Response) {

        const { provider_id, date } = req.body;

        const findAppointmentService = new FindAppointmentService();

        const appointment = await findAppointmentService.execute({
            user_id: parseInt(req.user_id)
        });

        return res.json(appointment);
    }
}

export { FindAppointmentController }
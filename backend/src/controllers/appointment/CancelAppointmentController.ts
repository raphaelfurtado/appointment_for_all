import { Request, Response } from "express";
import { CancelAppointmentService } from "../../services/appointment/CancelAppointmentService";

class CancelAppointmentController {
    async handle(req: Request, res: Response) {

        const id = req.params.id;

        const idAsString = typeof id === 'string' ? id : String(id);

        const cancelAppointmentService = new CancelAppointmentService();

        const appointment = await cancelAppointmentService.execute({
            id: idAsString,
            user_id: req.user_id
        });

        return res.json(appointment);
    }
}

export { CancelAppointmentController }
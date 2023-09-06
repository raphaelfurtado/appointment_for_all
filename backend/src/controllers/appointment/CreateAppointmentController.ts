import * as Yup from "yup";
import { Request, Response } from "express";
import { CreateAppointmentService } from "../../services/appointment/CreateAppointmentService";

class CreateAppointmentController {
    async handle(req: Request, res: Response) {

        const schema = Yup.object().shape({
            date: Yup.date().required(),
            provider_id: Yup.number().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "Validation fails"})
        }

        const { provider_id, date, observation, service_id } = req.body;

        const createAppointmentService = new CreateAppointmentService();

        const appointment = await createAppointmentService.execute({
            provider_id,
            date,
            user_id: parseInt(req.user_id),
            observation,
            service_id
        });

        return res.json(appointment);
    }
}

export { CreateAppointmentController }
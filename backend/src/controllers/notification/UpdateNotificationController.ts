import { Request, Response } from "express";
import { UpdateNotificationService } from "../../services/notifications/UpdateNotificationService";

class UpdateNotificationController {
    async handle(req: Request, res: Response) {

        const { id } = req.query;

        const idAsString = typeof id === 'string' ? id : String(id);

        const updateNotificationService = new UpdateNotificationService();

        const notification = await updateNotificationService.execute(idAsString);

        return res.json(notification);
    }
}

export { UpdateNotificationController }
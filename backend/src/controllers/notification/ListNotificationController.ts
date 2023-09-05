import { Request, Response } from "express";
import { ListNotificationService } from "../../services/notifications/ListNotificationService";

class ListNotificationController  {
    async handle(req: Request, res: Response){

        const user_id = req.user_id;

        const user = parseInt(user_id);
       
        const listNotificationService = new ListNotificationService(); 

        const notification = await listNotificationService.execute(user);

        return res.json(notification);
    }
}

export {ListNotificationController }
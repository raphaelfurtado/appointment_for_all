import prismaClient from "../../prisma";

class UpdateNotificationService {
    async execute(id: string) {

        const notifications = await prismaClient.notifications.update({
            where: {
                id: parseInt(id)
            },
            data: {
                read: true
            },
        });

        return notifications;
    }
}

export { UpdateNotificationService }
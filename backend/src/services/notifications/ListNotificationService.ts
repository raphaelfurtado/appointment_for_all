import prismaClient from "../../prisma";

class ListNotificationService {
    async execute(user_id: number) {

        const isProvider = await prismaClient.users.findFirst({
            where: {
                id: user_id,
                provider: "provider"
            }
        });

        if (!isProvider) throw new Error("Only provider can load notifications");

        const notifications = await prismaClient.notifications.findMany({
            where: {
                user_id: user_id
            },
            orderBy: {
                createdAt: "asc"
            },
            take: 20
        });

        return notifications;
    }
}

export { ListNotificationService }
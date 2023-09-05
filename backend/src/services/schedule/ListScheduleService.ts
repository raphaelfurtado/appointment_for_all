import { hash } from "bcryptjs";
import prismaClient from "../../prisma";
import { endOfDay, parseISO, startOfDay } from "date-fns";

interface ScheduleProps {
    user_id: number;
    date: string;
}

class ListScheduleService {
    async execute({ user_id, date }: ScheduleProps) {

        const checkUserProvider = await prismaClient.users.findFirst({
            where: {
                id: user_id,
                provider: "provider"
            }
        });

        if (!checkUserProvider) throw new Error("User is not a provider");

        const parsedDate = parseISO(date);

        const appointments = await prismaClient.appointments.findMany({
            where: {
                provider_id: user_id,
                canceled_at: null,
                date: {
                    // Coloque o valor mínimo do intervalo aqui
                    gte: startOfDay(parsedDate),
                    // Coloque o valor máximo do intervalo aqui
                    lte: endOfDay(parsedDate)
                }
            },
            orderBy: {
                date: "asc"
            }
        });

        return appointments;
    }
}

export { ListScheduleService }
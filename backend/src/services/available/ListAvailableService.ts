import { endOfDay, setHours, setMinutes, setSeconds, startOfDay } from "date-fns";
import prismaClient from "../../prisma";

interface AvailableProps{
    idProvider: number;
    date: number;
}

class ListAvailableService  {
    async execute({date, idProvider}: AvailableProps){

        const appointments = await prismaClient.appointments.findMany({
            where: {
                provider_id: idProvider,
                canceled_at: null,
                date: {
                    // Coloque o valor mínimo do intervalo aqui
                    gte: startOfDay(date),
                    // Coloque o valor máximo do intervalo aqui
                    lte: endOfDay(date)
                },
            }
        });

        return appointments;
    }
}

export {ListAvailableService }
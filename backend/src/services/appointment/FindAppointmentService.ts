import { hash } from "bcryptjs";
import prismaClient from "../../prisma";
import { isBefore, parseISO, startOfHour } from "date-fns";

interface AppointmentsProps{
    user_id: number;
}

class FindAppointmentService  {
    async execute({user_id}: AppointmentsProps) {

        const appointments = await prismaClient.appointments.findMany({
            where: {
                user_id: user_id,
                canceled_at: null
            },
            orderBy:{
                canceled_at: "asc"
            },
            select: {
                id: true,
                date: true,
                provider: {
                    select: {
                        id: true,
                        name: true,
                        avatar: {
                            select: {
                                id: true,
                                name: true,
                                path: true,
                            }
                        }
                    }
                }
            },
        });

        return appointments;
    }
}

export { FindAppointmentService  }
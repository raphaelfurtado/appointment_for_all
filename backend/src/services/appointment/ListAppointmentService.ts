import { hash } from "bcryptjs";
import prismaClient from "../../prisma";
import { isBefore, parseISO, startOfHour } from "date-fns";

interface AppointmentsProps {
    user_id: number;
    page: number;
}

class ListAppointmentService {
    async execute({ user_id, page }: AppointmentsProps) {

        const pageSize = 10; // Quantidade de registros por página
        const currentPage = page; // Página atual que você deseja mostrar
        const skip = (currentPage - 1) * pageSize;


        const appointments = await prismaClient.appointments.findMany({
            where: {
                user_id: user_id,
                canceled_at: null
            },
            orderBy: {
                canceled_at: "asc"
            },
            take: pageSize,
            skip: skip,
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
                },
            },
        });

        return appointments;
    }
}

export { ListAppointmentService }
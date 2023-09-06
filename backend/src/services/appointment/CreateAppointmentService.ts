import { hash } from "bcryptjs";
import prismaClient from "../../prisma";
import { format, isBefore, parseISO, startOfHour } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

interface AppointmentsProps {
    provider_id: number;
    date: string;
    user_id: number;
    observation: string;
    service_id: number;
}

class CreateAppointmentService {
    async execute({ provider_id, date, user_id, observation, service_id }: AppointmentsProps) {

        const isProvider = await prismaClient.users.findFirst({
            where: {
                id: provider_id,
                provider: "provider"
            }
        });

        if (!isProvider) throw new Error("You can only create appointments with providers");

        const hourStart = startOfHour(parseISO(date));

        if (isBefore(hourStart, new Date())) throw new Error("Past dates are not permitted");

        const checkAvailability = await prismaClient.appointments.findFirst({
            where: {
                provider_id: provider_id,
                canceled_at: null,
                date: hourStart
            }
        });

        if (checkAvailability) throw new Error("Appointment date is not available");

        const service = await prismaClient.services.findUnique({
            where: {
                id: service_id
            }
        });

        const appointment = await prismaClient.appointments.create({
            data: {
                user_id: user_id,
                provider_id: provider_id,
                date: date,
                price: service.price,
                observation: observation,
                service_id: service_id,
            },
            select: {
                id: true,
                date: true,
                canceled_at: true,
                observation: true,
                price: true,
                service: {
                    select: {
                        name: true,
                        duration: true
                    }
                }
            }
        });

        const user = await prismaClient.users.findFirst({
            where: {
                id: user_id
            }
        });

        const formattedDate = format(
            hourStart,
            "'dia' dd 'de' MMMM', às' H:mm'h' ",
            {
                locale: ptBR
            }
        );

        await prismaClient.notifications.create({
            data: {
                message: `Novo agendamento de ${user.name} para ${formattedDate}`,
                user_id: provider_id,
            }
        })

        return appointment;
    }
}

export { CreateAppointmentService }
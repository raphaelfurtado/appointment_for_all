import { hash } from "bcryptjs";
import prismaClient from "../../prisma";
import { format, isBefore, parseISO, startOfHour, subHours } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

interface AppointmentProps {
    id: string;
    user_id: string;
}

class CancelAppointmentService {
    async execute({ id, user_id }: AppointmentProps) {

        const isSameUserAppointment = await prismaClient.appointments.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!isSameUserAppointment) throw new Error("You don't have permission to cancel this appointment");

        if (isSameUserAppointment.user_id !== parseInt(user_id)) {
            throw new Error("You don't have permission to cancel this appointment");
        }

        const dateWithSub = subHours(isSameUserAppointment.date, 2);

        // if(isBefore(dateWithSub, new Date())) throw new Error("You can olnly cancel appointment 1 hour in advance.");

        const appointment = await prismaClient.appointments.update({
            where: {
                id: parseInt(id)
            },
            data: {
                canceled_at: new Date()
            }
        });

        return appointment;
    }
}

export { CancelAppointmentService }
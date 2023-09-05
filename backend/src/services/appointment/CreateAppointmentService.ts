import { hash } from "bcryptjs";
import prismaClient from "../../prisma";
import { isBefore, parseISO, startOfHour } from "date-fns";
interface AppointmentsProps{
    provider_id: number;
    date: string;
    user_id: number;
}

class CreateAppointmentService  {
    async execute({provider_id, date, user_id}: AppointmentsProps) {

        const isProvider = await prismaClient.users.findFirst({
            where: {
                id: provider_id,
                provider: "provider"
            }
        });

        if(!isProvider) throw new Error("You can only create appointments with providers");

        const hourStart = startOfHour(parseISO(date));

        if(isBefore(hourStart, new Date())) throw new Error("Past dates are not permitted");

        const checkAvailability = await prismaClient.appointments.findFirst({
            where: {
                provider_id: provider_id,
                canceled_at: null,
                date: hourStart
            }
        });

        if(checkAvailability) throw new Error("Appointment date is not available");

        const user = await prismaClient.appointments.create({
            data: {
                user_id: user_id,
                provider_id: provider_id,
                date: date
            }
        });

        return user;
    }
}

export { CreateAppointmentService  }
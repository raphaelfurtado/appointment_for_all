import { hash } from "bcryptjs";
import prismaClient from "../../prisma";
interface AppointmentsProps{
    provider_id: number;
    date: Date;
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
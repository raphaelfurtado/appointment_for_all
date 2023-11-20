import { endOfDay, setHours, setMinutes, setSeconds, startOfDay } from "date-fns";
import prismaClient from "../../prisma";

interface ServiceProps {
    id: number;
}

class GetServiceById {
    async execute({ id }: ServiceProps) {

        const service = await prismaClient.services.findUnique({
            where: {
                id: id
            }
        });

        return service;
    }
}

export { GetServiceById }
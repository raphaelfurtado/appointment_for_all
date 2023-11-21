import { endOfDay, setHours, setMinutes, setSeconds, startOfDay } from "date-fns";
import prismaClient from "../../prisma";

interface ServiceProps {
    search: string;
}

class ListService {
    async execute({ search }: ServiceProps) {

        const service = await prismaClient.services.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: search,
                            mode: 'insensitive'
                        },
                    },
                ],
            },
            select:{
                id: true,
                name: true,
                description: true,
                price: true,
                duration: true,
                active: true,
                categoryService:{
                    select: {
                        id: true,
                        name: true,
                        active: true
                    }
                }
            },
            orderBy:{
                name: 'asc'
            }
        });

        return service;
    }
}

export { ListService }
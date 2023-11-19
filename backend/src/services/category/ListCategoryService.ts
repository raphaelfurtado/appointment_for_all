import { endOfDay, setHours, setMinutes, setSeconds, startOfDay } from "date-fns";
import prismaClient from "../../prisma";

interface CategoryProps {
    search: string;
}

class ListCategoryService {
    async execute({ search }: CategoryProps) {

        const categories = await prismaClient.categoryServices.findMany({
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
            orderBy:{
                name: 'asc'
            }
        });

        return categories;
    }
}

export { ListCategoryService }
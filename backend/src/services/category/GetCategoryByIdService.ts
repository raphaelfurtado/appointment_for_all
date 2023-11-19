import { endOfDay, setHours, setMinutes, setSeconds, startOfDay } from "date-fns";
import prismaClient from "../../prisma";

interface CategoryProps {
    id: number;
}

class GetCategoryByIdService {
    async execute({ id }: CategoryProps) {

        const categories = await prismaClient.categoryServices.findUnique({
            where: {
                id: id
            }
        });

        return categories;
    }
}

export { GetCategoryByIdService }
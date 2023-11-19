import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface CategoryRequest {
    id: number;
    name: string;
    description: string;
}

class UpdateCategoryService {
    async execute({ id, name, description }: CategoryRequest) {

        const category = await prismaClient.categoryServices.update({
            where:{
                id: id
            },
            data: {
                name: name,
                description: description
            },
            select:{
                id: true,
                name: true,
                description: true
            }
        });

        return category;
    }
}

export { UpdateCategoryService }
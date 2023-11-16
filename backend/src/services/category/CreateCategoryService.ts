import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface CategoryRequest {
    name: string;
    description: string;
}

class CreateCategoryService {
    async execute({ name, description }: CategoryRequest) {

        const category = await prismaClient.categoryServices.create({
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

export { CreateCategoryService }
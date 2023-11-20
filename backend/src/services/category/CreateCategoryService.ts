import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface CategoryRequest {
    name: string;
    description: string;
    active: boolean;
}

class CreateCategoryService {
    async execute({ name, description, active }: CategoryRequest) {

        const category = await prismaClient.categoryServices.create({
            data: {
                name: name,
                description: description,
                active: active
            },
            select:{
                id: true,
                name: true,
                description: true,
                active: true
            }
        });

        return category;
    }
}

export { CreateCategoryService }
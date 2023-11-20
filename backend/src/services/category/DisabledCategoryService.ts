import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface CategoryRequest {
    id: number;
    name: string;
    description: string;
    active: boolean;
}

class UpdateCategoryService {
    async execute({ id, name, description, active }: CategoryRequest) {

        const category = await prismaClient.categoryServices.update({
            where:{
                id: id
            },
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

export { UpdateCategoryService }
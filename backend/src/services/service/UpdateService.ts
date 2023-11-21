import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface ServiceRequest {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
    categoryServiceId: number;
    active: boolean;
}

class UpdateService {
    async execute({ id, name, description, price, duration, categoryServiceId, active }: ServiceRequest) {

        const service = await prismaClient.services.update({
            where:{
                id: id
            },
            data: {
                name: name,
                description: description,
                price: price,
                duration: duration,
                categoryServiceId: categoryServiceId,
                active: active
            },
            select:{
                id: true,
                name: true,
                description: true,
                price: true,
                duration: true,
                categoryServiceId: true,
                active: true
            }
        });

        return service;
    }
}

export { UpdateService }
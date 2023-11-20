import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface ServiceRequest {
    name: string;
    description: string;
    price: number;
    duration: number;
    categoryServiceId: number;
}

class CreateService {
    async execute({ name, description, price, duration, categoryServiceId }: ServiceRequest) {

        const service = await prismaClient.services.create({
            data: {
                name: name,
                description: description,
                price: price,
                duration: duration,
                categoryServiceId

            },
            select:{
                id: true,
                name: true,
                description: true,
                price: true,
                duration: true,
                categoryServiceId: true
            }
        });

        return service;
    }
}

export { CreateService }
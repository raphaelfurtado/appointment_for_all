import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

class DetailUserService {
    async execute(user_id: string) {

        const user = await prismaClient.users.findFirst({
            where: {
                id: Number(user_id)
            },
            select: {
                id: true,
                name: true,
                email: true,
                provider: true,
                avatar:{
                    select:{
                        id: true,
                        name: true,
                        path: true
                    }
                }
            },
        });

        return user;
    }
}

export { DetailUserService }
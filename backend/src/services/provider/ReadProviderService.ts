import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

class ReadProviderService  {
    async execute() {

        const user = await prismaClient.users.findMany({
            where: {
                provider: "provider"
            },
            select:{
                id: true,
                name: true,
                email: true,
                avatar: {
                    select: {
                        name: true,
                        path: true
                    },
                }
            }
        });

        return user;
    }
}

export { ReadProviderService  }
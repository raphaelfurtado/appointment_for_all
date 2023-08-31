import { compare, hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface UserRequest {
    id: string,
    name: string,
    email: string;
    oldPassword: string;
    password: string;
}

class UpdateUserService {
    async execute({ id, name, email, oldPassword, password }: UserRequest) {

        const userExists = await prismaClient.users.findFirst({
            where: {
                id: Number(id)
            }
        });

        if (email !== userExists.email) {
            const userExists = await prismaClient.users.findUnique({
                where: {
                    email: email
                }
            });

            if (userExists) throw new Error("User already exists!");
        }

        const passwordMatch = await compare(oldPassword, userExists.password_hash);
        const passWordHash = await hash(password, 8);

        if(oldPassword && !passwordMatch) {
            throw new Error("Password does not match!");
        }

        const user = await prismaClient.users.update({
            where:{
                id: Number(id)
            },
            data: {
                name: name,
                email: email,
                password_hash: passWordHash
            },
            select: {
                id: true,
                name: true,
                email: true,
                provider: true

            }
        }) 

        return user;
    }
}

export { UpdateUserService }
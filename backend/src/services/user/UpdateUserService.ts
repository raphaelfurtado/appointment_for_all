import { compare, hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface UserRequest {
    id: string,
    name: string,
    email: string;
    oldPassword: string;
    password: string;
    avatar_id: number;
}

class UpdateUserService {
    async execute({ id, name, email, oldPassword, password, avatar_id }: UserRequest) {

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
                password_hash: passWordHash,
                avatar_id: avatar_id
            },
            select: {
                id: true,
                name: true,
                email: true,
                provider: true,
                avatar: {
                    select: {
                        name: true,
                        path: true
                    }
                }
            }
        }) 

        return user;
    }
}

export { UpdateUserService }
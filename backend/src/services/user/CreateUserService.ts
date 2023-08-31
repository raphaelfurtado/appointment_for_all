import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface UserRequest {
    name: string;
    email: string;
    password_hash: string;
    provider: string;
}

class CreateUserService {
    async execute({ name, email, password_hash, provider }: UserRequest) {

        //check email
        if (!email) throw new Error("Email incorrect!");

        const userAlreadyExists = await prismaClient.users.findFirst({
            where: {
                email: email
            }
        });

        if (userAlreadyExists) throw new Error("User already exists!");

        const passWordHash = await hash(password_hash, 8);

        const user = await prismaClient.users.create({
            data: {
                name: name,
                email: email,
                password_hash: passWordHash,
                provider: provider
            },
            select:{
                id: true,
                name: true,
                email: true,
                provider: true
            }
        });

        return user;
    }
}

export { CreateUserService }
import { compare } from "bcryptjs";
import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";

interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService {
    async execute({email, password}: AuthRequest){

        const user = await prismaClient.users.findFirst({
            where: {
                email: email
            },
            include: {
                avatar: {
                    select: {
                        id: true,
                        name: true,
                        path: true
                    }
                }
            }
        });

        if (!user) throw new Error("User password incorrect!");

        const passwordMatch = await compare(password, user.password_hash);

        if(!passwordMatch) throw new Error("User password incorrect!");

        const token = sign(
            {
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                subject: String(user.id),
                expiresIn: '30d'
            }
        );

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token,
            provider: user.provider,
            avatar: user.avatar
        }
    }
}

export {AuthUserService}
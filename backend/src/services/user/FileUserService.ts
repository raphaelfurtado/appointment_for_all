import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface FileRequest {
    name: string;
    path: string;
}

class FileUserService {
    async execute({ name, path }: FileRequest) {

        const file = await prismaClient.files.create({
            data: {
                name: name,
                path: path
            },
        });

        return file;
    }
}

export { FileUserService }
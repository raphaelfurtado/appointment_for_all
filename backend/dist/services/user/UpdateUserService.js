"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = __importDefault(require("../../prisma"));
class UpdateUserService {
    execute({ id, name, email, oldPassword /*, password*/, avatar_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield prisma_1.default.users.findFirst({
                where: {
                    id: Number(id)
                }
            });
            if (email !== userExists.email) {
                const userExists = yield prisma_1.default.users.findUnique({
                    where: {
                        email: email
                    }
                });
                if (userExists)
                    throw new Error("User already exists!");
            }
            const passwordMatch = yield (0, bcryptjs_1.compare)(oldPassword, userExists.password_hash);
            // const passWordHash = await hash(password, 8); com confirmação de senha
            const passWordHash = yield (0, bcryptjs_1.hash)(oldPassword, 8);
            // if(oldPassword && !passwordMatch) {
            //     throw new Error("Password does not match!");
            // }
            const user = yield prisma_1.default.users.update({
                where: {
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
            });
            return user;
        });
    }
}
exports.UpdateUserService = UpdateUserService;

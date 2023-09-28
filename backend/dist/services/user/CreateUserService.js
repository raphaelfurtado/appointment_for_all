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
exports.CreateUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = __importDefault(require("../../prisma"));
class CreateUserService {
    execute({ name, email, password_hash, provider }) {
        return __awaiter(this, void 0, void 0, function* () {
            //check email
            if (!email)
                throw new Error("Email incorrect!");
            const userAlreadyExists = yield prisma_1.default.users.findFirst({
                where: {
                    email: email
                }
            });
            if (userAlreadyExists)
                throw new Error("User already exists!");
            const passWordHash = yield (0, bcryptjs_1.hash)(password_hash, 8);
            const user = yield prisma_1.default.users.create({
                data: {
                    name: name,
                    email: email,
                    password_hash: passWordHash,
                    provider: provider
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    provider: true
                }
            });
            return user;
        });
    }
}
exports.CreateUserService = CreateUserService;

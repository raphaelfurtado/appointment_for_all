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
exports.ListService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListService {
    execute({ search }) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield prisma_1.default.services.findMany({
                where: {
                    OR: [
                        {
                            name: {
                                contains: search,
                                mode: 'insensitive'
                            },
                        },
                    ],
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    duration: true,
                    categoryService: {
                        select: {
                            id: true,
                            name: true,
                            active: true
                        }
                    }
                },
                orderBy: {
                    name: 'asc'
                }
            });
            return service;
        });
    }
}
exports.ListService = ListService;

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
exports.ListAppointmentService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListAppointmentService {
    execute({ user_id, page }) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageSize = 10; // Quantidade de registros por página
            const currentPage = page; // Página atual que você deseja mostrar
            const skip = (currentPage - 1) * pageSize;
            const appointments = yield prisma_1.default.appointments.findMany({
                where: {
                    user_id: user_id,
                    canceled_at: null
                },
                orderBy: {
                    canceled_at: "asc"
                },
                take: pageSize,
                skip: skip,
                select: {
                    id: true,
                    date: true,
                    provider: {
                        select: {
                            id: true,
                            name: true,
                            avatar: {
                                select: {
                                    id: true,
                                    name: true,
                                    path: true,
                                }
                            }
                        }
                    },
                },
            });
            return appointments;
        });
    }
}
exports.ListAppointmentService = ListAppointmentService;

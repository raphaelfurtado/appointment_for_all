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
exports.ListScheduleService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const date_fns_1 = require("date-fns");
class ListScheduleService {
    execute({ user_id, date }) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkUserProvider = yield prisma_1.default.users.findFirst({
                where: {
                    id: user_id,
                    provider: "provider"
                }
            });
            if (!checkUserProvider)
                throw new Error("User is not a provider");
            const parsedDate = (0, date_fns_1.parseISO)(date);
            const appointments = yield prisma_1.default.appointments.findMany({
                where: {
                    provider_id: user_id,
                    canceled_at: null,
                    date: {
                        // Coloque o valor mínimo do intervalo aqui
                        gte: (0, date_fns_1.startOfDay)(parsedDate),
                        // Coloque o valor máximo do intervalo aqui
                        lte: (0, date_fns_1.endOfDay)(parsedDate)
                    }
                },
                orderBy: {
                    date: "asc"
                },
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                            phone: true
                        }
                    },
                    service: {
                        select: {
                            name: true,
                            duration: true
                        }
                    }
                }
            });
            return appointments;
        });
    }
}
exports.ListScheduleService = ListScheduleService;

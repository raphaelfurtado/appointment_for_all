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
exports.CreateAppointmentService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const date_fns_1 = require("date-fns");
const pt_BR_1 = __importDefault(require("date-fns/locale/pt-BR"));
class CreateAppointmentService {
    execute({ provider_id, date, user_id, observation, service_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const isProvider = yield prisma_1.default.users.findFirst({
                where: {
                    id: provider_id,
                    provider: "provider"
                }
            });
            if (!isProvider)
                throw new Error("You can only create appointments with providers");
            const hourStart = (0, date_fns_1.startOfHour)((0, date_fns_1.parseISO)(date));
            if ((0, date_fns_1.isBefore)(hourStart, new Date()))
                throw new Error("Past dates are not permitted");
            const checkAvailability = yield prisma_1.default.appointments.findFirst({
                where: {
                    provider_id: provider_id,
                    canceled_at: null,
                    date: hourStart
                }
            });
            if (checkAvailability)
                throw new Error("Appointment date is not available");
            const service = yield prisma_1.default.services.findUnique({
                where: {
                    id: service_id
                }
            });
            const appointment = yield prisma_1.default.appointments.create({
                data: {
                    user_id: user_id,
                    provider_id: provider_id,
                    date: date,
                    price: service.price,
                    observation: observation,
                    service_id: service_id,
                },
                select: {
                    id: true,
                    date: true,
                    canceled_at: true,
                    observation: true,
                    price: true,
                    service: {
                        select: {
                            name: true,
                            duration: true
                        }
                    }
                }
            });
            const user = yield prisma_1.default.users.findFirst({
                where: {
                    id: user_id
                }
            });
            const formattedDate = (0, date_fns_1.format)(hourStart, "'dia' dd 'de' MMMM', às' H:mm'h' ", {
                locale: pt_BR_1.default
            });
            yield prisma_1.default.notifications.create({
                data: {
                    message: `Novo agendamento de ${user.name} para ${formattedDate}`,
                    user_id: provider_id,
                }
            });
            return appointment;
        });
    }
}
exports.CreateAppointmentService = CreateAppointmentService;

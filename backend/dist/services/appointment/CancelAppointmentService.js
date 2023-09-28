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
exports.CancelAppointmentService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const date_fns_1 = require("date-fns");
class CancelAppointmentService {
    execute({ id, user_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const isSameUserAppointment = yield prisma_1.default.appointments.findUnique({
                where: {
                    id: parseInt(id)
                }
            });
            if (!isSameUserAppointment)
                throw new Error("You don't have permission to cancel this appointment");
            if (isSameUserAppointment.user_id !== parseInt(user_id)) {
                throw new Error("You don't have permission to cancel this appointment");
            }
            const dateWithSub = (0, date_fns_1.subHours)(isSameUserAppointment.date, 2);
            // if(isBefore(dateWithSub, new Date())) throw new Error("You can olnly cancel appointment 1 hour in advance.");
            const appointment = yield prisma_1.default.appointments.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    canceled_at: new Date()
                }
            });
            return appointment;
        });
    }
}
exports.CancelAppointmentService = CancelAppointmentService;

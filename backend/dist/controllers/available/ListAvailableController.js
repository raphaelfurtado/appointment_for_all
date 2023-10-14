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
exports.ListAvailableController = void 0;
const ListAvailableService_1 = require("../../services/available/ListAvailableService");
const date_fns_1 = require("date-fns");
const prisma_1 = __importDefault(require("../../prisma"));
class ListAvailableController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { date } = req.query;
            const providerId = req.params.providerId;
            if (!date)
                return res.status(400).json({ error: "Invalid date" });
            const searchDate = Number(date);
            const availableService = new ListAvailableService_1.ListAvailableService();
            const appointmentsAvailable = yield availableService.execute({
                idProvider: Number(providerId),
                date: searchDate
            });
            const employeeWorkSchedule = yield prisma_1.default.employeeWorkSchedule.findMany({
                where: {
                    userId: Number(providerId),
                    dayOfWeek: String(3)
                }
            });
            const schedule = [];
            employeeWorkSchedule.forEach(hours => {
                const startTime = parseInt(hours.startTime.split(":")[0]);
                const endTime = parseInt(hours.endTime.split(":")[0]);
                const breakStart = parseInt(hours.breakStart.split(":")[0]);
                const breakEnd = parseInt(hours.breakEnd.split(":")[0]);
                console.log(hours.dayOfWeek);
                for (let i = startTime; i <= endTime; i++) {
                    if (!(i >= breakStart && i < breakEnd)) {
                        schedule.push(`${i.toString().padStart(2, '0')}:00`);
                    }
                }
            });
            const available = schedule.map(time => {
                const [hour, minute] = time.split(":");
                const value = (0, date_fns_1.setSeconds)((0, date_fns_1.setMinutes)((0, date_fns_1.setHours)(searchDate, Number(hour)), Number(minute)), 0);
                // console.log("###", format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"));
                return {
                    time,
                    value: (0, date_fns_1.format)(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
                    available: (0, date_fns_1.isAfter)(value, new Date()) &&
                        !appointmentsAvailable.find(appointment => (0, date_fns_1.format)(appointment.date, "HH:mm") === time)
                };
            });
            return res.json(available);
        });
    }
}
exports.ListAvailableController = ListAvailableController;

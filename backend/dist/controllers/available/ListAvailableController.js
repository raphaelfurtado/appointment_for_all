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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAvailableController = void 0;
const ListAvailableService_1 = require("../../services/available/ListAvailableService");
const date_fns_1 = require("date-fns");
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
            // horários de trabalho do provedor
            const schedule = [
                "08:00",
                "09:00",
                "10:00",
                "11:00",
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
                "17:00",
                "18:00",
                "19:00",
            ];
            const available = schedule.map(time => {
                const [hour, minute] = time.split(":");
                const value = (0, date_fns_1.setSeconds)((0, date_fns_1.setMinutes)((0, date_fns_1.setHours)(searchDate, Number(hour)), Number(minute)), 0);
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

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
exports.ListAvailableService = void 0;
const date_fns_1 = require("date-fns");
const prisma_1 = __importDefault(require("../../prisma"));
class ListAvailableService {
    execute({ date, idProvider }) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointments = yield prisma_1.default.appointments.findMany({
                where: {
                    provider_id: idProvider,
                    canceled_at: null,
                    date: {
                        // Coloque o valor mínimo do intervalo aqui
                        gte: (0, date_fns_1.startOfDay)(date),
                        // Coloque o valor máximo do intervalo aqui
                        lte: (0, date_fns_1.endOfDay)(date)
                    }
                }
            });
            return appointments;
        });
    }
}
exports.ListAvailableService = ListAvailableService;

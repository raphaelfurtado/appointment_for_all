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
exports.ListNotificationService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListNotificationService {
    execute(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const isProvider = yield prisma_1.default.users.findFirst({
                where: {
                    id: user_id,
                    provider: "provider"
                }
            });
            if (!isProvider)
                throw new Error("Only provider can load notifications");
            const notifications = yield prisma_1.default.notifications.findMany({
                where: {
                    user_id: user_id
                },
                orderBy: {
                    createdAt: "asc"
                },
                take: 20
            });
            return notifications;
        });
    }
}
exports.ListNotificationService = ListNotificationService;

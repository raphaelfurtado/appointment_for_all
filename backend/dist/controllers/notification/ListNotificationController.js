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
exports.ListNotificationController = void 0;
const ListNotificationService_1 = require("../../services/notifications/ListNotificationService");
class ListNotificationController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.user_id;
            const user = parseInt(user_id);
            const listNotificationService = new ListNotificationService_1.ListNotificationService();
            const notification = yield listNotificationService.execute(user);
            return res.json(notification);
        });
    }
}
exports.ListNotificationController = ListNotificationController;

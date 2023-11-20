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
exports.ListServiceController = void 0;
const ListService_1 = require("../../services/service/ListService");
class ListServiceController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { search } = req.query;
            const valor = typeof search === 'string' ? search : '';
            const service = new ListService_1.ListService();
            const servicesList = yield service.execute({
                search: valor
            });
            return res.json(servicesList);
        });
    }
}
exports.ListServiceController = ListServiceController;

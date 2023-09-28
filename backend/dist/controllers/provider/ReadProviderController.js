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
exports.ReadProviderController = void 0;
const ReadProviderService_1 = require("../../services/provider/ReadProviderService");
class ReadProviderController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const schema = Yup.object().shape({
            //     name: Yup.string().required(),
            //     email: Yup.string().email().required(),
            //     password_hash: Yup.string().required().min(6, "Mínimo de 6 caracteres"),
            //     provider: Yup.string().required()
            // });
            const readProviderService = new ReadProviderService_1.ReadProviderService();
            const providers = yield readProviderService.execute();
            return res.json(providers);
        });
    }
}
exports.ReadProviderController = ReadProviderController;

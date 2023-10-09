"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UpdateUserController = void 0;
const Yup = __importStar(require("yup"));
const UpdateUserService_1 = require("../../services/user/UpdateUserService");
class UpdateUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Yup.object().shape({
                name: Yup.string(),
                email: Yup.string().email(),
                oldPassword: Yup.string().notRequired(),
                // password: Yup.string().min(6).when("oldPassword", (oldPassword, field) => 
                //     oldPassword ? field.required() : field
                // ),
                // confirmPassword: Yup.string().when("password", (password, field) => 
                //     password ? field.required().oneOf([Yup.ref("password")]) : field
                // )
            });
            if (!(yield schema.isValid(req.body))) {
                const errors = yield schema
                    .validate(req.body, { abortEarly: false })
                    .catch((validationErrors) => {
                    return validationErrors.inner.map((error) => error.message);
                });
                return res.status(400).json({ errors });
            }
            const { name, email, oldPassword /*, password */, avatar_id } = req.body;
            const updateUserService = new UpdateUserService_1.UpdateUserService();
            const user = yield updateUserService.execute({
                id: req.user_id,
                name,
                email,
                oldPassword,
                /*password,*/
                avatar_id
            });
            return res.json(user);
        });
    }
}
exports.UpdateUserController = UpdateUserController;

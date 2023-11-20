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
exports.UpdateCategoryController = void 0;
const Yup = __importStar(require("yup"));
const UpdateCategoryService_1 = require("../../services/category/UpdateCategoryService");
class UpdateCategoryController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                description: Yup.string()
            });
            if (!(yield schema.isValid(req.body))) {
                return res.status(400).json({ error: "Validation fails" });
            }
            const categoryId = parseInt(req.params.id);
            const { name, description } = req.body;
            const updateCategoryService = new UpdateCategoryService_1.UpdateCategoryService();
            const category = yield updateCategoryService.execute({
                id: categoryId,
                name,
                description
            });
            return res.json(category);
        });
    }
}
exports.UpdateCategoryController = UpdateCategoryController;

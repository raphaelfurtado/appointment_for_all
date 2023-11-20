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
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("./config/multer"));
const prisma_1 = __importDefault(require("./prisma"));
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const UpdateUserController_1 = require("./controllers/user/UpdateUserController");
const FileController_1 = require("./controllers/user/FileController");
const ReadProviderController_1 = require("./controllers/provider/ReadProviderController");
const CreateAppointmentController_1 = require("./controllers/appointment/CreateAppointmentController");
const ListAppointmentController_1 = require("./controllers/appointment/ListAppointmentController");
const ListScheduleController_1 = require("./controllers/schedule/ListScheduleController");
const ListNotificationController_1 = require("./controllers/notification/ListNotificationController");
const UpdateNotificationController_1 = require("./controllers/notification/UpdateNotificationController");
const CancelAppointmentController_1 = require("./controllers/appointment/CancelAppointmentController");
const ListAvailableController_1 = require("./controllers/available/ListAvailableController");
const CreateCategoryController_1 = require("./controllers/category/CreateCategoryController");
const ListCategoryController_1 = require("./controllers/category/ListCategoryController");
const UpdateCategoryController_1 = require("./controllers/category/UpdateCategoryController");
const GetCategoryByIdController_1 = require("./controllers/category/GetCategoryByIdController");
const CreateServiceController_1 = require("./controllers/service/CreateServiceController");
const ListServiceController_1 = require("./controllers/service/ListServiceController");
const GetServiceByIdController_1 = require("./controllers/service/GetServiceByIdController");
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)(multer_2.default.upload("./tmp/uploads"));
router.get("/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.users.create({
        data: {
            name: 'Yasmin Furtado',
            email: 'yasmin@prisma.io',
            password_hash: "arhur123546"
        },
    });
    console.log(user);
    return res.json(user);
}));
router.post("/users", new CreateUserController_1.CreateUserController().handle);
router.post("/session", new AuthUserController_1.AuthUserController().handle);
router.get("/me", isAuthenticated_1.isAutheticated, new DetailUserController_1.DetailUserController().handle);
router.put("/update", isAuthenticated_1.isAutheticated, new UpdateUserController_1.UpdateUserController().handle);
router.post("/files", isAuthenticated_1.isAutheticated, upload.single("file"), new FileController_1.FileController().handle);
// PROVIDER
router.get("/providers", isAuthenticated_1.isAutheticated, new ReadProviderController_1.ReadProviderController().handle);
router.get("/providers/:providerId/available", isAuthenticated_1.isAutheticated, new ListAvailableController_1.ListAvailableController().handle);
// APPOINTMENT
router.post("/appointments", isAuthenticated_1.isAutheticated, new CreateAppointmentController_1.CreateAppointmentController().handle);
router.get("/appointments", isAuthenticated_1.isAutheticated, new ListAppointmentController_1.ListAppointmentController().handle);
router.delete("/appointments/:id", isAuthenticated_1.isAutheticated, new CancelAppointmentController_1.CancelAppointmentController().handle);
//SCHEDULE
router.get("/schedules", isAuthenticated_1.isAutheticated, new ListScheduleController_1.ListScheduleController().handle);
//NOTIFICATIONS
router.get("/notifications", isAuthenticated_1.isAutheticated, new ListNotificationController_1.ListNotificationController().handle);
router.put("/notifications", isAuthenticated_1.isAutheticated, new UpdateNotificationController_1.UpdateNotificationController().handle);
//CATEGORY
router.post("/category", isAuthenticated_1.isAutheticated, new CreateCategoryController_1.CreateCategoryController().handle);
router.get("/categories", isAuthenticated_1.isAutheticated, new ListCategoryController_1.ListCategoryController().handle);
router.put("/category/update/:id", isAuthenticated_1.isAutheticated, new UpdateCategoryController_1.UpdateCategoryController().handle);
router.get("/categoryById", isAuthenticated_1.isAutheticated, new GetCategoryByIdController_1.GetCategoryByIdController().handle);
//SERVICE
router.post("/service", isAuthenticated_1.isAutheticated, new CreateServiceController_1.CreateServiceController().handle);
router.get("/services", isAuthenticated_1.isAutheticated, new ListServiceController_1.ListServiceController().handle);
router.get("/serviceById", isAuthenticated_1.isAutheticated, new GetServiceByIdController_1.GetServiceByIdController().handle);

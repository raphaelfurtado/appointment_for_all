import { Router, Request, Response } from "express";
import multer from "multer";
import uploadConfig from './config/multer';
import prismaClient from "./prisma";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAutheticated } from "./middlewares/isAuthenticated";
import { UpdateUserController } from "./controllers/user/UpdateUserController";
import { FileController } from "./controllers/user/FileController";
import { ReadProviderController } from "./controllers/provider/ReadProviderController";
import { CreateAppointmentController } from "./controllers/appointment/CreateAppointmentController";
import { ListAppointmentController } from "./controllers/appointment/ListAppointmentController";
import { ListScheduleController } from "./controllers/schedule/ListScheduleController";
import { ListNotificationController } from "./controllers/notification/ListNotificationController";
import { UpdateNotificationController } from "./controllers/notification/UpdateNotificationController";
import { CancelAppointmentController } from "./controllers/appointment/CancelAppointmentController";
import { ListAvailableController } from "./controllers/available/ListAvailableController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { UpdateCategoryController } from "./controllers/category/UpdateCategoryController";
import { GetCategoryByIdController } from "./controllers/category/GetCategoryByIdController";
import { CreateServiceController } from "./controllers/service/CreateServiceController";
import { ListServiceController } from "./controllers/service/ListServiceController";
import { GetServiceByIdController } from "./controllers/service/GetServiceByIdController";
import { UpdateServiceController } from "./controllers/service/UpdateServiceController";

const router = Router();
const upload = multer(uploadConfig.upload("./tmp/uploads"));

router.get("/test", async (req: Request, res: Response) => {

  const user = await prismaClient.users.create({
    data: {
      name: 'Yasmin Furtado',
      email: 'yasmin@prisma.io',
      password_hash: "arhur123546"

    },
  })
  console.log(user)

  return res.json(user);
});

router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAutheticated, new DetailUserController().handle);
router.put("/update", isAutheticated, new UpdateUserController().handle);
router.post("/files", isAutheticated, upload.single("file"), new FileController().handle);

// PROVIDER
router.get("/providers", isAutheticated, new ReadProviderController().handle);
router.get("/providers/:providerId/available", isAutheticated, new ListAvailableController().handle);

// APPOINTMENT
router.post("/appointments", isAutheticated, new CreateAppointmentController().handle);
router.get("/appointments", isAutheticated, new ListAppointmentController().handle);
router.delete("/appointments/:id", isAutheticated, new CancelAppointmentController().handle);

//SCHEDULE
router.get("/schedules", isAutheticated, new ListScheduleController().handle);

//NOTIFICATIONS
router.get("/notifications", isAutheticated, new ListNotificationController().handle);
router.put("/notifications", isAutheticated, new UpdateNotificationController().handle);

//CATEGORY
router.post("/category", isAutheticated, new CreateCategoryController().handle);
router.get("/categories", isAutheticated, new ListCategoryController().handle);
router.put("/category/update/:id", isAutheticated, new UpdateCategoryController().handle);
router.get("/categoryById", isAutheticated, new GetCategoryByIdController().handle);

//SERVICE
router.post("/service", isAutheticated, new CreateServiceController().handle);
router.get("/services", isAutheticated, new ListServiceController().handle);
router.put("/service/update/:id", isAutheticated, new UpdateServiceController().handle);
router.get("/serviceById", isAutheticated, new GetServiceByIdController().handle);

export { router }
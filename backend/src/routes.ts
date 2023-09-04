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

export { router }
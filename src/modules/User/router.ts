import { Router } from "express";
import { userController } from "./controller/user-controller";
const baseUrl: string = "/user";
const router: Router = Router();

router.post(`${baseUrl}`, userController.create);
router.get(`${baseUrl}/:id`, userController.read);
router.patch(`${baseUrl}/:id`, userController.update);
router.delete(`${baseUrl}/:id`, userController.delete);

export const userRouter = router;

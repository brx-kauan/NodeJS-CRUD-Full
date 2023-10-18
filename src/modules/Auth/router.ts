import { Router } from "express";
import { authController } from "./controller/auth-controller";
const baseUrl = "";
const router: Router = Router();

router.post("/login", authController.login);
router.post("/token", authController.token);

export const authRouter = router;

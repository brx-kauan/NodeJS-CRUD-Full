import { Router } from "express"
import { authController } from "./controller/auth-controller"
const baseUrl = "/auth"
const router: Router = Router()

router.post(`${baseUrl}/login`, authController.login)
router.post(`${baseUrl}/token`, authController.token)

export const authRouter = router

import { Router } from "express"
import { userController } from "./controller/user-controller"
import { AuthMiddleware } from "middlewares/auth-middleware"
const baseUrl: string = "/user"
const router: Router = Router()

router.post(`${baseUrl}`, userController.create)
router.get(`${baseUrl}/:id`, AuthMiddleware.verifyJWT, userController.read)
router.patch(`${baseUrl}/:id`, AuthMiddleware.verifyJWT, userController.update)
router.delete(`${baseUrl}/:id`, AuthMiddleware.verifyJWT, userController.delete)

export const userRouter = router

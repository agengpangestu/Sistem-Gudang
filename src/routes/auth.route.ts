import { Router } from "express"
import { AuthController } from "../controller"

const authController = new AuthController()
export const AuthRoute: Router = Router()

AuthRoute.post("/registration", authController.Register)
AuthRoute.post("/login", authController.Login)

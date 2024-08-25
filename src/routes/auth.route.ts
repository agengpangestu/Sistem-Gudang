import { Router } from "express"
import authController from "../controller/auth.controller"

export const AuthRoute: Router = Router()

AuthRoute.post("/registration", authController.Register)
AuthRoute.post("/login", authController.Login)

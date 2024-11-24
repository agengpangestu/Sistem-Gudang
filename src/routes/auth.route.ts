import { Router } from "express"
import { AuthController } from "../controller"
import PrismaUtils from "../utils/prisma"
import { AuthService } from "../services"
import { ValidateError } from "../middleware"
import { LoginValidation, RegisterValidation } from "../validation"

const prisma = new PrismaUtils()
const authController = new AuthController(new AuthService(prisma))
export const AuthRoute: Router = Router()

AuthRoute.post("/registration", ValidateError(RegisterValidation), authController.Register)
AuthRoute.post("/login", ValidateError(LoginValidation), authController.Login)

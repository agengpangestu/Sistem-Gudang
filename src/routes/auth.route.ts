import { Router } from "express"
import { Login, Register } from "../controller"
import { ValidateError } from "../middleware"
import { LoginValidation, RegisterValidation } from "../validation"

export const AuthRoute: Router = Router()

AuthRoute.post("/registration", ValidateError(RegisterValidation), Register)
AuthRoute.post("/login", ValidateError(LoginValidation), Login)

import { NextFunction, Request, Response } from "express"
import { AuthService } from "../services"
import { joiError, prisma, successResponse } from "../utils/"
import { decrypt, encrypt } from "../utils/bcrypt"
import { signJwt } from "../utils/jwt"
import { logger } from "../utils/logger"
import { LoginValidation } from "../validation/auth.validation"
import ErrorAuth from "../helpers/error.auth"
import ErrorValidation from "../helpers/error.validation"
import AuthRegister, { AuthLogin } from "../types/auth.type"

// const authService = new AuthService()

export class AuthController {
  constructor(private authService: AuthService) {}
  public Register = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const payload = req.body as AuthRegister
      payload.password = `${encrypt(payload.password)}`

      await this.authService.Register(payload)
      return successResponse(res, 201, "Register success")
    } catch (error: any) {
      logger.error(`ERR: auth - register = ${error}`)
      next(error)
    }
  }

  public Login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const payload = req.body as AuthLogin

      const user = await this.authService.Login(payload.email)
      if (!user) {
        return res.status(422).send({ status: false, statusCode: 422, message: "Email not registered" })
      }

      const matching_password = decrypt(payload.password, user.password)
      if (!matching_password) {
        return res.status(422).send({ status: false, statusCode: 422, message: "Password not match" })
      }

      const access_token = signJwt({ ...user }, { expiresIn: "1d" })
      const send_user = {
        id: user.id,
        name: user.name,
        role: user.role
      }

      return res.cookie("accessToken", access_token).send(send_user)
    } catch (error: any) {
      logger.error(`ERR: auth - login = ${error}`)
      next(error)
    }
  }

  public async LogOut(req: Request, res: Response, next: NextFunction) {}
}

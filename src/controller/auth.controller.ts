import { NextFunction, Request, Response } from "express"
import { LoginService, RegisterService } from "../services"
import AuthRegister, { AuthLogin } from "../types/auth.type"
import { successResponse } from "../utils/"
import { decrypt, encrypt } from "../utils/bcrypt"
import { signJwt } from "../utils/jwt"
import { logger } from "../utils/logger"

export const Register = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const payload = req.body as AuthRegister
    payload.password = `${encrypt(payload.password)}`

    await RegisterService(payload)
    return successResponse(res, 201, "Register success")
  } catch (error) {
    logger.error(`ERR: auth - register = ${error}`)
    next(error)
  }
}

export const Login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const payload = req.body as AuthLogin

    const user = (await LoginService(payload.email)) as AuthLogin

    const matching_password = decrypt(payload.password, user.password)
    if (!matching_password) {
      return res.status(422).send({ status: false, statusCode: 422, message: "Password not match" })
    }

    const access_token = signJwt({ ...user }, { expiresIn: "1d" })
    const send_user = {
      id: user.id,
      name: user.name,
      role: user.role,
    }

    return res.cookie("accessToken", access_token).cookie("user", send_user).send("OK")
  } catch (error) {
    logger.error(`ERR: auth - login = ${error}`)
    next(error)
  }
}

export const LogOut = async (req: Request, res: Response, next: NextFunction) => {}

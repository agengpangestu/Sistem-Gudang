import { v4 as uuidV4 } from "uuid"

import { NextFunction, Request, Response } from "express"
import authService from "../services/auth.service"
import { joiError, prisma } from "../utils/"
import { decrypt, encrypt } from "../utils/bcrypt"
import { signJwt } from "../utils/jwt"
import { logger } from "../utils/logger"
import { LoginValidation, RegisterValidation } from "../validation/auth.validation"

class AuthController {
  public async Register(req: Request, res: Response, next: NextFunction) {
    req.body.user_id = uuidV4()
    const { error, value } = RegisterValidation(req.body)

    if (error) {
      logger.error(`ERR: auth - register = ${error.message}`)
      return res.status(422).send({ status: false, statusCode: 422, message: error.message.replace(/\"/g, "") })
    }

    try {
      value.password = `${encrypt(value.password)}`

      await authService.Register(value)
      return res.status(201).send({ status: true, statusCode: 201, message: "Register success" })
    } catch (error: any) {
      logger.error(`ERR: auth - register = ${error}`)
      next(error)
    }
  }

  public async Login(req: Request, res: Response, next: NextFunction) {
    const { error, value } = LoginValidation(req.body)

    if (error) {
      logger.error(`ERR Validation: auth - login = ${error.message}`)
      return res.status(422).send({
        status: false,
        statusCode: 422,
        message: error.name,
        error_validation: joiError(error.details)
      })
    }
    try {
      const user: any = await authService.Login(value.email)
      const password = await prisma.user.findUnique({ where: { email: value.email } })

      if (!user) {
        return res.status(422).send({ status: false, statusCode: 422, message: "Email not registered" })
      }

      const matching_password = decrypt(value.password, password?.password as string)
      if (!matching_password) {
        return res.status(422).send({ status: false, statusCode: 422, message: "Password not match" })
      }

      const access_token = signJwt({ ...user }, { expiresIn: "1d" })

      // set token to header
      // set user to header too
      res.cookie("accessToken", access_token, { httpOnly: false, secure: true, maxAge: 86400000 }).send(user)
    } catch (error: any) {
      logger.error(`ERR: auth - login = ${error}`)
      next(error)
    }
  }

  public async LogOut(req: Request, res: Response, next: NextFunction) {}
}

export default new AuthController()

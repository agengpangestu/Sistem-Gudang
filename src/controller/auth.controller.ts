import { v4 as uuidV4 } from "uuid"

import { NextFunction, Request, Response } from "express"
import { LoginValidation, RegisterValidation } from "../validation/auth.validation"
import { logger } from "../utils/logger"
import { decrypt, encrypt } from "../utils/bcrypt"
import authService from "../services/auth.service"
import { signJwt } from "../utils/jwt"

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
      logger.error(`ERR: auth - login = ${error.message}`)
      return res.status(422).send({ status: false, statusCode: 422, message: error.message.replace(/\"/g, "") })
    }
    try {
      const user: any = await authService.Login(value.email)
      if (!user) {
        return res.status(422).send({ status: false, statusCode: 422, message: "Email not registered" })
      }

      const matching_password = decrypt(value.password, user.password)
      if (!matching_password) {
        return res.status(422).send({ status: false, statusCode: 422, message: "Password not match" })
      }

      const access_token = signJwt({ ...user }, { expiresIn: "1d" })

      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: "Success login",
        data: { access_token: access_token, refresh_token: "3408fhdfdjfhbd" }
      })
    } catch (error: any) {
      logger.error(`ERR: auth - login = ${error}`)
      next(error)
    }
  }
}

export default new AuthController()

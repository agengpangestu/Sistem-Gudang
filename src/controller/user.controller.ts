import { logger } from "../utils/logger"
import { NextFunction, Request, Response } from "express"
import { UserValidation } from "../validation/user.validation"
import UserType from "../types/user.type"
import UserService from "../services/user.service"
import { successResponse } from "../utils"
import ErrorNotFound from "../helpers/not.found"

export class UserController {
  constructor(private userService: UserService) {}

  public GetAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const query = req.query as unknown as UserType

    try {
      query.page = parseInt(req.query.page as string) || 1
      query.limit = parseInt(req.query.limit as string) || 10

      const data: any = await this.userService.GetAll(query)

      logger.info("Success get all users")
      return successResponse(res, 200, "OK", data)
    } catch (error: any) {
      next()
    }
  }

  public GetById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const {
      params: { id }
    } = req

    try {
      const user = await this.userService.GetById(parseInt(id))

      if (!user) {
        throw next(new ErrorNotFound())
      }

      logger.info("Success get user by id")
      return successResponse(res, 200, "OK", user)
    } catch (error: any) {
      next()
    }
  }

  public Update = async (req: Request, res: Response) => {
    const {
      params: { id }
    } = req
    const { error, value } = UserValidation(req.body)

    try {
      if (error) {
        console.log(error)
        logger.error(`ERR: user - update = ${error.message}`)
        return res.status(422).send({ status: false, statusCode: 422, message: error.message.replace(/\"/g, "") })
      }

      const user = await this.userService.GetById(parseInt(id))

      if (!user) {
        return res.status(404).json({ status: false, statusCode: 404, data: "User not found" })
      }

      const data: any = await this.userService.Update(parseInt(id), value)

      if (data) {
        logger.info("Success update user")
        return res.status(200).json({ status: true, statusCode: 200, message: "Success update user" })
      }
    } catch (error: any) {
      logger.error(`ERR: user - update = ${error.message}`)
      return res.status(422).send({ status: false, statusCode: 422, message: error?.message })
    }
  }

  public Destroy = async (req: Request, res: Response) => {
    const {
      params: { id }
    } = req

    try {
      const user = await this.userService.GetById(parseInt(id))
      if (!user) {
        return res.status(404).json({ status: false, statusCode: 404, data: "User not found" })
      }

      const data: any = this.userService.Destroy(parseInt(id))
      if (data) {
        logger.info("Success delete user")
        return res.status(200).json({ status: true, statusCode: 200, message: "Success delete user" })
      }
    } catch (error: any) {
      logger.error(`ERR: user - delete = ${error.message}`)
      return res.status(422).send({ status: false, statusCode: 422, message: error?.message })
    }
  }
}

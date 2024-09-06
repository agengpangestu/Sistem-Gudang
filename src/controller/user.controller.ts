import { logger } from "../utils/logger"
import { Request, Response } from "express"
import { UserValidation } from "../validation/user.validation"
import UserType from "../types/user.type"
import UserService from "../services/user.service"

class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
    this.GetAll = this.GetAll.bind(this)
    this.GetById = this.GetById.bind(this)
    this.Update = this.Update.bind(this)
    this.Destroy = this.Destroy.bind(this)
  }

  public async GetAll(req: Request, res: Response) {
    const query = req.query as unknown as UserType

    query.page = parseInt(req.query.page as string) || 1
    query.limit = parseInt(req.query.limit as string) || 10

    const data: any = await this.userService.GetAll(query)

    logger.info("Success get all users")
    return res.status(200).json({ status: true, statusCode: 200, data: data })
  }

  public async GetById(req: Request, res: Response) {
    const {
      params: { id }
    } = req

    const user: any = await this.userService.GetById(parseInt(id))

    if (!user) {
      return res.status(404).json({ status: false, statusCode: 404, data: "User not found" })
    }

    logger.info("Success get user by id")
    return res.status(200).json({ status: true, statusCode: 200, data: user })
  }

  public async Update(req: Request, res: Response) {
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

  public async Destroy(req: Request, res: Response) {
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

export default UserController

import { logger } from "../utils/logger"
import userService from "../services/user.service"
import { Request, Response } from "express"

class UserController {
  public async GetAll(req: Request, res: Response) {
    const data: any = await userService.GetAll()
    logger.info("Success get all users")
    res.status(200).json({ status: true, statusCode: 200, data: data })
  }

  public async GetById(req: Request, res: Response) {
    const {
      params: { id }
    } = req

    const user: any = await userService.GetById(parseInt(id))

    if (!user) {
      return res.status(404).json({ status: false, statusCode: 404, data: "User not found" })
    }

    logger.info("Success get user by id")
    return res.status(200).json({ status: true, statusCode: 200, data: user })
  }
}

export default new UserController()

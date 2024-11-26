import { AuthRegister, ProductStore } from "../types/"
import { Request, Response } from "express"
import { logger } from "./logger"
import { faker } from "@faker-js/faker"
import { FakerService } from "../services/faker.service"
import { successResponse } from "./ok.response"

export class FakerController {
  constructor(private fakerService: FakerService) {}
  public storeProduct = async (req: Request, res: Response): Promise<Response | void> => {
    req.body.product_code = faker.finance.accountNumber(5)
    req.body.product_name = faker.commerce.productName()
    req.body.desc = faker.commerce.productDescription()
    req.body.price = faker.commerce.price({ min: 5, max: 100 })
    req.body.user_id = 1
    req.body.location = "Gudang A"

    const payload = req.body as ProductStore

    try {
      await this.fakerService.storeProduct(payload)
      return successResponse(res, 201, "Success create product")
    } catch (error: any) {
      logger.error(`ERR: product - create = ${error}`)
      return res.status(422).send({ status: false, statusCode: 422, message: error.message, error: error.error })
    }
  }

  public storeUser = async (req: Request, res: Response): Promise<Response | void> => {
    req.body.name = faker.person.fullName()
    req.body.email = faker.internet.email()
    req.body.password = faker.internet.password()
    req.body.role = "regular" // 'regular' or 'admin'

    try {
      const payload = req.body as AuthRegister

      await this.fakerService.storeUser(payload)
      return successResponse(res, 201, "Success create user")
    } catch (error: any) {
      console.log(error)

      logger.error(`ERR: user - create = ${error}`)
      return res.status(422).send({ status: false, statusCode: 422, message: error.message, error: error.error })
    }
  }
}

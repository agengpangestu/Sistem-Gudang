import { Decimal, PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { ProductType } from "../types/product.type"
import { prismaUtils } from "./prisma"
import { Request, Response } from "express"
import { v4 as uuidV4 } from "uuid"
import { logger } from "./logger"
import { ProductValidation } from "../validation/product..validation"
import fakerService from "../services/faker.service"
import { faker } from "@faker-js/faker"
import { RegisterValidation } from "../validation/auth.validation"

class FakerController {
  public async storeProduct(req: Request, res: Response): Promise<any> {
    req.body.product_id = uuidV4()
    req.body.product_code = faker.finance.accountNumber(5)
    req.body.product_name = faker.commerce.productName()
    req.body.desc = faker.commerce.productDescription()
    req.body.price = faker.commerce.price({ min: 5, max: 100 })
    req.body.user_id = 47
    req.body.location = "Gudang A"

    const { error, value } = ProductValidation(req.body)

    if (error) {
      logger.error(`ERR: product - product create = ${error.message}`)
      return res.status(422).send({ status: false, statusCode: 422, message: error.message.replace(/\"/g, "") })
    }

    try {
      await fakerService.storeProduct(value)
      return res.status(201).send({ status: true, statusCode: 201, message: "Success create product" })
    } catch (error: any) {
      logger.error(`ERR: product - create = ${error}`)
      return res.status(422).send({ status: false, statusCode: 422, message: error.message })
    }
  }

  public async storeUser(req: Request, res: Response): Promise<any> {
    req.body.user_id = uuidV4()
    req.body.name = faker.person.fullName()
    req.body.email = faker.internet.email()
    req.body.password = faker.internet.password()
    req.body.role = "regular" // 'regular' or 'admin'

    const { error, value } = RegisterValidation(req.body)

    if (error) {
      logger.error(`ERR: user - user create = ${error.message}`)
      return res.status(422).send({ status: false, statusCode: 422, message: error.message.replace(/\"/g, "") })
    }

    try {
      await fakerService.storeUser(value)
      return res.status(201).send({ status: true, statusCode: 201, message: "Success create product" })
    } catch (error: any) {
      console.log(error)

      logger.error(`ERR: user - create = ${error}`)
      return res.status(422).send({ status: false, statusCode: 422, message: error.message })
    }
  }
}

export default new FakerController()

import { Request, Response } from "express"
import { logger } from "../utils/logger"
import { ProductType } from "../types/product.type"
import QuantityService from "../services/quantity.service"

class QuantityController {
  private quantityService: QuantityService
  constructor() {
    this.quantityService = new QuantityService()
    this.GetAll = this.GetAll.bind(this)
    this.GetQuantityOfProduct = this.GetQuantityOfProduct.bind(this)
  }

  public async GetAll(req: Request, res: Response): Promise<void> {
    const query: ProductType = req.query as unknown as ProductType

    query.page = parseInt(req.query.page as string) || 1
    query.limit = parseInt(req.query.limit as string) || 10

    try {
      const quantity = await this.quantityService.GetAll(query)

      if (quantity) {
        logger.info("Success get quantity product")
        res.status(200).json({ status: true, statusCode: 200, data: quantity })
      }
    } catch (error) {
      logger.error(error)
    }
  }

  public async GetQuantityOfProduct(req: Request, res: Response): Promise<any> {
    const query: ProductType = req.query as unknown as ProductType

    query.page = parseInt(req.query.page as string) || 1
    query.limit = parseInt(req.query.limit as string) || 10

    try {
      const quantity = await this.quantityService.GetQuantityOfProduct(query)

      return res.status(200).json({ status: true, statusCode: 200, data: quantity })
    } catch (error: any) {
      logger.error(error)
    }
  }
}

export default QuantityController

import { NextFunction, Request, Response } from "express"
import ErrorNotFound from "../helpers/not.found"
import ProductService from "../services/product.service"
import { ProductStore, ProductType, ProductUpdate } from "../types/product.type"
import { logger } from "../utils/logger"
import { successResponse } from "../utils"

export class ProductController {
  constructor(private productService: ProductService) {}

  public GetAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const query = req.query as unknown as ProductType

    try {
      query.page = parseInt(req.query.page as string) || 1
      query.limit = parseInt(req.query.limit as string) || 10

      const data: any = await this.productService.GetAll(query)

      logger.info("Success get all products")
      return res.status(200).json({ status: true, statusCode: 200, data: data })
    } catch (error: any) {
      next(error)
    }
  }

  public GetById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const {
      params: { product_code }
    } = req

    try {
      const product = await this.productService.GetById(parseInt(product_code))

      if (!product) {
        throw next(new ErrorNotFound())
      }

      return res.status(200).json({ success: false, statusCode: 200, data: product })
    } catch (error: any) {
      next(error)
    }
  }

  public Store = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const payload = req.body as ProductStore
      await this.productService.Store(payload)
      return successResponse(res, 201, "Success create product")
    } catch (error: any) {
      next(error)
    }
  }

  public Update = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const {
      params: { product_code }
    } = req

    try {
      const product = await this.productService.GetById(parseInt(product_code))
      if (!product) {
        throw next(new ErrorNotFound())
      }

      const payload = req.body as ProductUpdate

      const data = await this.productService.Update(parseInt(product_code), payload)
      if (data) {
        logger.info("Success update product")
        return successResponse(res, 200, "Success update product")
      }
    } catch (error: any) {
      next(error)
    }
  }

  public async Destroy(req: Request, res: Response, next: NextFunction) {
    const {
      params: { product_code }
    } = req

    try {
      const product = await this.productService.GetById(parseInt(product_code))
      if (!product) throw next(new ErrorNotFound())

      const data = await this.productService.Destroy(parseInt(product_code))
      if (data) {
        logger.info("Success delete product")
        return res.status(200).json({ status: true, statusCode: 200, message: "Success delete product" })
      }
    } catch (error: any) {
      next(error)
    }
  }
}

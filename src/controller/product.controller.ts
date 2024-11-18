import { NextFunction, Request, Response } from "express"
import { v4 as uuidV4 } from "uuid"
import JoiError from "../helpers/joi"
import ErrorNotFound from "../helpers/not.found"
import ProductService from "../services/product.service"
import { ProductType } from "../types/product.type"
import { logger } from "../utils/logger"
import { ProductUpdateValidation, ProductValidation } from "../validation/product..validation"

export class ProductController {
  private productService: ProductService

  constructor() {
    this.productService = new ProductService()
    this.GetAll = this.GetAll.bind(this)
    this.GetById = this.GetById.bind(this)
    this.Store = this.Store.bind(this)
    this.Update = this.Update.bind(this)
    this.Destroy = this.Destroy.bind(this)
  }

  public async GetAll(req: Request, res: Response, next: NextFunction) {
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

  public async GetById(req: Request, res: Response, next: NextFunction) {
    const {
      params: { id }
    } = req

    try {
      const product: any = await this.productService.GetById(parseInt(id))

      if (!product) {
        throw next(new ErrorNotFound())
      }

      return res.status(200).json({ success: false, statusCode: 200, data: product })
    } catch (error: any) {
      next(error)
    }
  }

  public async Store(req: Request, res: Response, next: NextFunction) {
    req.body.product_id = uuidV4()
    const { error, value } = ProductValidation(req.body)

    try {
      if (error) {
        logger.error(`ERR: product - product create = ${error.message}`)
        throw next(new JoiError(error.name, error.message))
      }

      await this.productService.Store(value)
      return res.status(201).send({ status: true, statusCode: 201, message: "Success create product" })
    } catch (error: any) {
      next(error)
    }
  }

  public async Update(req: Request, res: Response, next: NextFunction) {
    const {
      params: { id }
    } = req

    const { error, value } = ProductUpdateValidation(req.body)

    try {
      if (error) {
        throw next(new JoiError(error.name, error.message))
      }

      const product = await this.productService.GetById(parseInt(id))
      if (!product) {
        throw next(new ErrorNotFound())
      }

      const data = await this.productService.Update(parseInt(id), value)
      if (data) {
        logger.info("Success update product")
        return res.status(200).json({ status: true, statusCode: 200, message: "Success update product" })
      }
    } catch (error: any) {
      next(error)
    }
  }

  public async Destroy(req: Request, res: Response, next: NextFunction) {
    const {
      params: { id }
    } = req

    try {
      const product = await this.productService.GetById(parseInt(id))
      if (!product) throw next(new ErrorNotFound())

      const data = await this.productService.Destroy(parseInt(id))
      if (data) {
        logger.info("Success delete product")
        return res.status(200).json({ status: true, statusCode: 200, message: "Success delete product" })
      }
    } catch (error: any) {
      next(error)
    }
  }
}
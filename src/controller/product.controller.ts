import { NextFunction, Request, Response } from "express"
import { ProductUpdateValidation, ProductValidation } from "../validation/product..validation"
import { v4 as uuidV4 } from "uuid"
import { logger } from "../utils/logger"
import productService from "../services/product.service"

class ProductController {
  public async GetAll(req: Request, res: Response) {
    const data: any = await productService.GetAll()

    logger.info("Success get all products")
    return res.status(200).json({ status: true, statusCode: 200, data: data })
  }

  public async GetById(req: Request, res: Response) {
    const {
      params: { id }
    } = req

    const product: any = await productService.GetById(parseInt(id))

    if (!product) {
      return res.status(404).json({ success: false, statusCode: 404, message: "Product not found", data: {} })
    }

    return res.status(200).json({ success: false, statusCode: 200, data: product })
  }

  public async Store(req: Request, res: Response) {
    req.body.product_id = uuidV4()
    const { error, value } = ProductValidation(req.body)

    if (error) {
      logger.error(`ERR: product - product create = ${error.message}`)
      return res.status(422).send({ status: false, statusCode: 422, message: error.message.replace(/\"/g, "") })
    }

    try {
      await productService.Store(value)
      return res.status(201).send({ status: true, statusCode: 201, message: "Success create product" })
    } catch (error: any) {
      logger.error(`ERR: product - create = ${error}`)
      return res.status(422).send({ status: false, statusCode: 422, message: error.message })
    }
  }

  public async Update(req: Request, res: Response) {
    const {
      params: { id }
    } = req

    const { error, value } = ProductUpdateValidation(req.body)

    if (error) {
      logger.error(`ERR: product - update = ${error.message}`)
      return res.status(422).send({ status: false, statusCode: 422, message: error.message.replace(/\"/g, "") })
    }

    try {
      const product = await productService.GetById(parseInt(id))
      if (!product) {
        return res.status(404).json({ status: false, statusCode: 404, data: "Product not found" })
      }

      const data = await productService.Update(parseInt(id), value)
      if (data) {
        logger.info("Success update product")
        return res.status(200).json({ status: true, statusCode: 200, message: "Success update product" })
      }
    } catch (error: any) {
      logger.error(`ERR: product - update = ${error.message}`)
      return res.status(422).send({ status: false, statusCode: 422, message: error?.message })
    }
  }

  public async Destroy(req: Request, res: Response) {
    const {
      params: { id }
    } = req

    try {
      const product = await productService.GetById(parseInt(id))
      if (!product) return res.status(404).json({ status: false, statusCode: 404, data: "Product not found" })

      const data = await productService.Destroy(parseInt(id))
      if (data) {
        logger.info("Success delete product")
        return res.status(200).json({ status: true, statusCode: 200, message: "Success delete product" })
      }
    } catch (error: any) {
      logger.error(`ERR: user - delete = ${error.message}`)
      return res.status(422).send({ status: false, statusCode: 422, message: error?.message })
    }
  }
}

export default new ProductController()

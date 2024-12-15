import { NextFunction, Request, Response } from "express"
import { ProductValidation } from "../validation"
import { ProductStore } from "../types"
import { logger } from "../utils"

export const ValidateProduct = (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = ProductValidation.validate(req.body as ProductStore)

  if (error) {
    logger.error(`ERR: product - product create = ${error.message}`)
    const formatJoiError = error.details.map((detail) => ({
      field: detail.context?.key,
      message: detail.message.replace(/\"/g, "")
    }))

    return res.status(422).json({
      status: false,
      statusCode: 422,
      message: "Validation Error",
      error: formatJoiError
    })
  }

  req.body = value
  next()
}

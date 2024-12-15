import { NextFunction, Request, Response } from "express"
import Joi from "joi/lib"

export const ValidateError = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false })

    if (error) {
      const formattedJoiError = error.details.map((detail) => ({
        field: detail.context?.key,
        message: detail.message.replace(/\"/g, "")
      }))

      return res.status(422).json({
        status: false,
        statusCode: 422,
        message: "Validation Error",
        error: formattedJoiError
      })
    }
    req.body = value
    next()
  }
}

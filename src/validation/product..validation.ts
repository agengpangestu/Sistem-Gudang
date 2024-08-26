import Joi from "joi"
import ProductType from "../types/product.type"

export const ProductValidation = (payload: ProductType) => {
  const schema = Joi.object({
    product_id: Joi.string().required(),
    product_name: Joi.string().required(),
    desc: Joi.string(),
    location: Joi.string().required(),
    price: Joi.string().regex(/^\d+(\.\d{1,2})?$/),
    user_id: Joi.number().required()
  }).options({ abortEarly: false })

  return schema.validate(payload)
}

export const ProductUpdateValidation = (payload: ProductType) => {
  const schema = Joi.object({
    product_name: Joi.string(),
    desc: Joi.string(),
    location: Joi.string(),
    price: Joi.string().regex(/^\d+(\.\d{1,2})?$/),
    user_id: Joi.number()
  }).options({ abortEarly: false })

  return schema.validate(payload)
}
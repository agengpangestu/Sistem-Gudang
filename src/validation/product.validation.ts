import Joi from "joi"
import { ProductStore, ProductType } from "../types/product.type"

export const ProductValidation = Joi.object({
  // product_id: Joi.string().required(),
  product_code: Joi.number().required(),
  product_name: Joi.string().required(),
  desc: Joi.string(),
  location: Joi.string().required(),
  price: Joi.number(),
  user_id: Joi.number().required()
}).options({ abortEarly: false })

export const ProductUpdateValidation = Joi.object({
  product_name: Joi.string(),
  desc: Joi.string(),
  location: Joi.string(),
  price: Joi.number()
}).options({ abortEarly: false })

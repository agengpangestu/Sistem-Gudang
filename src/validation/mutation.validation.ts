import Joi from "joi"
import { MutationType } from "../types/mutation.type"

export const MutationValidation = (payload: MutationType) => {
  const schema = Joi.object({
    mutation_id: Joi.string().required(),
    user_id: Joi.number().required(),
    product_code: Joi.number().required(),
    quantity: Joi.number().required(),
    mutation_type: Joi.string().required()
  }).options({ abortEarly: false })

  return schema.validate(payload)
}

export const MutationUpdateValidation = (payload: MutationType) => {
  const schema = Joi.object({
    product_code: Joi.number(),
    quantity: Joi.number(),
    mutation_type: Joi.string()
  }).options({ abortEarly: false })

  return schema.validate(payload)
}

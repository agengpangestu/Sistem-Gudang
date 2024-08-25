import Joi from "joi"
import UserType from "../types/user.type"
import { user_role } from "@prisma/client"

export const RegisterValidation = (payload: UserType) => {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    role: Joi.string().default(user_role.regular)
  }).options({ abortEarly: false })

  return schema.validate(payload)
}

export const LoginValidation = (payload: UserType) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  }).options({ abortEarly: false })

  return schema.validate(payload)
}

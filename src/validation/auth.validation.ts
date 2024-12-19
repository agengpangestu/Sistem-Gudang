import Joi from "joi"
import { user_role } from "../db/types"

export const RegisterValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  role: Joi.string().default(user_role.regular),
}).options({ abortEarly: false })

export const LoginValidation = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
}).options({ abortEarly: false })

import Joi from "joi"
import UserType from "../types/user.type"

export const UserValidation = (payload: UserType) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    role: Joi.string()
  }).options({ abortEarly: false })

  return schema.validate(payload)
}

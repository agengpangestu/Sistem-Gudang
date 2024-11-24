import Joi from "joi"
import UserType from "../types/user.type"
import { user_role } from "@prisma/client"
import { z } from "zod"

export const RegisterValidation = Joi.object({
  user_id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  role: Joi.string().default(user_role.regular)
}).options({ abortEarly: false })

export const LoginValidation = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required()
}).options({ abortEarly: false })

// schema using zod
export const loginSchema = z
  .object({
    email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is Required" })
      .min(8, { message: "Password length should be more than 8" })
  })
  .partial()

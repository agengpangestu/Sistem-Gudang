import Joi from "joi"

class JoiError extends Joi.ValidationError {
  constructor(name: string, message: any = [], details?: any) {
    super(name, message, details)
    this.name = "ValidationError"
    this.message = message
    this.details = details
  }
}

export default JoiError

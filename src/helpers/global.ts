import { NextFunction, Request, Response } from "express"
import Unauthorized from "./unauthorized"
import ErrorNotFound from "./not.found"
import JoiError from "./joi"
import DatabaseErrorConstraint from "./database"

export const GlobalError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Unauthorized) {
    return res.status(403).json({
      status: false,
      name: err.name,
      message: err.message,
      statusCode: 403
    })
  } else if (err instanceof ErrorNotFound) {
    return res.status(404).json({
      status: false,
      name: err.name,
      message: err.message,
      statusCode: 404
    })
  } else if (err instanceof JoiError) {
    return res.status(422).json({
      status: false,
      name: err.name,
      message: err.message.replace(/\"/g, ""),
      details: err.details,
      statusCode: 422
    })
  } else if (err instanceof DatabaseErrorConstraint) {
    return res.status(422).json({
      status: false,
      name: err.name,
      code: err.code,
      message: err.message.replace(/\"/g, ""),
      statusCode: 422
    })
  } else {
    return res.status(500).json({
      status: false,
      message: "Something error",
      statusCode: 500
    })
  }
}

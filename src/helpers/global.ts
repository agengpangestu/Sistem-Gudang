import { NextFunction, Request, Response } from "express"
import DatabaseErrorConstraint from "./database"
import ErrorAuth from "./error.auth"
import ErrorValidation from "./error.validation"
import JoiError from "./joi"
import ErrorNotFound from "./not.found"
import Unauthorized from "./unauthorized"

export const GlobalError = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err)

  if (err.code === "ENOTFOUND" && err.syscall === "getaddrinfo") {
    return res.status(503).json({
      status: false,
      message: "Error Connection Database Cloud",
      error: "Unable to reach the connected database",
      statusCode: 503,
    })
  } else if (err instanceof Unauthorized) {
    return res.status(401).json({
      status: false,
      name: err.name,
      message: err.message,
      statusCode: 401,
    })
  } else if (err instanceof ErrorNotFound) {
    return res.status(404).json({
      status: false,
      name: err.name,
      message: err.message,
      statusCode: 404,
    })
  } else if (err instanceof JoiError) {
    return res.status(422).json({
      status: false,
      name: err.name,
      message: err.message.replace(/\"/g, ""),
      details: err.details,
      statusCode: 422,
    })
  } else if (err instanceof Error) {
    return res.status(400).json({
      status: false,
      name: err.name,
      message: err.message,
      statusCode: 400,
    })
  } 
  else if (err instanceof DatabaseErrorConstraint) {
    return res.status(422).json({
      status: false,
      name: err.name,
      message: err.message.replace(/\"/g, ""),
      statusCode: 422,
      error: err.error,
    })
  } else if (err instanceof ErrorValidation) {
    return res.status(422).json({
      status: false,
      message: err.message,
      error: err.error,
    })
  } else if (err instanceof ErrorAuth) {
    return res.status(422).json({
      status: false,
      name: err.name,
      message: err.message,
      error: err.error,
    })
  } else {
    return res.status(500).json({
      status: false,
      message: "Something error",
      statusCode: 500,
    })
  }
}

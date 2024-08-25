import { NextFunction, Request, Response } from "express"
import { verifyJwt } from "./jwt"

const deserializedToken = async (req: Request, res: Response, next: NextFunction) => {
  const access_token = req.headers.authorization?.replace(/^Bearer\s/, "")

  if (!access_token) {
    return next()
  }

  const token: any = verifyJwt(access_token)

  if (token.decoded) {
    res.locals.user = token.decoded
    return next()
  }

  if (token.expired) {
    return next()
  }

  return next()
}

export default deserializedToken

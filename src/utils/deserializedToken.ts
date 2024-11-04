import { NextFunction, Request, Response } from "express"
import { verifyJwt } from "./jwt"

const deserializedToken = async (req: Request, res: Response, next: NextFunction) => {
  const token_cookie = req.headers.cookie?.split("=")[1]
  const tokens = req.headers.cookie?.split("; ")
  // const access_token = req.headers.authorization?.replace(/^Bearer\s/, "")
  const headerSecret = tokens?.find((cookie) => cookie.startsWith("accessToken="))?.replace(/^accessToken=/, "")

  if (!headerSecret) {
    return next()
  }

  const token: any = verifyJwt(headerSecret)

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

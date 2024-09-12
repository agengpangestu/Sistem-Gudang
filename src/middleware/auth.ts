import { NextFunction, Request, Response } from "express"
import Unauthorized from "../helpers/unauthorized"

export const RequiredAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user
  console.log(user);
  

  if (!user || user.role !== "admin")
    throw next(new Unauthorized)

  return next()
}

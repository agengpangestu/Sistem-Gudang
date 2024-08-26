import { NextFunction, Request, Response } from "express"

export const RequiredAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user

  if (!user || user.role !== "admin")
    return res.status(403).json({
      success: false,
      message: "This route is protected and you don't has authority to access",
      statusCode: 403
    })

  return next()
}

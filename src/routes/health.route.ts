import { NextFunction, Request, Response, Router } from "express"

export const HealthRoute: Router = Router()

HealthRoute.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ status: true, statusCode: 200, message: "OK" })
})

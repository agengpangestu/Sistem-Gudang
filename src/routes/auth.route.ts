import { NextFunction, Request, Response, Router } from "express"
import authController from "../controller/auth.controller"

export const AuthRoute: Router = Router()

AuthRoute.post("/registration", authController.Register)
AuthRoute.post("/login", authController.Login)
AuthRoute.get("/logout", (req: Request, res: Response, next: NextFunction) => {
  //   res.clearCookie("accessClient")
  //   res.clearCookie("accessToken")
  console.log(req.headers)
  res.status(200).send("Cookie deleted")
})

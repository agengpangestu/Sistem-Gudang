import { Router } from "express"
import userController from "../controller/user.controller"

export const UserRoute: Router = Router()

UserRoute.get("/", userController.GetAll)
UserRoute.get("/:id", userController.GetById)
UserRoute.put("/:id/update-user", userController.Update)
UserRoute.delete("/:id/delete-user", userController.Destroy)

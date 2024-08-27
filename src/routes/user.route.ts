import { Router } from "express"
import userController from "../controller/user.controller"
import { RequiredAdmin } from "../middleware/auth"

export const UserRoute: Router = Router()

UserRoute.get("/", RequiredAdmin, userController.GetAll)
UserRoute.get("/:id", RequiredAdmin, userController.GetById)
UserRoute.put("/:id/update-user", RequiredAdmin, userController.Update)
UserRoute.delete("/:id/delete-user", RequiredAdmin, userController.Destroy)

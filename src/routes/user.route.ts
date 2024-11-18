import { Router } from "express"
import { RequiredAdmin } from "../middleware/auth"
import { UserController } from "../controller/user.controller"

const userController = new UserController()
export const UserRoute: Router = Router()

UserRoute.get("/", RequiredAdmin, userController.GetAll)
UserRoute.get("/:id", RequiredAdmin, userController.GetById)
UserRoute.put("/:id/update-user", RequiredAdmin, userController.Update)
UserRoute.delete("/:id/delete-user", RequiredAdmin, userController.Destroy)

import { Router } from "express"
import { RequiredAdmin } from "../middleware/auth"
import MutationController from "../controller/mutation.controller"

const mutationController = new MutationController()
export const MutationRoute: Router = Router()

MutationRoute.get("/", mutationController.GetAll)
MutationRoute.get("/:id", RequiredAdmin, mutationController.GetById)
MutationRoute.post("/post-mutation", RequiredAdmin, mutationController.Store)
MutationRoute.put("/:id/update-mutation", RequiredAdmin, mutationController.Update)
MutationRoute.delete("/:id/delete-mutation", RequiredAdmin, mutationController.Destroy)

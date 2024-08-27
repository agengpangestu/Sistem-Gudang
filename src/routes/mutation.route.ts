import { Router } from "express"
import mutationController from "../controller/mutation.controller"
import { RequiredAdmin } from "../middleware/auth"

export const MutationRoute: Router = Router()

MutationRoute.get("/", mutationController.GetAll)
MutationRoute.get("/:id", RequiredAdmin, mutationController.GetById)
MutationRoute.post("/post-mutation", RequiredAdmin, mutationController.Store)
MutationRoute.put("/:id/update-mutation", RequiredAdmin, mutationController.Update)
MutationRoute.delete("/:id/delete-mutation", RequiredAdmin, mutationController.Destroy)

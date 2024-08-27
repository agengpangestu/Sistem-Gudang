import { Router } from "express"
import productController from "../controller/product.controller"
import { RequiredAdmin } from "../middleware/auth"

export const ProductRoute: Router = Router()

ProductRoute.get("/", productController.GetAll)
ProductRoute.get("/:id", RequiredAdmin, productController.GetById)
ProductRoute.post("/post-product", RequiredAdmin, productController.Store)
ProductRoute.put("/:id/update-product", RequiredAdmin, productController.Update)
ProductRoute.delete("/:id/delete-product", RequiredAdmin, productController.Destroy)

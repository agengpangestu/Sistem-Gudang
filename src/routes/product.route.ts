import { Router } from "express"
import productController from "../controller/product.controller"
import { RequiredAdmin } from "../middleware/auth"

export const ProductRoute: Router = Router()

ProductRoute.get("/", productController.GetAll)
ProductRoute.get("/:id", productController.GetById)
ProductRoute.post("/post-product", RequiredAdmin, productController.Store)

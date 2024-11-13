import { Router } from "express"
import ProductController from "../controller/product.controller"
import { RequiredAdmin } from "../middleware/auth"

const productController = new ProductController()
export const ProductRoute: Router = Router()

ProductRoute.get("/", RequiredAdmin, productController.GetAll)
ProductRoute.get("/:id", RequiredAdmin, productController.GetById)
ProductRoute.post("/post-product", RequiredAdmin, productController.Store)
ProductRoute.put("/:id/update-product", RequiredAdmin, productController.Update)
ProductRoute.delete("/:id/delete-product", RequiredAdmin, productController.Destroy)

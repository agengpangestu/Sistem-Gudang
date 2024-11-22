import { Router } from "express"
import { ProductController } from "../controller/product.controller"
import { RequiredAdmin } from "../middleware/auth"
import PrismaUtils from "../utils/prisma"
import ProductService from "../services/product.service"
import { ValidateError } from "../middleware"
import { ProductValidation } from "../validation"

const prisma = new PrismaUtils()
const productController = new ProductController(new ProductService(prisma))
export const ProductRoute: Router = Router()

ProductRoute.get("/", productController.GetAll)
ProductRoute.get("/:id", RequiredAdmin, productController.GetById)
ProductRoute.post("/post-product", RequiredAdmin, ValidateError(ProductValidation), productController.Store)
ProductRoute.put("/:id/update-product", RequiredAdmin, productController.Update)
ProductRoute.delete("/:id/delete-product", RequiredAdmin, productController.Destroy)

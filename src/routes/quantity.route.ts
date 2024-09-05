import { Router } from "express"
import quantityController from "../controller/quantity.controller"
import { RequiredAdmin } from "../middleware/auth"

export const QuantityRoute: Router = Router()

QuantityRoute.get("/", RequiredAdmin, quantityController.GetAll)
QuantityRoute.get("/total-quantity", RequiredAdmin, quantityController.GetQuantityOfProduct)

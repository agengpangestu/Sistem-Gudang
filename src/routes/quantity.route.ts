import { Router } from "express"
import { RequiredAdmin } from "../middleware/auth"
import { QuantityController } from "../controller/quantity.controller"

const quantity = new QuantityController()
export const QuantityRoute: Router = Router()

QuantityRoute.get("/", RequiredAdmin, quantity.GetAll)
QuantityRoute.get("/total-quantity", RequiredAdmin, quantity.GetQuantityOfProduct)

import { Router } from "express"
import quantityController from "../controller/quantity.controller"

export const QuantityRoute: Router = Router()

QuantityRoute.get("/", quantityController.GetAll)

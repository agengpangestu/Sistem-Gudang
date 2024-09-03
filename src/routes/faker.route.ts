import { Router } from "express"
import faker from "../utils/faker"
import { RequiredAdmin } from "../middleware/auth"

export const FakerRoute: Router = Router()

FakerRoute.post("/product", RequiredAdmin, faker.storeProduct)
FakerRoute.post("/user", RequiredAdmin, faker.storeUser)

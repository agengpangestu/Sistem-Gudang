import { Router } from "express"
import faker from "../utils/faker"

export const FakerRoute: Router = Router()

FakerRoute.post("/product", faker.storeProduct)
FakerRoute.post("/user", faker.storeUser)

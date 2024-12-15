import { Router } from "express"
import { FakerController } from "../utils/faker"
import { RequiredAdmin } from "../middleware/auth"
import PrismaUtils from "../utils/prisma"
import { FakerService } from "../services"

const prisma = new PrismaUtils()
const fakerController = new FakerController(new FakerService(prisma))
export const FakerRoute: Router = Router()

FakerRoute.post("/product", RequiredAdmin, fakerController.storeProduct)
FakerRoute.post("/user", RequiredAdmin, fakerController.storeUser)

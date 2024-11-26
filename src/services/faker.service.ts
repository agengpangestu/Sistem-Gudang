import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { v7 as uuidV7 } from "uuid"
import { Product, ProductStore } from "../types/product.type"
import AuthRegisterType, { AuthRegister } from "../types/auth.type"
import PrismaUtils from "../utils/prisma"
import { faker } from "@faker-js/faker"
import DatabaseErrorConstraint from "../helpers/database"

export class FakerService {
  constructor(private prisma: PrismaUtils) {}
  public async storeProduct(payload: ProductStore): Promise<Product> {
    try {
      return await this.prisma.products.create({
        data: {
          ...payload,
          product_id: uuidV7(),
          product_code: parseInt(faker.finance.accountNumber(5)),
          product_name: faker.commerce.productName(),
          desc: faker.commerce.productDescription(),
          price: parseInt(faker.finance.amount({ autoFormat: true, min: 5, max: 10 })),
          createdAt: new Date()
        }
      })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2003") {
        throw new DatabaseErrorConstraint(
          error.name,
          "Error Database",
          "Foreign key constraint failed on the field or not found"
        )
      }
      throw error
    }
  }

  public async storeUser(payload: AuthRegister): Promise<AuthRegisterType> {
    try {
      return await this.prisma.users.create({ data: { ...payload, user_id: uuidV7() } })
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        throw new DatabaseErrorConstraint(error.name, "Error Database", "Email has been registered")
      }
      throw error
    }
  }
}

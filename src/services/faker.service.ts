import { Decimal, PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { prismaUtils } from "../utils/prisma"
import { ProductType } from "../types/product.type"
import UserType from "../types/user.type"
import AuthRegisterType from "../types/auth.type"

class FakerService {
  public async storeProduct(payload: Omit<ProductType, "id">): Promise<ProductType | any> {
    try {
      return await prismaUtils.prisma.product.create({
        data: {
          ...payload,
          price: new Decimal(payload.price),
          createdAt: new Date()
        }
      })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2003") {
        throw new Error("Foreign key constraint failed on the field or not found")
      }
      throw error
    }
  }

  public async storeUser(payload: Omit<AuthRegisterType, "id">): Promise<AuthRegisterType | any> {
    try {
      return await prismaUtils.prisma.user.create({ data: payload })
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        throw new Error("Email has been registered")
      }
      throw error
    }
  }
}

export default new FakerService()

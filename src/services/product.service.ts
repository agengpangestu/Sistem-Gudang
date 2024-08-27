import { Decimal, PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import ProductType from "../types/product.type"
import { prismaUtils } from "../utils/prisma"

class ProductService {
  public async GetAll(): Promise<any> {
    return await prismaUtils.prisma.product.findMany({ orderBy: { createdAt: "desc" } })
  }

  public async GetById(id: number): Promise<any> {
    return await prismaUtils.prisma.product.findUnique({
      where: { id: id },
      include: {
        user: {
          select: {
            email: true,
            name: true
          }
        }
      }
    })
  }

  public async Store(payload: Omit<ProductType, "id">): Promise<ProductType | any> {
    try {
      return await prismaUtils.prisma.product.create({
        data: {
          ...payload,
          price: new Decimal(payload.price)
        }
      })
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2003") {
        throw new Error("Foreign key constraint failed on the field or not found")
      }
      throw error
    }
  }

  public async Update(id: number, payload: Omit<ProductType, "product_id">): Promise<ProductType | any> {
    try {
      return await prismaUtils.prisma.product.update({
        where: { id: id },
        data: {
          ...payload,
          price: new Decimal(payload.price)
        }
      })
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2003") {
        throw new Error("Foreign key constraint failed on the field or not found")
      }
      throw error
    }
  }

  public async Destroy(id: number): Promise<any> {
    return await prismaUtils.prisma.product.delete({ where: { id: id } })
  }
}

export default new ProductService()

import { Decimal, PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { ProductType } from "../types/product.type"
import { prismaUtils } from "../utils/prisma"

class ProductService {
  public async GetAll(query: ProductType): Promise<any> {
    const skip = (query.page - 1) * query.limit
    const take = query.limit

    const products = await prismaUtils.prisma.product.findMany({
      select: {
        product_id: true,
        product_code: true,
        product_name: true,
        location: true,
        price: true,
        createdAt: true
      },
      where: {
        product_name: { contains: query.product_name, mode: "insensitive" }
      },
      orderBy: { [query.sort_by || "price"]: query.sort_order || "asc" },
      skip: skip,
      take: take
    })

    const total_data = await prismaUtils.prisma.product.count({
      where: {
        product_name: { contains: query.product_name, mode: "insensitive" }
      },
      orderBy: { [query.sort_by || "price"]: query.sort_order || "asc" }
    })

    return {
      total_data: total_data,
      total_pages: Math.ceil(total_data / query.limit),
      current_page: query.page,
      data: products
    }
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

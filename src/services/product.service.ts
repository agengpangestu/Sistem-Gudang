import { Decimal, PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { ProductPaginationResponse, ProductQuery, ProductType } from "../types/product.type"
import PrismaUtils from "../utils/prisma"
import DatabaseErrorConstraint from "../helpers/database"

class ProductService {
  constructor(private prisma: PrismaUtils) {}

  public async GetAll(query: ProductQuery): Promise<ProductPaginationResponse> {
    const skip = (query.page - 1) * query.limit
    const take = query.limit

    const filters = {
      product_name: query.product_name ? { contains: query.product_name, mode: "insensitive" } : undefined,
      createdAt: {
        gte: query.start_date ? new Date(new Date(query.start_date).setHours(0, 0, 0)) : undefined,
        lt: query.end_date ? new Date(new Date(query.end_date).setHours(24, 59, 59)) : undefined
      }
    }
    const select = {
      product_id: true,
      product_code: true,
      product_name: true,
      location: true,
      price: true,
      createdAt: true
    }
    const cleanFilters = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== undefined))

    const [products, total_data] = await Promise.all([
      this.prisma.products.findMany({
        select: select,
        where: cleanFilters,
        orderBy: { [query.sort_by || "price"]: query.sort_order || "asc" },
        skip: skip,
        take: take
      }),
      this.prisma.products.count({ where: cleanFilters })
    ])

    return {
      total_data: total_data,
      total_pages: Math.ceil(total_data / query.limit),
      current_page: query.page,
      data: products
    }
  }

  public async GetById(product_code: number): Promise<any> {
    return await this.prisma.products.findUnique({
      where: { product_code: product_code },
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
      return await this.prisma.products.create({
        data: {
          ...payload,
          price: new Decimal(payload.price),
          product_code: Number(payload.product_code),
          user_id: Number(payload.user_id)
        }
      })
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        throw new DatabaseErrorConstraint(error.name, "Error Database", `field: '${error.meta?.target}' must unique`)
      } else if (error instanceof PrismaClientKnownRequestError && error.code === "P2003") {
        throw new DatabaseErrorConstraint(
          error.name,
          "Error Database",
          `Foreign key constraint '${error.meta?.field_name}' not found`
        )
      }
      throw error
    }
  }

  public async Update(product_code: number, payload: Omit<ProductType, "product_id">): Promise<ProductType | any> {
    try {
      return await this.prisma.products.update({
        where: { product_code: product_code },
        data: {
          ...payload,
          price: new Decimal(payload.price)
        }
      })
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2003") {
        throw new DatabaseErrorConstraint(
          error.name,
          "Error Database",
          `Foreign key constraint '${error.meta?.field_name}' not found`
        )
      }
      throw error
    }
  }

  public async Destroy(product_code: number): Promise<any> {
    return await this.prisma.products.delete({ where: { product_code: product_code } })
  }
}

export default ProductService

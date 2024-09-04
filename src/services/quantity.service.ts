import { ProductType } from "../types/product.type"
import { prismaUtils } from "../utils/prisma"

class QuantityService {
  public async GetAll(query: ProductType): Promise<any> {
    const skip = (query.page - 1) * query.limit
    const take = query.limit

    const quantity = await prismaUtils.prisma.product.findMany({
      where: {
        product_name: { contains: query.product_name, mode: "insensitive" },
        createdAt: {
          gte: query.start_date ? new Date(new Date(query.start_date).setHours(0, 0, 0)) : undefined,
          lt: query.end_date ? new Date(new Date(query.end_date).setHours(24, 59, 59)) : undefined
        },
        product_code: { equals: query.product_code ? parseInt(query.product_code as unknown as string) : undefined }
      },
      orderBy: {
        [query.sort_by || "createdAt"]: query.sort_order || "asc"
      },
      select: {
        product_code: true,
        product_name: true,
        location: true,
        price: true,
        createdAt: true
      },
      skip: skip,
      take: take
    })

    const total_data = await prismaUtils.prisma.product.count({
      where: {
        product_name: { contains: query.product_name, mode: "insensitive" },
        createdAt: {
          gte: query.start_date ? new Date(new Date(query.start_date).setHours(0, 0, 0)) : undefined,
          lt: query.end_date ? new Date(new Date(query.end_date).setHours(24, 59, 59)) : undefined
        },
        product_code: { equals: query.product_code ? parseInt(query.product_code as unknown as string) : undefined }
      },
      orderBy: {
        [query.sort_by || "createdAt"]: query.sort_order || "asc"
      }
    })

    return {
      total_data: total_data,
      total_pages: Math.ceil(total_data / query.limit),
      current_page: query.page,
      data: quantity
    }
  }
}

export default new QuantityService()

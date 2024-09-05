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

  public async GetQuantityOfProduct(query: ProductType): Promise<any> {
    const skip = (query.page - 1) * query.limit
    const take = query.limit

    // group by product_code first
    const mutations = await prismaUtils.prisma.mutation.groupBy({
      by: ["product_code"],
      _sum: { quantity: true },
      where: { mutation_type: query.mutation_type }
    })

    // calculate total items and pages
    const total_items = mutations.length
    const total_pages = Math.ceil(total_items / query.limit)

    // slice // btw i so confused, damn! // slice data for pagination
    const pageMutation = mutations.slice(skip, query.page * take)

    // map mutations table for get all product_code
    const product_codes = mutations.map((data) => data.product_code)

    // find all product using product_code
    const fetch_products = await prismaUtils.prisma.product.findMany({
      where: { product_code: { in: product_codes } }
    })

    // map for get all product_code, product_name, and quantity
    const results = pageMutation.map((data) => {
      const product = fetch_products.find((item) => item.product_code === data.product_code)
      const total_quantity = data._sum.quantity

      return {
        product_code: product?.product_code,
        product_name: product?.product_name,
        qty: total_quantity
      }
    })

    return {
      current_page: query.page,
      limit: take,
      total_items: total_items,
      total_pages: total_pages,
      data: results
    }
  }
}

export default new QuantityService()

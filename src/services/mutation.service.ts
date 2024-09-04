import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { MutationType } from "../types/mutation.type"
import { prismaUtils } from "../utils/prisma"
import { mutation_type } from "@prisma/client"

class MutationService {
  public async GetAll(query: MutationType): Promise<any> {
    const skip = (query.page - 1) * query.limit
    const take = query.limit

    const mutations = await prismaUtils.prisma.mutation.findMany({
      select: {
        mutation_id: true,
        product_code: true,
        quantity: true,
        mutation_type: true,
        createdAt: true
      },
      where: {
        mutation_type: { equals: query.mutation_type }
      },
      orderBy: {
        [query.sort_by || "createdAt"]: query.sort_order || "asc"
      },
      skip: skip,
      take: take
    })

    const total_data = await prismaUtils.prisma.mutation.count({
      where: {
        mutation_type: { equals: query.mutation_type }
      },
      orderBy: {
        [query.sort_by || "createdAt"]: query.sort_order || "asc"
      }
    })

    return {
      total_data: total_data,
      total_pages: Math.ceil(total_data / query.limit),
      current_page: query.page,
      data: mutations
    }
  }

  public async GetById(id: number): Promise<any> {
    return await prismaUtils.prisma.mutation.findUnique({
      where: { id: id },
      include: {
        product: {
          select: {
            product_name: true,
            desc: true,
            location: true,
            price: true
          }
        },
        user: {
          select: {
            email: true,
            name: true
          }
        }
      }
    })
  }

  public async Store(payload: Omit<MutationType, "id">): Promise<MutationType | any> {
    try {
      if (!Object.values(mutation_type).includes(payload.mutation_type)) {
        throw new Error(
          `Invalid mutation type: ${payload.mutation_type}. Expected one of ${Object.values(mutation_type).join(", ")}.`
        )
      }
      return await prismaUtils.prisma.mutation.create({ data: payload })
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2003") {
        throw new Error("Foreign key constraint failed on the field or not found")
      }
      throw error
    }
  }

  public async Update(id: number, payload: Omit<MutationType, "mutation_id">): Promise<MutationType | any> {
    try {
      if (!Object.values(mutation_type).includes(payload.mutation_type)) {
        throw new Error(
          `Invalid mutation type: ${payload.mutation_type}. Expected one of ${Object.values(mutation_type).join(", ")}.`
        )
      }
      return await prismaUtils.prisma.mutation.update({ where: { id: id }, data: payload })
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2003") {
        throw new Error("Foreign key constraint failed on the field or not found")
      }
      throw error
    }
  }

  public async Destroy(id: number): Promise<any> {
    return await prismaUtils.prisma.mutation.delete({ where: { id: id } })
  }
}

export default new MutationService()

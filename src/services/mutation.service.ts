import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { MutationType } from "../types/mutation.type"
import { mutation_type } from "@prisma/client"
import PrismaUtils from "../utils/prisma"
import DatabaseErrorConstraint from "../helpers/database"

class MutationService {
  private prisma: PrismaUtils

  constructor() {
    this.prisma = new PrismaUtils()
  }

  public async GetAll(query: MutationType): Promise<any> {
    const skip = (query.page - 1) * query.limit
    const take = query.limit

    const mutations = await this.prisma.mutations.findMany({
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

    const total_data = await this.prisma.mutations.count({
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
    return await this.prisma.mutations.findUnique({
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
      return await this.prisma.mutations.create({ data: payload })
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

  public async Update(id: number, payload: Omit<MutationType, "mutation_id">): Promise<MutationType | any> {
    try {
      if (!Object.values(mutation_type).includes(payload.mutation_type)) {
        throw new Error(
          `Invalid mutation type: ${payload.mutation_type}. Expected one of ${Object.values(mutation_type).join(", ")}.`
        )
      }
      return await this.prisma.mutations.update({ where: { id: id }, data: payload })
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

  public async Destroy(id: number): Promise<any> {
    return await this.prisma.mutations.delete({ where: { id: id } })
  }
}

export default MutationService

import { user_role } from "@prisma/client"
import { User, UserDetail, UserPaginationResponse, UserQuery, UserUpdate } from "../types/"
import PrismaUtils from "../utils/prisma"

class UserService {
  constructor(private prisma: PrismaUtils) {}

  public async GetAll(query: UserQuery): Promise<UserPaginationResponse> {
    const skip = (query.page - 1) * query.limit
    const take = query.limit

    const filters = {
      name: query.name ? { contains: query.name, mode: "insensitive" } : undefined,
      role: query.role ? { equals: query.role } : undefined
    } as object

    const select = {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    }

    const [users, total_data] = await Promise.all([
      this.prisma.users.findMany({
        where: filters,
        select: select,
        skip: skip,
        take: take
      }),

      this.prisma.users.count({
        where: filters
      })
    ])

    return {
      total_data: total_data,
      total_pages: Math.ceil(total_data / query.limit),
      current_page: query.page,
      data: users
    }
  }

  public async GetById(id: number): Promise<UserDetail | null> {
    return await this.prisma.users.findUnique({
      where: { id: id },
      select: {
        id: true,
        user_id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    })
  }

  public async Update(id: number, payload: UserUpdate): Promise<User> {
    try {
      if (!Object.values(user_role).includes(payload.role)) {
        throw new Error(`Invalid role: ${payload.role}. Expected one of ${Object.values(user_role).join(", ")}.`)
      }
      return await this.prisma.users.update({ where: { id: id }, data: payload })
    } catch (error) {
      throw error
    }
  }

  public async Destroy(id: number): Promise<any> {
    return await this.prisma.users.delete({ where: { id: id } })
  }
}

export default UserService

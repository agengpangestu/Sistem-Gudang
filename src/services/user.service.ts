import { user_role } from "@prisma/client"
import UserType from "../types/user.type"
import PrismaUtils from "../utils/prisma"

class UserService {
  private prisma: PrismaUtils

  constructor() {
    this.prisma = new PrismaUtils()
  }

  public async GetAll(query: UserType): Promise<any> {
    const skip = (query.page - 1) * query.limit
    const take = query.limit

    const users = await this.prisma.users.findMany({
      where: {
        name: { contains: query.name, mode: "insensitive" },
        role: { equals: query.role }
      },
      skip: skip,
      take: take
    })

    const total_data = await this.prisma.users.count({
      where: {
        name: { contains: query.name, mode: "insensitive" },
        role: { equals: query.role }
      }
    })

    return {
      total_data: total_data,
      total_pages: Math.ceil(total_data / query.limit),
      current_page: query.page,
      data: users
    }
  }

  public async GetById(id: any): Promise<any> {
    return await this.prisma.users.findUnique({
      where: { id: id },
      select: {
        user_id: true,
        email: true,
        name: true,
        role: true
      }
    })
  }

  public async Update(id: number, payload: Omit<UserType, "user_id">): Promise<UserType | any> {
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

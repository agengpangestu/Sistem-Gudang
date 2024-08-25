import { user_role } from "@prisma/client"
import UserType from "../types/user.type"
import { prismaUtils } from "../utils/prisma"

class UserService {
  public async GetAll(): Promise<any> {
    return await prismaUtils.prisma.user.findMany()
  }

  public async GetById(id: any): Promise<any> {
    return await prismaUtils.prisma.user.findUnique({ where: { id: id } })
  }

  public async Update(id: number, payload: Omit<UserType, "user_id">): Promise<UserType | any> {
    try {
      if (!Object.values(user_role).includes(payload.role)) {
        throw new Error(`Invalid role: ${payload.role}. Expected one of ${Object.values(user_role).join(", ")}.`)
      }
      return await prismaUtils.prisma.user.update({ where: { id: id }, data: payload })
    } catch (error) {
      throw error
    }
  }

  public async Destroy(id: number): Promise<any> {
    return await prismaUtils.prisma.user.delete({ where: { id: id } })
  }
}

export default new UserService()

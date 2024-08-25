import { prismaUtils } from "../utils/prisma"

class UserService {
  public async GetAll(): Promise<any> {
    return prismaUtils.prisma.user.findMany()
  }

  public async GetById(id: any): Promise<any> {
    return prismaUtils.prisma.user.findUnique({ where: { id: id } })
  }
}

export default new UserService()

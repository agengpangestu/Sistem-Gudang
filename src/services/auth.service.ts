import { Prisma } from "@prisma/client"
import { prismaUtils } from "../utils/prisma"
import AuthRegisterType from "../types/auth.type"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import UserType from "../types/user.type"

class AuthService {
  public async Register(payload: Omit<AuthRegisterType, "id">): Promise<AuthRegisterType | any> {
    try {
      return await prismaUtils.prisma.user.create({ data: payload })
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        throw new Error("Email has been registered")
      }
      throw error
    }
  }

  public async Login(email: string): Promise<any> {
    try {
      return await prismaUtils.prisma.user.findUnique({ where: { email: email } })
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default new AuthService()

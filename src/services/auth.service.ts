import { Prisma } from "@prisma/client"
import AuthRegisterType from "../types/auth.type"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import UserType from "../types/user.type"
import PrismaUtils from "../utils/prisma"

class AuthService {
  private prisma: PrismaUtils

  constructor() {
    this.prisma = new PrismaUtils()
  }
  
  public async Register(payload: Omit<AuthRegisterType, "id">): Promise<AuthRegisterType | any> {
    try {
      return await this.prisma.users.create({ data: payload })
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        throw new Error("Email has been registered")
      }
      throw error
    }
  }

  public async Login(email: string): Promise<any> {
    try {
      return await this.prisma.users.findUnique({ where: { email: email } })
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default new AuthService()

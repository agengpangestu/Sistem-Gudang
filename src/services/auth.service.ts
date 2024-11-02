import AuthRegisterType from "../types/auth.type"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import UserType from "../types/user.type"
import PrismaUtils from "../utils/prisma"
import DatabaseErrorConstraint from "../helpers/database"

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
        if (error) {
          let err = error.meta?.target as any
          const a = err.map((e: any) => e)
          throw new DatabaseErrorConstraint(error.name, `field: '${a}' must unique or registered`)
        }
      }
      throw error
    }
  }

  public async Login(email: string): Promise<any> {
    try {
      return await this.prisma.users.findUnique({
        where: { email: email },
        select: { id: true, name: true, role: true, password: true }
      })
    } catch (error) {
      throw error
    }
  }
}

export default new AuthService()

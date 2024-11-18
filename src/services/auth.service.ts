import AuthRegisterType from "../types/auth.type"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import UserType from "../types/user.type"
import PrismaUtils from "../utils/prisma"
import DatabaseErrorConstraint from "../helpers/database"
import AuthLogin from "../types/auth.type"

export class AuthService {
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
          throw new DatabaseErrorConstraint(error.name, "Error Database", `field: '${a}' must unique or registered`)
        }
      }
      throw error
    }
  }

  public async Login(email: string): Promise<AuthLogin | null> {
    try {
      const user = await this.prisma.users.findUnique({
        where: { email: email }
      })
      return user
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

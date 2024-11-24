import { v7 as uuidV7 } from "uuid"
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library"
import PrismaUtils from "../utils/prisma"
import DatabaseErrorConstraint from "../helpers/database"
import { AuthRegister, AuthLogin } from "../types/"

export class AuthService {
  constructor(private prisma: PrismaUtils) {}

  public async Register(payload: AuthRegister): Promise<AuthRegister> {
    try {
      const register = await this.prisma.users.create({ data: { ...payload, user_id: uuidV7() } })
      return register
    } catch (error: any) {
      if (error instanceof PrismaClientValidationError) {
        let err = error.name
        throw new DatabaseErrorConstraint(err, "Error Database", "Role doesn't exist")
      }
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

import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library"
import { v7 as uuidV7 } from "uuid"
import DatabaseErrorConstraint from "../helpers/database"
import { AuthLogin, AuthRegister } from "../types/"
import { db } from "../utils"

const roles_valid = ["super_admin", "admin", "regular"]

export const RegisterService = async (payload: AuthRegister): Promise<AuthRegister> => {
  try {
    if (!roles_valid.includes(payload.role)) {
      throw new Error("Error role not valid")
    }

    const register = await db
      .insertInto("User")
      .values({
        id: uuidV7(),
        name: payload.name,
        email: payload.email,
        password: payload.password,
        role: payload.role,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning(["id", "name", "email", "password", "role", "createdAt", "updatedAt"])
      .executeTakeFirstOrThrow()
    // this.prisma.users.create({ data: { ...payload, user_id: uuidV7() } })
    return register
  } catch (error: any) {
    if (error.code === "23505" && error.constraint === "User_email_key") {
      throw new DatabaseErrorConstraint("Unique Constraint", "Error Database", "Email has been registered")
    }
    // if (error instanceof PrismaClientValidationError) {
    //   const err = error.name
    //   throw new DatabaseErrorConstraint(err, "Error Database", "Role doesn't exist")
    // }
    // if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
    //   if (error) {
    //     const err = error.meta?.target as any
    //     const a = err.map((e: any) => e)
    //     throw new DatabaseErrorConstraint(error.name, "Error Database", `field: '${a}' must unique or registered`)
    //   }
    // }
    throw error
  }
}

export const LoginService = async (email: string): Promise<AuthLogin | null> => {
  try {
    const register = await db.selectFrom("User").selectAll().where("email", "=", email).executeTakeFirstOrThrow()
    return register
  } catch (error) {
    console.log(error)
    throw error
  }
}

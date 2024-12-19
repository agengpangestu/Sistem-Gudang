import { NoResultError } from "kysely"
import { v7 as uuidV7 } from "uuid"
import DatabaseErrorConstraint, { DatabaseNotFound } from "../helpers/database"
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
    return register
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error && "constraint" in error) {
      if (error.code === "23505" && error.constraint === "User_email_key") {
        throw new DatabaseErrorConstraint("Database Error", "Bad Request", "Email has been registered")
      }
    }
    throw error
  }
}

export const LoginService = async (email: string): Promise<AuthLogin | null> => {
  try {
    const register = await db.selectFrom("User").selectAll().where("email", "=", email).executeTakeFirstOrThrow()
    return register
  } catch (error) {
    if (error instanceof NoResultError) {
      throw new DatabaseNotFound("Database Error", "Not Found", "Email not registered") // fix here
    }
    throw error
  }
}

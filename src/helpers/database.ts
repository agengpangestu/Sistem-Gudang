import { Prisma } from "@prisma/client"
import { DatabaseError } from "pg"

class DatabaseErrorConstraint extends DatabaseError {
  error: string
  constructor(name: string, message: any, error: any) {
    super(name, message, error)
    this.message = message
    this.error = error
  }
}

export class DatabaseNotFound extends DatabaseError {
  error: string
  constructor(name: string, message: any, error: any) {
    super(name, message, error)
    this.message = message
    this.error = error
  }
}

export default DatabaseErrorConstraint

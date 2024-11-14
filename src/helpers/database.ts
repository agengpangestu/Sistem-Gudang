import { Prisma } from "@prisma/client"

class DatabaseErrorConstraint extends Prisma.PrismaClientKnownRequestError {
  error: any
  constructor(name: string, message: any, error: any) {
    super(name, message)
    this.name = name
    this.message = message
    this.error = error
  }
}

export default DatabaseErrorConstraint

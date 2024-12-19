import { Prisma } from "@prisma/client"

class DatabaseErrorConstraint extends Prisma.PrismaClientKnownRequestError {
  error: string
  constructor(name: string, message: any, error: string) {
    super(name, message)
    this.name = name
    this.message = message
    this.error = error
  }
}

export default DatabaseErrorConstraint

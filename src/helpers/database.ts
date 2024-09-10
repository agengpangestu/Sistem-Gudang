import { Prisma } from "@prisma/client"

class DatabaseErrorConstraint extends Prisma.PrismaClientKnownRequestError {
  constructor(name: string, code: string, message: any) {
    super(name, message)
    this.name = name
    this.code = code
    this.message = message
  }
}

export default DatabaseErrorConstraint

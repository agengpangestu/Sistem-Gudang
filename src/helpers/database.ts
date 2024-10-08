import { Prisma } from "@prisma/client"

class DatabaseErrorConstraint extends Prisma.PrismaClientKnownRequestError {
  constructor(name: string, message: any) {
    super(name, message)
    this.name = name
    this.message = message
  }
}

export default DatabaseErrorConstraint

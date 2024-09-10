import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient({
  log: ["error", "info", "query", "warn"]
})
class PrismaUtils {
  public prisma: PrismaClient
  static prisma: any

  constructor() {
    this.prisma = prisma
  }

  get products(){
    return this.prisma.product
  }

  get mutations() {
    return this.prisma.mutation
  }

  get users() {
    return this.prisma.user
  }

  public async connect() {
    await this.prisma.$connect()
  }

  public async disconnect() {
    await this.prisma.$disconnect()
  }
}

export default PrismaUtils

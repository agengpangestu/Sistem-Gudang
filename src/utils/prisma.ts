import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient({
  log: ["error", "info", "query", "warn"]
})
class PrismaUtils {
  public prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient({
      log: ["info", "query", "warn"]
    })
  }

  public async connect() {
    await this.prisma.$connect()
  }

  public async disconnect() {
    await this.prisma.$disconnect()
  }
}

export const prismaUtils = new PrismaUtils()
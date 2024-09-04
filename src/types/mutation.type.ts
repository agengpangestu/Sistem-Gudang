import { mutation_type } from "@prisma/client"

export default interface MutationType {
  int: number
  mutation_id: string
  user_id: number
  product_code: number
  quantity: number
  mutation_type: mutation_type
  createdAt: Date
  updatedAt: Date
}

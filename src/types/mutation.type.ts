import { mutation_type } from "@prisma/client"

export interface MutationType extends MutationPagination {
  id: number
  mutation_id: string
  user_id: number
  product_code: number
  quantity: number
  mutation_type: mutation_type
  createdAt: Date
  updatedAt: Date
  sort_by?: "createdAt" | "quantity"
  sort_order?: "asc" | "desc"
}

export interface MutationPagination {
  page: number
  limit: number
}

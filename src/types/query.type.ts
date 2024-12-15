import { Decimal } from "@prisma/client/runtime/library"

export interface QueryType {
  sort_by?: "product_name" | "price" | "createdAt"
  sort_order?: "asc" | "desc"
  start_date?: Date
  end_date?: Date
  mutation_type?: "in" | "out"
  max_price?: Decimal
  min_price?: Decimal
}

import { Decimal } from "@prisma/client/runtime/library"

export interface ProductType extends ProductPagination {
  id: number
  product_id: string
  product_code: number
  product_name: string
  desc: string
  location: string
  price: Decimal
  user_id: number
  createdAt: Date
  updatedAt: Date
  sort_by?: "product_name" | "price" | "createdAt"
  sort_order?: "asc" | "desc"
  start_date: Date
  end_date: Date
}

export interface ProductPagination {
  page: number
  limit: number
}

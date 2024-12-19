import { Decimal } from "@prisma/client/runtime/library"
import { PaginationType } from "./pagination.type"
import { QueryType } from "./query.type"

export interface ProductType extends ProductPagination {
  id: number
  product_id: string
  product_code: number
  product_name: string
  desc: string
  location: string
  price: number
  user_id: number
  createdAt: Date
  updatedAt: Date
  sort_by?: "product_name" | "price" | "createdAt"
  sort_order?: "asc" | "desc"
  start_date: Date
  end_date: Date
  mutation_type: "in" | "out"
  max_price: Decimal
  min_price: Decimal
}

export interface ProductPagination {
  page: number
  limit: number
}

// update
// use this
export interface ProductPaginationResponse {
  total_data: number
  total_pages: number
  current_page: number
  data: Product[]
}

export interface Product {
  id: string
  product_name: string
  location: string
  price: number
  createdAt: Date
  updatedAt: Date
}

export interface ProductDetail extends Partial<Product> {
  desc: string
  user_id: string
}

export interface ProductQuery extends QueryType, PaginationType {
  product_name: string
}

export interface ProductStore {
  product_name: string
  desc: string
  location: string
  price: number
  user_id: string
}

export interface ProductUpdate {
  product_name?: string
  desc?: string
  location?: string
  price?: number
}

export interface DB {
  Product: Product
}

import { user_role } from "@prisma/client"
import { PaginationType } from "./pagination.type"
import { QueryType } from "./query.type"

export default interface UserType extends UserPagination {
  id: number
  user_id: string
  name: string
  email: string
  password: string
  role: user_role
  createdAt: Date
  updatedAt: Date
  sort_by_role?: "regular" | "admin" | "super_admin"
  sort_order?: "asc" | "desc"
}

export interface UserPagination {
  page: number
  limit: number
}

// update
// use this
export interface UserPaginationResponse {
  total_data: number
  total_pages: number
  current_page: number
  data: User[]
}

export interface User {
  user_id: string
  name: string
  email: string
  role: user_role
  createdAt: Date
}

export interface UserDetail extends Partial<User> {
  id: number
  password: string
  updatedAt: Date
}

export interface UserQuery extends QueryType, PaginationType {
  name: string
  role: user_role
}

export interface UserUpdate {
  name: string
  email: string
  password: string
  role: user_role
}

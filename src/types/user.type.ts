import { user_role } from "@prisma/client"

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
  page: number,
  limit: number
}
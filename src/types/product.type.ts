import { Decimal } from "@prisma/client/runtime/library"

export default interface ProductType {
  id: number
  product_id: string
  product_name: string
  desc: string
  location: string
  price: Decimal
  user_id: number
  createdAt: Date
  updatedAt: Date
}

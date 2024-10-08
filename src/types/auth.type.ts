import { user_role } from "@prisma/client"

export default interface AuthRegisterType {
  id: number
  user_id: string
  name: string
  email: string
  password: string
  role: user_role
  createdAt: Date
  updatedAt: Date
}

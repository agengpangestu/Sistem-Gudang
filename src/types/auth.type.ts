export default interface AuthRegisterType {
  id: string
  name: string
  email: string
  password: string
  role: string
  createdAt: Date
  updatedAt: Date
}

export interface AuthLogin {
  id: string
  name: string
  email: string
  role: string
  password: string
}

export interface AuthRegister {
  name: string
  email: string
  password: string
  role: string
}

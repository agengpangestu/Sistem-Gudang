import bcrypt from "bcrypt"

export const encrypt = (password: string) => {
  return bcrypt.hashSync(password, 14)
}

export const decrypt = (password: string, user_password: string) =>{
    return bcrypt.compareSync(password, user_password)
}
import jwt from "jsonwebtoken"
import CONFIG from "../config/environment"

export const signJwt = (payload: Object, options?: jwt.SignOptions | undefined) => {
  return jwt.sign(payload, CONFIG.jwt_private, {
    ...(options && options),
    algorithm: "RS256"
  })
}

export const verifyJwt = (token: string) => {
    try {
        const decoded = jwt.verify(token, CONFIG.jwt_public)
        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === 'jwt is expired or not egible to use',
            decoded: null
        }
    }
}
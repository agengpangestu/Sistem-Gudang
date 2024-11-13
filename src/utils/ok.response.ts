import { Response } from "express"
export const successResponse = (res: Response, statusCode: number, message: string, data?: null): void => {
  res.status(statusCode).json({
    success: true,
    message: message,
    data: data
  })
}

// export default successResponse

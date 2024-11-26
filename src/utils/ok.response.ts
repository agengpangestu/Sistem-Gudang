import { Response } from "express"
export const successResponse = (res: Response, statusCode: number, message: string, data?: object): void => {
  res.status(statusCode).json({
    success: true,
    statusCode: statusCode,
    message: message,
    data: data
  })
}

class ErrorAuth extends Error {
  error: any
  constructor(message: string, error?: any) {
    super()
    this.message = message
    this.name = "Authentication Error"
    this.error = error
  }
}

export default ErrorAuth

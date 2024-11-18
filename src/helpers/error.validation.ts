class ErrorValidation extends Error {
  error: any
  constructor(message: string = "Error Validation", error?: any) {
    super()
    this.message = message
    this.error = error
  }
}

export default ErrorValidation

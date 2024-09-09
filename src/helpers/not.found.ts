class ErrorNotFound extends Error {
  constructor(message: string = "Sorry, Data not found") {
    super(message)
    this.name = "Not Found"
  }
}

export default ErrorNotFound

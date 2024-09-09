class Unauthorized extends Error {
  constructor(
    message: string = "This route is protected and you don't has authority to access",
    public data: any = {}
  ) {
    super(message)
    this.name = "Unauthorized"
    this.data = data
  }
}

export default Unauthorized

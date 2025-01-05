export class BadRequestError extends Error {
  code: string
  status: number

  constructor(message: string) {
    super(message)

    this.code = 'BadRequestError'
    this.status = 400
  }
}

export class InvalidRequestBodyError extends Error {
  constructor() {
    super('Missing parameters in request body')
  }
}

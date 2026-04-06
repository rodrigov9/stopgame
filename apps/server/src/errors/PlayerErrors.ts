import { BaseError } from './BaseError.js'

export class InvalidTokenError extends BaseError {
  constructor() {
    super('Invalid token', 401)
  }
}

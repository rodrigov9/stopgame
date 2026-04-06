import { BaseError } from './BaseError.js'

export class RoomNotFoundError extends BaseError {
  constructor() {
    super('No room found with the provided code', 404)
  }
}

export class RoomFullError extends BaseError {
  constructor() {
    super('The room with the provided code is full', 403)
  }
}

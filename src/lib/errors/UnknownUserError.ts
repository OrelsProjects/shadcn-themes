export class UnknownUserError extends Error {
  constructor() {
    super('Unknown user');
  }
}
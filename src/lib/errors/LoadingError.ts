// LoadingError
export default class LoadingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LoadingError";
  }
}

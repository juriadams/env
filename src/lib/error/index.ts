export class InvalidEnvironmentError extends Error {
  public static readonly name = 'InvalidEnvironmentError';
  public readonly missing: Array<string>;

  constructor(missing: Array<string>) {
    super(`Missing required environment variables! (${missing.join(', ')})`);

    this.name = InvalidEnvironmentError.name;
    this.missing = missing;
  }
}

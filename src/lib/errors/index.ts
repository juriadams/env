export class InvalidEnvironmentError extends Error {
  public static readonly name = "InvalidEnvironmentError";

  constructor(msg?: string) {
    super(msg ?? "Invalid environment");
  }
}

export class MissingEnvironmentVariablesError extends Error {
  public static readonly name = "MissingEnvironmentVariablesError";

  public readonly vars: Array<string>;

  constructor(vars: Array<string>) {
    super(
      `Missing environment variables: ${vars.map((v) => `\`${v}\``).join(", ")}`,
    );

    this.vars = vars;
  }
}

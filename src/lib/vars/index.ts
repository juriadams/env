import { InvalidEnvironmentError, MissingEnvironmentVariablesError } from "@/lib/errors";
import { IS_OPTIONAL } from "@/lib/optional";

type Env = Record<string, string | undefined>;

export type VarsOptions = {
  /**
   * Custom environment object to read from.
   *
   * When omitted (or `null`/`undefined`), falls back to `import.meta.env`
   * or `process.env`.
   */
  env?: Env | null;
};

/**
 * Resolve the active process environment.
 *
 * Prefers `import.meta.env` (Workers, Bun, Vite, ...) and falls back to
 * `process.env` (Node, legacy runtimes, ...).
 */
const resolveEnv = (): Env => {
  if ("env" in import.meta) return (import.meta as ImportMeta & { env: Env }).env;
  if (typeof process !== "undefined" && process.env) return process.env;

  throw new InvalidEnvironmentError(
    "Unable to resolve process environment, both `import.meta.env` and `process.env` are inaccessible",
  );
};

/**
 * Reads and ensures the presence of the given environment variables.
 *
 * @example
 * ```ts
 * const env = vars([
 *   'S3_ACCESS_KEY_ID',
 *   'S3_SECRET_ACCESS_KEY',
 *   optional('PORT'),
 * ]);
 * ```
 *
 * @example
 * ```ts
 * const env = vars(['PORT'], {
 *   env: { PORT: '3000' },
 * });
 * ```
 *
 * @param keys List of environment variable keys to parse.
 * @param opts Optional configuration. Pass `env` to read from a custom object
 *   instead of the process environment.
 *
 * @returns Typed object containing the parsed environment variables.
 */
export const vars = <const T extends ReadonlyArray<string>>(
  keys: T,
  opts?: VarsOptions,
): {
  [K in T[number] as K extends `${infer Name}?` ? Name : K]: K extends `${string}?`
    ? string | null
    : string;
} => {
  const env = opts?.env ?? resolveEnv();

  const res: Record<string, string | null> = {};
  const missing = new Set<string>();

  for (const raw of keys) {
    const match = IS_OPTIONAL.exec(raw);

    const key = match?.[1] ?? raw;
    const value = env[key];

    if (!(value || match)) missing.add(key);

    res[key] = value ?? null;
  }

  if (missing.size > 0) throw new MissingEnvironmentVariablesError(Array.from(missing));

  // @ts-expect-error Strictly typed.
  return res as unknown as {
    [K in T[number] as K extends `${infer Name}?` ? Name : K]: K extends `${string}?`
      ? string | null
      : string;
  };
};

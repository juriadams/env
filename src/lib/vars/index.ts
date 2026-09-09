import { InvalidEnvironmentError, MissingEnvironmentVariablesError } from "@/lib/errors";
import { IS_OPTIONAL } from "@/lib/optional";

type Env = Record<string, string | undefined>;

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
 * const env = parse([
 *   'S3_ACCESS_KEY_ID',
 *   'S3_SECRET_ACCESS_KEY',
 *   optional('PORT'),
 * ]);
 * ```
 *
 * @param keys List of environment variable keys to parse.
 *
 * @returns Typed object containing the parsed environment variables.
 */
export const vars = <const T extends ReadonlyArray<string>>(
  keys: T,
): {
  [K in T[number] as K extends `${infer Name}?` ? Name : K]: K extends `${string}?`
    ? string | null
    : string;
} => {
  const env = resolveEnv();

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

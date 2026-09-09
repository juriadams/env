import { MissingEnvironmentVariablesError } from "@/lib/errors";
import { resolve, type Env, type Variable, type VariableDescriptor } from "@/lib/env";

export type ResolveKey<K> = K extends VariableDescriptor<infer N, infer _> ? N : K & string;

export type ResolveValue<K> =
  K extends VariableDescriptor<infer _, infer D>
    ? [D] extends [string]
      ? string
      : string | null
    : string;

/**
 * Reads and ensures the presence of the given environment variables.
 *
 * @example
 * ```ts
 * const env = vars([
 *   'DB_URL',
 *   optional('PORT', '3000'),
 *   optional('HOST'),
 * ]);
 * ```
 *
 * @example
 * ```ts
 * const env = vars([
 *   'DB_URL',
 *   optional('PORT', '3000'),
 *   optional('HOST'),
 * ], {
 *   env: process.env,
 * });
 * ```
 *
 * @param keys List of environment variable keys to parse.
 * @param opts Optional configuration. Pass `env` to read from a custom object
 *   instead of the process environment.
 *
 * @returns Typed object containing the parsed environment variables.
 *
 * @throws `InvalidEnvironmentError` if the environment cannot be resolved.
 * @throws `MissingEnvironmentVariablesError` if any of the required variables
 *   are missing.
 */
export const vars = <const T extends ReadonlyArray<Variable>>(
  keys: T,
  opts?: {
    /**
     * Custom environment object to read from.
     *
     * When omitted (or `null`/`undefined`), falls back to `import.meta.env`
     * or `process.env`.
     */
    env?: Env | null;
  },
): { [K in T[number] as ResolveKey<K>]: ResolveValue<K> } => {
  const env = opts?.env ?? resolve();

  const res: Record<string, string | null> = {};
  const missing = new Set<string>();

  for (const raw of keys) {
    if (typeof raw === "string") {
      const value = env[raw];

      if (!value) missing.add(raw);

      res[raw] = value ?? null;
      continue;
    }

    const value = env[raw.key];
    res[raw.key] = value ?? raw.default;
  }

  if (missing.size > 0) throw new MissingEnvironmentVariablesError(Array.from(missing));

  return res as unknown as { [K in T[number] as ResolveKey<K>]: ResolveValue<K> };
};

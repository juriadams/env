import { InvalidEnvironmentError } from '../error';

/**
 * Parses environment variables from the `import.meta.env` object.
 *
 * @example
 * ```ts
 * const env = parse([
 *   'S3_ACCESS_KEY_ID',
 *   'S3_SECRET_ACCESS_KEY',
 *   optional('PORT'),
 * ] as const);
 * ```
 *
 * @param keys List of environment variable keys to parse.
 *
 * @returns Typed object containing the parsed environment variables.
 */
export const vars = <T extends ReadonlyArray<string>>(
  keys: T,
): {
  [K in T[number] as K extends `?${infer Name}?` ? Name : K]: K extends `?${string}?`
    ? string | null
    : string;
} => {
  const res: Record<string, string | null> = {};
  const missing = new Set<string>();

  for (const raw of keys) {
    const key = raw.replaceAll('?', '');
    const optional = raw.startsWith('?') && raw.endsWith('?');
    const value = import.meta.env[key];

    if (!(value || optional)) missing.add(key);

    res[key] = value ?? null;
  }

  if (missing.size > 0) throw new InvalidEnvironmentError(Array.from(missing));

  // @ts-expect-error Strictly typed.
  return res as unknown as {
    [K in T[number] as K extends `?${infer Name}?` ? Name : K]: K extends `?${string}?`
      ? string | null
      : string;
  };
};

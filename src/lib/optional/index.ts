/**
 * Regular expression determining whether an environment variable is optional.
 *
 * Matches keys produced by `optional('NAME')` → `NAME?`.
 */
export const IS_OPTIONAL = /^(.+)\?$/;

/**
 * Marks an environment variable as optional.
 *
 * @example
 * ```ts
 * const env = parse([
 *   optional('PORT'),
 * ]);
 * ```
 *
 * @param name Name of the environment variable to mark as optional.
 *
 * @returns String literal with a trailing `?`, e.g. `'PORT'` → `'PORT?'`.
 */
export const optional = <T extends string>(name: T) => `${name}?` as const;

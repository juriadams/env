/**
 * Mark an environment variable as optional.
 *
 * @example
 * ```ts
 * const env = parse([
 *   optional('PORT'),
 * ] as const);
 * ```
 *
 * @param name Name of the environment variable to mark as optional.
 *
 * @returns Environment variable marked as optional.
 */
export const optional = <T extends string>(name: T) => `?${name}?` as const;

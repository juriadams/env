import type { VariableDescriptor } from "@/lib/env";

/**
 * Marks an environment variable as optional.
 *
 * @example
 * ```ts
 * const env = vars([
 *   optional('DB_URL'),
 *   optional('PORT', '3000'),
 * ]);
 * ```
 *
 * @param key Key of the environment variable.
 * @param def Optional default value to fall back to. `undefined` collapses to `null`.
 *
 * @returns `VariableDescriptor` to be consumed by `vars`.
 */
export function optional<T extends string>(key: T): VariableDescriptor<T, null>;
export function optional<T extends string>(
  key: T,
  def: undefined,
): VariableDescriptor<T, null>;
export function optional<T extends string>(
  key: T,
  def: null,
): VariableDescriptor<T, null>;
export function optional<T extends string, D extends string>(
  key: T,
  def: D,
): VariableDescriptor<T, D>;
export function optional<T extends string>(
  key: T,
  def?: string | null,
): VariableDescriptor<T, string | null> {
  return { key, default: def ?? null };
}

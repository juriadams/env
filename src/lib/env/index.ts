import { InvalidEnvironmentError } from "@/index";

/**
 * Shape of a process environment.
 */
export type Env = Record<string, string | undefined>;

/**
 * Descriptor for an environment variable.
 *
 * Contains the `key` and an optional `default` value.
 */
export type VariableDescriptor<
  T extends string = string,
  D extends string | null = null,
> = {
  readonly key: T;
  readonly default: D;
};

/**
 * Accepted variable format for `vars`.
 */
export type Variable = string | VariableDescriptor<string, string | null>;

/**
 * Utility to resolve the appropriate environment of the current process.
 *
 * @returns `Env` object.
 *
 * @throws `InvalidEnvironmentError` if the environment cannot be resolved.
 */
export const resolve = (): Env => {
  if ("env" in import.meta)
    return (import.meta as ImportMeta & { env: Env }).env;
  if (typeof process !== "undefined" && process.env) return process.env;

  throw new InvalidEnvironmentError(
    "Unable to resolve process environment, both `import.meta.env` and `process.env` are inaccessible",
  );
};

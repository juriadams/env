import { afterEach, describe, expect, test } from "bun:test";
import { MissingEnvironmentVariablesError } from "@/lib/errors";
import { optional } from "@/lib/optional";
import { vars } from "@/lib/vars/index.ts";

const EXAMPLE_ENV_VAR = "EXAMPLE_KEY";

afterEach(() => {
  delete process.env[EXAMPLE_ENV_VAR];
});

describe("vars", () => {
  test("required present", () => {
    const value = crypto.randomUUID();

    process.env[EXAMPLE_ENV_VAR] = value;

    expect(vars([EXAMPLE_ENV_VAR])).toEqual({ [EXAMPLE_ENV_VAR]: value });
  });

  test("required missing", () => {
    expect(() => vars([EXAMPLE_ENV_VAR])).toThrow(
      MissingEnvironmentVariablesError,
    );

    try {
      vars([EXAMPLE_ENV_VAR]);
    } catch (err) {
      expect(err).toBeInstanceOf(MissingEnvironmentVariablesError);

      expect((err as MissingEnvironmentVariablesError).vars).toContain(
        EXAMPLE_ENV_VAR,
      );
    }
  });

  test("optional present", () => {
    const value = crypto.randomUUID();

    process.env[EXAMPLE_ENV_VAR] = value;

    expect(vars([optional(EXAMPLE_ENV_VAR)])).toEqual({
      [EXAMPLE_ENV_VAR]: value,
    });
  });

  test("optional present (ignores default)", () => {
    expect(
      vars([optional(EXAMPLE_ENV_VAR, "3000")], {
        env: { [EXAMPLE_ENV_VAR]: "8080" },
      }),
    ).toEqual({ [EXAMPLE_ENV_VAR]: "8080" });
  });

  test("optional missing", () => {
    expect(vars([optional(EXAMPLE_ENV_VAR)])).toEqual({
      [EXAMPLE_ENV_VAR]: null,
    });
  });

  test("optional missing (with default)", () => {
    expect(vars([optional(EXAMPLE_ENV_VAR, "3000")], { env: {} })).toEqual({
      [EXAMPLE_ENV_VAR]: "3000",
    });
    expect(vars([optional(EXAMPLE_ENV_VAR, null)], { env: {} })).toEqual({
      [EXAMPLE_ENV_VAR]: null,
    });
  });

  test("custom env", () => {
    const value = crypto.randomUUID();

    expect(
      vars([EXAMPLE_ENV_VAR], { env: { [EXAMPLE_ENV_VAR]: value } }),
    ).toEqual({
      [EXAMPLE_ENV_VAR]: value,
    });

    expect(vars([optional(EXAMPLE_ENV_VAR)], { env: {} })).toEqual({
      [EXAMPLE_ENV_VAR]: null,
    });

    expect(() => vars([EXAMPLE_ENV_VAR], { env: {} })).toThrow(
      MissingEnvironmentVariablesError,
    );

    // Custom env must not fall through to process.env for missing keys.
    process.env[EXAMPLE_ENV_VAR] = "from-process";
    expect(() => vars([EXAMPLE_ENV_VAR], { env: {} })).toThrow(
      MissingEnvironmentVariablesError,
    );
  });
});

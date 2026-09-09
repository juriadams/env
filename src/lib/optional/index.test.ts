import { describe, expect, test } from "bun:test";
import { optional } from "@/lib/optional/index.ts";

const EXAMPLE_ENV_VAR = "EXAMPLE_KEY";

describe("optional", () => {
  test("mark as optional", () => {
    expect(optional(EXAMPLE_ENV_VAR)).toEqual({
      key: EXAMPLE_ENV_VAR,
      default: null,
    });
  });

  test("mark as optional (with default)", () => {
    expect(optional(EXAMPLE_ENV_VAR, "3000")).toEqual({
      key: EXAMPLE_ENV_VAR,
      default: "3000",
    });

    expect(optional(EXAMPLE_ENV_VAR, null)).toEqual({
      key: EXAMPLE_ENV_VAR,
      default: null,
    });

    expect(optional(EXAMPLE_ENV_VAR, undefined)).toEqual({
      key: EXAMPLE_ENV_VAR,
      default: null,
    });
  });
});

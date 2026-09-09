import { describe, expect, test } from "bun:test";
import { IS_OPTIONAL, optional } from "@/lib/optional/index.ts";

const EXAMPLE_ENV_VAR = "EXAMPLE_KEY";

describe("optional", () => {
  test("mark as optional", () => {
    expect(optional(EXAMPLE_ENV_VAR)).toBe(`${EXAMPLE_ENV_VAR}?`);
  });

  test("infer optional (regex)", () => {
    expect(IS_OPTIONAL.exec(`${EXAMPLE_ENV_VAR}?`)?.[1]).toBe(EXAMPLE_ENV_VAR);
    expect(IS_OPTIONAL.exec(EXAMPLE_ENV_VAR)).toBeNull();
  });
});

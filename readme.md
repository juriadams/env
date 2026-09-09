# `@juriadams/env`

[![Validate](https://github.com/juriadams/env/actions/workflows/validate.yml/badge.svg)](https://github.com/juriadams/env/actions/workflows/validate.yml)
[![npm version](https://img.shields.io/npm/v/@juriadams/env)](https://www.npmjs.com/package/@juriadams/env)
[![bundle size](https://img.shields.io/bundlejs/size/@juriadams/env)](https://bundlejs.com/?q=@juriadams/env)

A tiny, native, type-safe library for reading and validating environment variables, optimized for Bun, Workers, and Node.

Reads from `import.meta.env` when available (Workers, Bun, Deno, Vite, …) and falls back to `process.env` (Node, legacy runtimes, …). An optional custom environment object can also be passed.

## Installation

```bash
bun add @juriadams/env
```

### Usage

#### Basic Usage

```ts
import { vars, optional } from "@juriadams/env";

const env = vars(["DB_URL", optional("PORT")]);

// `env` is inferred as: { DB_URL: string; PORT: string | null }
```

`optional("PORT")` marks a key as optional by appending `?` (`"PORT?"`). Missing optional values resolve to `null`.

If one or more required environment variables are missing, a `MissingEnvironmentVariablesError` is thrown:

```ts
import { vars, MissingEnvironmentVariablesError } from "@juriadams/env";

try {
  const env = vars(["API_URL"]);
} catch (err) {
  if (err instanceof MissingEnvironmentVariablesError) console.debug({ missing: err.vars });

  throw err;
}
```

#### Custom Environment

Pass `opts.env` to read from a custom object instead of the process environment. Useful for tests, overrides, or non-standard runtimes:

```ts
import { vars, optional } from "@juriadams/env";

const CUSTOM_ENV = {
  DB_URL: "postgres://localhost/app".
};

const env = vars(["DB_URL", optional("PORT")], {
  env: CUSTOM_ENV,
});

// { DB_URL: string; PORT: null }
```

When `env` is omitted (or `null`/`undefined`), `vars` resolves the environment as usual (`import.meta.env` and `process.env`).

## Lifecycle

### Develop

```bash
bun dev
```

### Test

```bash
bun test
```

### Build

```bash
bun run build
```

### Typecheck

```bash
bun typecheck
```

### Lint / Format

```bash
bun lint
bun format
```

# `@juriadams/env`

A simple and type-safe way to read and validate environment variables.

Reads from `import.meta.env` when available (Workers, Bun, Vite, …), otherwise falls back to `process.env` (Node, NestJS, …).

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
bun run dev
```

### Test

```bash
bun run test
```

### Build

```bash
bun run build
```

### Typecheck

```bash
bun run typecheck
```

### Lint / Format

```bash
bun run lint
bun run format
```

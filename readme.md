# `@juriadams/env`

A simple and type-safe way to validate environment variables.

## Installation

```bash
bun add @juriadams/env
```

### Usage

```ts
import { vars, optional } from '@juriadams/env';

const env = vars([
  'OPENAI_API_KEY',
  optional('PORT'),
] as const);

// env is inferred as: { OPENAI_API_KEY: string; PORT: string | null }
```

If one or more required environment variables are missing, an `InvalidEnvironmentError` is thrown.

You can catch and handle it using `instanceof`:

```ts
import { vars, InvalidEnvironmentError } from '@juriadams/env';

try {
  const env = vars(['OPENAI_API_KEY'] as const);
} catch (err) {
  if (err instanceof InvalidEnvironmentError)
    console.debug({ missing: err.missing });

  throw err;
}
```

## Lifecycle

### Develop

```bash
bun run dev
```

### Build

```bash
bun run build
```

### Types

```bash
bun run typecheck
```

### Test

```bash
bun run test
```
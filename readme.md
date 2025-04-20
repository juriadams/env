# `@juriadams/env`

A simple and type-safe way to validate environment variables.

## Install

```bash
bun add @juriadams/env
```

```ts
import { vars, optional } from '@juriadams/env';

const env = vars([
  'OPENAI_API_KEY',
  optional('PORT'),
] as const);

//    ^? const env: { OPENAI_API_KEY: string, PORT: string | null }
```

In case one or more of the configured environment variables is missing, an `InvalidEnvironmentError` is thrown. This error cann be matched via `instanceof` :

```ts
import { vars, InvalidEnvironmentError } from '@juriadams/env';

try {
  const env = vars(['OPENAI_API_KEY'] as const);
} catch (err
  if (err instanceof InvalidEnvironmentError)
    console.debug({ missing: err.missing });

  throw err;
)
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
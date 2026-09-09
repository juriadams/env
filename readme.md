# `@juriadams/env`

[![Validate](https://github.com/juriadams/env/actions/workflows/validate.yml/badge.svg)](https://github.com/juriadams/env/actions/workflows/validate.yml)
[![npm version](https://img.shields.io/npm/v/@juriadams/env)](https://www.npmjs.com/package/@juriadams/env)
[![bundle size](https://img.shields.io/bundlejs/size/@juriadams/env)](https://bundlejs.com/?q=@juriadams/env)

A tiny, native, type-safe library for reading and validating environment variables, optimized for Workers, Bun, and Node.

## Installation

```bash
bun add @juriadams/env
```

## Usage

```ts
import { vars, optional } from "@juriadams/env";

const env = vars([
  "DB_URL",
  "OPENAI_API_KEY",
  optional("SENTRY_DSN"),
  optional("PORT", "3000"),
]);

type Env = typeof env;
// {
//   DB_URL: string;
//   OPENAI_API_KEY: string;
//   SENTRY_DSN: string | null;
//   PORT: string | "3000";
// }
```

#### Optional Variables

`optional("PORT")` marks a key as optional. A default value can be provided via `optional("PORT", "3000")`, the type of which is strictly inferred.

> [!IMPORTANT]  
> If one or more expected environment variables are missing, a `MissingEnvironmentVariablesError` is thrown.

#### Custom Environment

By default, `vars` reads from `import.meta.env` and `process.env` (in order). A custom environment to read from can be provided via `vars([ ... ], { env: process.env })`.

> [!IMPORTANT]  
> If no environment can be resolved, an `InvalidEnvironmentError` is thrown.

## Lifecycle

#### Develop

```bash
bun dev
```

#### Test

```bash
bun test
```

#### Build

```bash
bun run build
```

#### Typecheck

```bash
bun typecheck
```

#### Lint / Format

```bash
bun lint
bun format
```

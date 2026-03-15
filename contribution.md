# Contributing

## Before You Start

- Use `Node.js 22+`.
- Use `pnpm` (via Corepack is recommended).
- Install dependencies with:

```bash
pnpm install
```

## Development Workflow

```bash
pnpm dev
```

Run tests before pushing:

```bash
pnpm test
```

You can also run targeted suites:

```bash
pnpm test:unit
pnpm test:nuxt
pnpm test:coverage -- --run
```

## Commit Convention

This repository enforces **Conventional Commits** via `commitlint` and Husky:

- `feat: ...`
- `fix: ...`
- `docs: ...`
- `refactor: ...`
- `test: ...`
- `chore: ...`
- `ci: ...`
- `build: ...`
- `perf: ...`

Use the interactive commit helper:

```bash
pnpm commit
```

Local hooks:

- `pre-push`: runs `pnpm test`
- `commit-msg`: runs `pnpm exec commitlint --edit "$1"`

If your commit message format is invalid, the commit will be rejected.

## PR Guidelines

- Keep PRs focused and small.
- Include tests for behavior changes.
- Update documentation for user-facing changes.
- Ensure CI passes.

## Antfu Guides

For practical OSS contribution style and workflow references:

- https://github.com/antfu/contribute
- https://antfu.me

---
name: ci-checks
description: Run CI-aligned checks for this workshop repository (backend lint/tests, frontend lint/tests/build, markdown lint).
---

# CI Checks

Run from repository root unless noted.

## Backend + MCP

```powershell
uv sync --all-groups
uv run ruff check src/backend src/mcp-server
uv run pytest -q
```

## Frontend

```powershell
cd src/frontend
npm ci
npm run lint
npm test
npm run build
```

## Documentation lint

```powershell
npx --yes markdownlint-cli2 "README.md" "docs/**/*.md" "sessions/**/*.md" ".github/**/*.md" "src/**/*.md"
```

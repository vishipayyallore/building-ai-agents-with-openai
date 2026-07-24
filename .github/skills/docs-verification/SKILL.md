---
name: docs-verification
description: Verify documentation correctness for paths, commands, links, API references, and consistency with actual repository behavior.
---

# Docs Verification

## What to verify

1. Links resolve to existing files.
2. Commands run from the documented working directory.
3. API route references match backend implementation.
4. Version references match `pyproject.toml` and `src/frontend/package.json` reality.
5. Folder trees in docs reflect current repository structure.

## Common drift checks

- `npm run dev` must be shown from `src/frontend`.
- Backend launch should use `uv run uvicorn app.main:app --app-dir src/backend`.
- Avoid references to non-existent `docs/` pages from other repos.

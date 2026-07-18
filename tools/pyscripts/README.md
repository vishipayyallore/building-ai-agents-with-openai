# Python tools

**Location:** `tools/pyscripts/`

No Python helper scripts are shipped in this lean workshop repo yet. This folder
is reserved for future utilities (for example content conversion or repo-health
checks).

Until scripts land here:

- Use root `README.md` and `docs/02-how-to-execute.md` for setup and run.
- Use `uv run pytest` / `uv run ruff check` for backend/MCP quality checks.
- Optional local staging under `source-material/` is **not** part of the public
  tree; add `source-material/` to `.gitignore` before dropping raw assets, and
  synthesize into `docs/` / `sessions/` rather than committing source dumps.

Related:

- [`.github/rules/07_source_material_rules.mdc`](../../.github/rules/07_source_material_rules.mdc)
- [PowerShell helpers](../psscripts/README.md)

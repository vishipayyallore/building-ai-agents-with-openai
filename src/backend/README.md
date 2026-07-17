# Backend (Demo 1)

FastAPI app under `app/` — run from the **repository root** (single root `pyproject.toml`).

```powershell
# From repo root
uv sync --all-groups
uv run uvicorn app.main:app --app-dir src/backend --reload --port 8000
```

Python package: `app.agent_runtime` (folder `app/agent_runtime/`).

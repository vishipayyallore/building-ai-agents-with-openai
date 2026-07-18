# Backend (Demo 1)

FastAPI app under `app/` — run from the **repository root** (single root `pyproject.toml`).

```powershell
# From repo root
uv sync
uv run uvicorn app.main:app --app-dir src/backend --reload --port 8000
```

| URL | Purpose |
| --- | ------- |
| [http://127.0.0.1:8000/](http://127.0.0.1:8000/) | API home (discovery JSON) |
| [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) | Swagger UI |
| [http://127.0.0.1:8000/openapi.json](http://127.0.0.1:8000/openapi.json) | OpenAPI 3.1 schema |
| [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc) | ReDoc |
| [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health) | Health probe |

Python package: `app.agent_runtime` (folder `app/agent_runtime/`).

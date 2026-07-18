# How To Execute

This guide explains how to run the Demo 1 application in this repository.

## Related docs

- [README.md](../README.md)
- [01-folder-structure.md](./01-folder-structure.md)

## Prerequisites

| Tool | Version |
| ---- | ------- |
| Python | 3.13+ |
| Node.js | 20 LTS |
| [uv](https://docs.astral.sh/uv/) | latest |
| Git | 2.x |

## 1. Clone and configure

From your terminal:

```powershell
git clone https://github.com/vishipayyallore/building-ai-agents-with-openai.git
cd building-ai-agents-with-openai
copy .env.example .env
```

Edit `.env` and set at least:

```text
OPENAI_API_KEY=sk-...
```

`OPENWEATHER_API_KEY` is optional. When set in `.env`, the backend loads it and
passes it to the MCP weather tool; when unset, weather responses use demo data.

## 2. Install dependencies

From repository root:

```powershell
uv sync --all-groups
```

Install frontend packages:

```powershell
cd src\frontend
npm install
cd ..\..
```

## 3. Start the application

Use two terminals.

### Terminal 1: backend

From repository root:

```powershell
uv run uvicorn app.main:app --app-dir src/backend --reload --port 8000
```

### Terminal 2: frontend

```powershell
cd src\frontend
npm run dev
```

Open:

- Home: [http://localhost:5173/](http://localhost:5173/)
- Level 2 dashboard: [http://localhost:5173/demo/level-2](http://localhost:5173/demo/level-2)

## 4. Verify quickly

- Health endpoint: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)
- Demo prompt 1: What is 15 * 23?
- Demo prompt 2: What's the weather in Seattle?

## 5. MCP server behavior

Do not start `src/mcp-server` in a separate terminal for normal app usage.
The backend starts MCP automatically via stdio during `POST /api/chat` requests.

Optional manual MCP smoke test (repository root):

```powershell
$env:PYTHONPATH = "src/mcp-server"
uv run python src/mcp-server/server.py
```

## 6. Stop services

Press `Ctrl+C` in both terminals.

## Troubleshooting

- If `npm run dev` fails with ENOENT, run it from `src/frontend` (not repo root).
- If backend fails due to API key, ensure `.env` exists at repository root with `OPENAI_API_KEY`.

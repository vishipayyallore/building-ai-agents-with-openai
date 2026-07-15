# Developer Setup — Getting Started (Demo 1)

Complete this **before** the July session so the full 45 minutes can focus on the agent, not environment setup.

## Prerequisites

| Tool | Version | Install |
| ---- | ------- | ------- |
| Python | 3.13+ | [python.org](https://www.python.org/downloads/) |
| Node.js | 20 LTS | [nodejs.org](https://nodejs.org/) |
| uv | latest | `powershell -c "irm https://astral.sh/uv/install.ps1 \| iex"` |
| Git | 2.x | [git-scm.com](https://git-scm.com/) |

## 1. Clone and configure

```powershell
git clone https://github.com/vishipayyallore/agentic-engineering-in-practice.git
cd agentic-engineering-in-practice
copy .env.example .env
```

Edit `.env` and set at minimum:

```text
OPENAI_API_KEY=sk-...
```

AWS Bedrock and Azure OpenAI settings are present in `.env.example` for the provider journey. Session 3 uses OpenAI plus AWS Bedrock for the live Provider Pattern refactor; Azure OpenAI is an optional provider extension or take-home lab. Demo 1 uses OpenAI directly so the first session can focus on the agent loop and MCP tools.

`OPENWEATHER_API_KEY` is optional — the weather tool returns demo data when unset.

## 2. Install dependencies

```powershell
# From repository root (single pyproject.toml)
uv sync --all-groups

cd src\frontend
npm install
```

## 3. Run Demo 1 (two terminals)

**Terminal 1 — Backend** (from repo root)

```powershell
uv run uvicorn app.main:app --app-dir src/backend --reload --port 8000
```

**Terminal 2 — Frontend**

```powershell
cd src\frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

> The MCP server starts automatically via stdio on each `POST /api/chat` request — you do not run it in a separate terminal for Demo 1.

## 4. Verify setup

| Check | How |
| ----- | --- |
| Backend health | [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health) → `{"status":"ok","demo":"1","maturityLevel":2,"maturityName":"PROXY_AGENT"}` |
| Calculator demo | Prompt: `What is 15 * 23?` |
| Weather demo | Prompt: `What's the weather in Seattle?` |
| Level 1 baseline | Open `/demo/level-1`, prompt `What is 15 * 23?` — text only, no Decision Timeline |
| Level 2 agent | Open `/demo/level-2`, same prompt — watch `calculate` in the Decision Timeline |
| Decision Timeline | Ordered events appear together after each Level 2 response (Demo 1 is not streamed) |
| Tool Registry | Used tools end at Success; the event stream represents Available → Selected → Running → Success |

## 5. Run tests (optional)

```powershell
# From repository root
uv run pytest -q
```

## Troubleshooting

| Issue | Fix |
| ----- | --- |
| `OPENAI_API_KEY is not set` | Copy `.env.example` → `.env` at repo root |
| OpenAI auth error | Confirm `OPENAI_API_KEY` is set and the account has access to the configured model |
| CORS errors | Ensure backend runs on port 8000 and frontend uses Vite proxy |
| MCP / uv errors | Run `uv sync --all-groups` from the **repository root** |
| `uv` not found | Install uv and restart the terminal |

## Next

- Topic guides: [04-introduction.md](./04-introduction.md) → [08-tool-calling.md](./08-tool-calling.md) (Demo 1 concepts)
- Master plan: [02-master-plan.md](./02-master-plan.md)
- Dashboard contract: [13-observability-dashboard.md](./13-observability-dashboard.md)
- Presentation notes: [presentation/demo-01/README.md](../presentation/demo-01/README.md)
- Session 1 course package: [sessions/session-01-build-your-first-agent/README.md](../sessions/session-01-build-your-first-agent/README.md)
- Release commands: [docs/16-releases.md](./16-releases.md)

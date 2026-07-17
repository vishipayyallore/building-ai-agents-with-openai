# Building AI Agents with OpenAI

![Program](https://img.shields.io/badge/M.Sc-Data%20Science%20%26%20AI-8ecae6)
![Status](https://img.shields.io/badge/Status-Active-b7e4c7)
![Python](https://img.shields.io/badge/Python-3.12-a0c4ff)
![Jupyter](https://img.shields.io/badge/Jupyter-Active-ffd6a5)
![Focus](https://img.shields.io/badge/Focus-Foundations%20%26%20Algorithms-cdb4db)
![Track](https://img.shields.io/badge/Track-AI%20Agents-90e0ef)
![Workshop](https://img.shields.io/badge/Workshop-Live%20Sessions-ffadad)
![Level](https://img.shields.io/badge/Level-Beginner%20to%20Advanced-d8f3dc)

Hands-on workshop repo for **Swamy's Tech Skills Academy**: one evolving app (React + FastAPI + OpenAI Agent SDK + MCP) taught across live sessions.

This repository is the **Teaching Product** — clone it, run today's demo, follow the released session guide. Application code is published from a private Engineering Organization; do not develop the app here.

---

## How to run today's demo

### Prerequisites

| Tool | Version |
| ---- | ------- |
| Python | 3.13+ |
| Node.js | 20 LTS |
| [uv](https://docs.astral.sh/uv/) | latest |
| Git | 2.x |

### 1. Clone and configure

```powershell
git clone https://github.com/vishipayyallore/building-ai-agents-with-openai.git
cd building-ai-agents-with-openai
copy .env.example .env
```

Edit `.env` and set at minimum:

```text
OPENAI_API_KEY=sk-...
```

`OPENWEATHER_API_KEY` is optional — the weather tool returns demo data when unset.

### 2. Install

```powershell
uv sync --all-groups

cd src\frontend
npm install
cd ..\..
```

### 3. Run (two terminals)

**Terminal 1 — Backend** (from repo root)

```powershell
uv run uvicorn app.main:app --app-dir src/backend --reload --port 8000
```

**Terminal 2 — Frontend**

```powershell
cd src\frontend
npm run dev
```

Open [http://localhost:5173/demo/level-2](http://localhost:5173/demo/level-2)

> The MCP server starts automatically via stdio on each `POST /api/chat`. Do **not** start `src/mcp-server` in a separate terminal.

### 4. Try it

- `What is 15 * 23?`
- `What's the weather in Seattle?`

Health check: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

---

## What's in this repo

```text
building-ai-agents-with-openai/
├── README.md          ← product homepage (this file)
├── src/               # Latest released application
├── sessions/          # Released session guides only
├── LICENSE
├── .env.example
├── pyproject.toml
└── uv.lock
```

`main` always tracks the **latest stable release**. Earlier milestones:

```bash
git fetch --tags
git checkout v1.0-build-your-first-agent
```

---

## Session roadmap

| Session | Status |
| ------- | :----: |
| Session 1 – Build Your First AI Agent | ✅ Available |
| Session 2 – Stateful Agents | 🚧 Coming Soon |
| Session 3 – Multi-Provider Agents | 🚧 Coming Soon |
| Session 4 – Context Engineering | 🚧 Coming Soon |
| Session 5 – Knowledge-Driven Agents | 🚧 Coming Soon |
| Session 6 – Multi-Agent Engineering | 🚧 Coming Soon |
| Session 7 – Production Foundations | 🚧 Coming Soon |
| Session 8 – Evaluation & Guardrails | 🚧 Coming Soon |
| Session 9 – Local Capstone | 🚧 Coming Soon |
| Sessions 10–15 – Platform / enterprise track | 🚧 Coming Soon |

### Session 1 — Build Your First AI Agent

**Tag:** `v1.0-build-your-first-agent`

Guide: [sessions/session-01-build-your-first-agent/README.md](sessions/session-01-build-your-first-agent/README.md)

---

## Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Python 3.13, FastAPI, OpenAI Agent SDK, Pydantic
- **Tools:** Model Context Protocol (MCP), FastMCP

---

## License

MIT — see [LICENSE](LICENSE).

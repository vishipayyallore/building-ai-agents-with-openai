# Building AI Agents with OpenAI

![Program](https://img.shields.io/badge/M.Sc-Data%20Science%20%26%20AI-8ecae6)
![Status](https://img.shields.io/badge/Status-Active-b7e4c7)
![Python](https://img.shields.io/badge/Python-3.13-a0c4ff)
![Jupyter](https://img.shields.io/badge/Jupyter-Active-ffd6a5)
![Focus](https://img.shields.io/badge/Focus-Foundations%20%26%20Algorithms-cdb4db)
![Track](https://img.shields.io/badge/Track-AI%20Agents-90e0ef)
![Workshop](https://img.shields.io/badge/Workshop-Live%20Sessions-ffadad)
![Level](https://img.shields.io/badge/Level-Beginner%20to%20Advanced-d8f3dc)

This is the hands-on workshop repository for **Swamy's Tech Skills Academy**. You will learn through one evolving app (React + FastAPI + OpenAI Agent SDK + MCP) across live sessions.

Use this as the **Teaching Product**: clone it, run the current demo, and follow the published session guides.

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

## Docs

- [docs/01-folder-structure.md](docs/01-folder-structure.md)
- [docs/02-how-to-execute.md](docs/02-how-to-execute.md)

---

## How to run today's demo

Use the full execution guide:

- [docs/02-how-to-execute.md](docs/02-how-to-execute.md)

Quick links:

- Level 2 dashboard: [http://localhost:5173/demo/level-2](http://localhost:5173/demo/level-2)
- Health check: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

---

## What's in this repo

```text
building-ai-agents-with-openai/
├── README.md          ← product homepage (this file)
├── docs/              # Supporting repository docs
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

## Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Python 3.13, FastAPI, OpenAI Agent SDK, Pydantic
- **Tools:** Model Context Protocol (MCP), FastMCP

---

## License

MIT — see [LICENSE](LICENSE).

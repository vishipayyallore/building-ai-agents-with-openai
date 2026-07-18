# Session 1 — Build Your First AI Agent

This folder is a **learning package**. It explains the application. It does **not** contain a copy of the application.

| First-class concern | Location |
| ------------------- | -------- |
| The application | Repository root [`src/`](../../src/) |
| This course session | This folder |
| How to run (Teaching Product) | Root [`README.md`](../../README.md) |

Binding to app state: [version.md](./version.md) · Intended release tag: `v1.0-build-your-first-agent` (create when publishing)

## Objectives

- Understand Agent Runtime vs a plain LLM call (Level 1 vs Level 2)
- Run the React + FastAPI + MCP stack locally
- See tool calling via calculator and weather MCP tools
- Observe Decision Timeline events on the Agent Dashboard

## Architecture

Session 1 delivers Home + Level 1 (direct LLM) + Level 2 (Proxy Agent + MCP) in the **one** evolving application under `src/`:

- `src/frontend` — Agent Dashboard (Home, Level 1, Level 2)
- `src/backend` — FastAPI + OpenAI Agent SDK
- `src/mcp-server` — calculator + weather tools (spawned by the backend)

## Prerequisites

- Python 3.13+, Node.js 20 LTS, uv, Git
- OpenAI API key in `.env` (see root README)

## Repository tag

| | |
| --- | --- |
| **Intended release tag** | `v1.0-build-your-first-agent` (not published yet) |
| **Pin details** | [version.md](./version.md) |

## How to checkout

```bash
git checkout main
# After the release tag is published:
# git fetch --tags && git checkout v1.0-build-your-first-agent
```

## How to run

The application lives at the repo root — not inside this session folder.

1. Follow the root [README.md](../../README.md) (clone → `.env` → `uv sync` → backend + frontend)
2. Start **backend** and **frontend** only — MCP is spawned by the backend on each `POST /api/chat` (do not start `src/mcp-server` separately)
3. Open [http://localhost:5173/demo/level-2](http://localhost:5173/demo/level-2)
4. Walk Level 1 and Level 2 using the presenter script: [speaker-notes.md](./speaker-notes.md)

Try:

- `What is 15 * 23?`
- `What's the weather in Seattle?`

## Walkthrough

Live presenter script: [speaker-notes.md](./speaker-notes.md)

## Folder structure (this package)

```text
session-01-build-your-first-agent/
├── README.md           # Session guide
├── version.md          # Tag binding
├── speaker-notes.md    # Live presenter / demo script
└── release-notes.md
```

No `src/` here — keep the package lightweight.

## Exercises

Deferred until the club exercises are authored (no empty `exercises/` scaffold).

## Next session

Session 2 — Stateful Agents · tag `v2.0-stateful-agents` (package lands when that milestone is packaged).

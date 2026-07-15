# Session 1 — Build Your First AI Agent

This folder is a **learning package**. It explains the application. It does **not** contain a copy of the application.

| First-class concern | Location |
| ------------------- | -------- |
| The application | Repository root [`src/`](../../src/) |
| This course session | This folder |
| Global architecture & governance | [`docs/`](../../docs/) |

Binding to app state: [version.md](./version.md) · Tags: [ADR-002](../../docs/ADRs/ADR-002-git-tags.md) · Single app: [ADR-001](../../docs/ADRs/ADR-001-single-codebase.md)

## Objectives

- Understand Agent Runtime vs a plain LLM call (Level 1 vs Level 2)
- Run the React + FastAPI + MCP stack locally
- See tool calling via calculator and weather MCP tools
- Observe Decision Timeline events on the Agent Dashboard

## Architecture

Session 1 delivers Home + Level 1 (direct LLM) + Level 2 (Proxy Agent + MCP) in the **one** evolving application under `src/`. Details: [docs/architecture/demo-1-stack.md](../../docs/architecture/demo-1-stack.md).

## Prerequisites

- Python 3.13, Node.js (see [docs/03-getting-started.md](../../docs/03-getting-started.md))
- Concepts: [docs/05-ai-agents.md](../../docs/05-ai-agents.md), [docs/06-openai-agent-sdk.md](../../docs/06-openai-agent-sdk.md), [docs/07-mcp.md](../../docs/07-mcp.md)

## Repository tag

| | |
| --- | --- |
| **Release tag** | `v1.0-build-your-first-agent` |
| **Pin details** | [version.md](./version.md) |

## How to checkout

```bash
git fetch --tags
git checkout v1.0-build-your-first-agent
```

## How to run

The application lives at the repo root — not inside this session folder.

1. Follow [docs/03-getting-started.md](../../docs/03-getting-started.md)
2. Start **backend** and **frontend** only — MCP is spawned by the backend on each `POST /api/chat` (do not start `src/mcp-server` separately)
3. Open [http://localhost:5173/demo/level-2](http://localhost:5173/demo/level-2)
4. Walk Level 1 and Level 2 using the presenter script: [presentation/demo-01/README.md](../../presentation/demo-01/README.md)

## Walkthrough

Live presenter script (until migrated into this package): [presentation/demo-01/README.md](../../presentation/demo-01/README.md)

## Folder structure (this package)

```text
session-01-build-your-first-agent/
├── README.md           # This file — teaches; does not own src/
├── version.md          # Tag binding for this session
├── docs/
├── exercises/
├── solutions/
├── assets/
└── release-notes.md
```

No `src/` here. Presenter materials remain under `presentation/demo-01/` until Layout Freeze Priority 1 ([ADR-008](../../docs/ADRs/ADR-008-product-organization-publishing.md)).

## Exercises

See [exercises/](./exercises/). Solutions (when published) live under [solutions/](./solutions/).

## Further reading

- [docs/08-tool-calling.md](../../docs/08-tool-calling.md)
- [docs/13-observability-dashboard.md](../../docs/13-observability-dashboard.md)

## Next session

Session 2 — Stateful Agents · tag `v2.0-stateful-agents` (package lands when that milestone is packaged).

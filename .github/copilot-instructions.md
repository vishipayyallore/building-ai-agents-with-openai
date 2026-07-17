# GitHub Copilot Instructions for building-ai-agents-with-openai

**Version**: 1.0
**Last Updated**: 2026-07-17
**Repository**: `building-ai-agents-with-openai`

## Purpose

This repository is the public workshop application for live AI-agent sessions.

It contains one evolving app stack:

- React + TypeScript frontend (`src/frontend`)
- FastAPI backend (`src/backend`)
- MCP tool server (`src/mcp-server`)
- Session guides (`sessions/`)

## Working boundaries

- Prefer updates that improve workshop delivery, reliability, and clarity.
- Keep run instructions aligned with actual repo commands and file paths.
- Avoid introducing references to files or folders that do not exist in this repository.

## Canonical structure

- `README.md`: public landing page and quick links
- `docs/`: supporting documentation
- `sessions/`: released session content
- `src/backend`: API + runtime logic + backend tests
- `src/frontend`: web UI + frontend tests
- `src/mcp-server`: MCP tools + MCP tests

## Run commands (PowerShell)

From repo root:

```powershell
uv sync --all-groups
uv run uvicorn app.main:app --app-dir src/backend --reload --port 8000
```

Frontend (second terminal):

```powershell
cd src/frontend
npm install
npm run dev
```

## Quality checks

Backend and MCP:

```powershell
uv run ruff check src/backend src/mcp-server
uv run pytest -q
```

Frontend:

```powershell
cd src/frontend
npm run lint
npm test
npm run build
```

## Documentation expectations

- Keep docs concise and executable.
- Prefer links over duplicated instructions.
- Ensure markdown paths, commands, and API routes are valid.
- Keep tone clear, practical, and workshop-friendly.

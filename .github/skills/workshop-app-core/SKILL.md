---
name: workshop-app-core
description: Core repository context for the workshop app in building-ai-agents-with-openai (frontend, backend, MCP server, sessions, docs).
---

# Workshop App Core Context

Use this skill when changes touch architecture, routes, runtime flow, or cross-service behavior.

## Repository map

- `src/frontend`: React UI (Home, Level 1, Level 2 pages)
- `src/backend`: FastAPI API + agent runtime orchestration
- `src/mcp-server`: MCP tool server used by backend via stdio
- `sessions/`: released session content
- `docs/`: operational and structure documentation
- `config/`: local secrets (`config/.env`); template is root `.env.example`
- `tools/`: helper scripts (not runtime)
- `.github/`: rules, skills, agents, workflows

## Runtime boundaries

- `POST /api/llm`: direct LLM path (Level 1)
- `POST /api/chat`: agent runtime + MCP tools (Level 2)
- `GET /health`: health contract

## Expected outcomes

- Keep frontend/backend contracts consistent.
- Keep docs runnable against current commands.
- Preserve testability and clear workshop behavior.

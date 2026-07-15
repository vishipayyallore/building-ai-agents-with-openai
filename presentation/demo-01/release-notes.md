# Session 1 - Build Your First AI Agent

## Learning objectives

- React Agent Dashboard
- FastAPI backend boundary
- OpenAI Agent SDK orchestration
- MCP tool integration with calculator and weather
- Decision Timeline and Tool Registry visibility

## Features delivered

- Home route with maturity-level entry points
- Level 1 direct LLM route (`/demo/level-1`, `POST /api/llm`)
- Level 2 agent dashboard route (`/demo/level-2`, `POST /api/chat`)
- MCP-backed `calculate` and `get_weather` tools

## Architecture decisions reinforced

- Agent Runtime orchestrates model access and tool access
- Structured timeline events over black-box chat behavior
- Single evolving codebase with milestone tags for replay

## Docs and demo links

- Demo runbook: [presentation/demo-01/README.md](README.md)
- Observability contract: [docs/13-observability-dashboard.md](../../docs/13-observability-dashboard.md)
- Master plan: [docs/02-master-plan.md](../../docs/02-master-plan.md)

## Next session

Session 2 - Stateful Agents (`v2.0-stateful-agents`)

# Repository Folder Structure

This document describes the current folder layout for the teaching-product repository.

## Root layout

```text
building-ai-agents-with-openai/
|-- .env.example
|-- .gitignore
|-- .github/
|   |-- agents/
|   |-- rules/
|   |-- skills/
|   |-- prompts/
|   `-- workflows/
|-- .vscode/
|   `-- settings.json
|-- docs/
|   |-- 01-folder-structure.md
|   |-- 02-how-to-execute.md
|   `-- images/
|       `-- .gitkeep
|-- LICENSE
|-- README.md
|-- pyproject.toml
|-- sessions/
|   `-- session-01-build-your-first-agent/
|       |-- README.md
|       |-- release-notes.md
|       |-- speaker-notes.md
|       `-- version.md
|-- src/
|   |-- backend/
|   |-- frontend/
|   `-- mcp-server/
|-- tools/
|   |-- README.md
|   |-- pyscripts/
|   |   `-- README.md
|   `-- psscripts/
|       |-- README.md
|       |-- RepoConfig.psd1
|       `-- Export-FolderStructure.ps1
`-- uv.lock
```

## Application code

### src/backend

- FastAPI backend entrypoint and API routes.
- Agent runtime implementation (intent inference, timeline events, tool orchestration).
- Backend and runtime tests.

```text
src/backend/
|-- README.md
|-- app/
|   |-- __init__.py
|   |-- config.py
|   |-- main.py
|   |-- agent_runtime/
|   |   |-- __init__.py
|   |   |-- agent.py
|   |   |-- direct_llm.py
|   |   |-- event_bus.py
|   |   |-- instructions.py
|   |   `-- models.py
|   `-- api/
|       |-- __init__.py
|       |-- chat.py
|       `-- llm.py
`-- tests/
    |-- conftest.py
    |-- test_agent_chat_mocked.py
    |-- test_agent_intent.py
    |-- test_api.py
    |-- test_event_bus.py
    |-- test_maturity.py
    |-- test_models_serialization.py
    `-- test_smoke_contract.py
```

### src/frontend

- React + TypeScript dashboard UI.
- Route pages for Home, Level 1 (direct LLM), and Level 2 (agent dashboard).
- Frontend services, hooks, components, and tests.

```text
src/frontend/
|-- index.html
|-- package.json
|-- package-lock.json
|-- eslint.config.js
|-- postcss.config.js
|-- tailwind.config.js
|-- tsconfig.json
|-- tsconfig.app.json
|-- vite.config.ts
|-- public/
|   `-- favicon.png
`-- src/
    |-- App.tsx
    |-- index.css
    |-- main.tsx
    |-- vite-env.d.ts
    |-- components/
    |   |-- DecisionTimeline.tsx
    |   |-- DecisionTimeline.test.tsx
    |   |-- FinalResponse.tsx
    |   |-- Footer.tsx
    |   |-- Header.tsx
    |   |-- Layout.tsx
    |   |-- MaturityContrastPanel.tsx
    |   |-- PromptPanel.tsx
    |   |-- ToolExecution.tsx
    |   |-- ToolRegistry.tsx
    |   `-- UserMenu.tsx
    |-- hooks/
    |   |-- useChat.ts
    |   `-- useDirectLlm.ts
    |-- pages/
    |   |-- HomePage.tsx
    |   |-- HomePage.test.tsx
    |   |-- Level1DemoPage.tsx
    |   `-- Level2DashboardPage.tsx
    |-- services/
    |   |-- api.ts
    |   `-- api.test.ts
    |-- test/
    |   `-- setup.ts
    `-- types/
        `-- decision-event.ts
```

### src/mcp-server

- Standalone MCP tool server process used by the backend agent runtime via stdio.
- Demo tools: calculator and weather.

```text
src/mcp-server/
|-- README.md
|-- server.py
|-- tools/
|   |-- __init__.py
|   |-- calculator.py
|   `-- weather.py
`-- tests/
    |-- test_calculator.py
    `-- test_weather.py
```

## Session content

The `sessions/` folder stores session-specific learning assets and notes.
It does not duplicate application source code.

## Notes

- Frontend build output is intentionally ignored at `src/frontend/dist/`.
- Use the root `README.md` as the primary run/setup guide.
- `tools/` holds optional helper scripts; it is not part of the runtime app.
- `.github/` holds rules, skills, agents, and CI workflows for this workshop repo.

## Related docs

- [README.md](../README.md)
- [02-how-to-execute.md](./02-how-to-execute.md)

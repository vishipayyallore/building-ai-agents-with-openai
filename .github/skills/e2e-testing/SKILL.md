---
name: e2e-testing
description: Smoke test end-to-end workshop behavior (backend up, frontend up, health endpoint, chat endpoints, MCP tool path).
---

# E2E Smoke Testing

## Suggested flow

1. Start backend from repo root.
2. Start frontend from `src/frontend`.
3. Do **not** start MCP separately — the backend spawns it via stdio on `POST /api/chat`.
4. Open `/demo/level-2`.
5. Verify health endpoint returns ok.
6. Run one direct LLM prompt and one MCP-tool prompt.

## Quick checks

- `GET http://127.0.0.1:8000/health`
- `POST /api/llm` works
- `POST /api/chat` works and returns timeline events

## Expected outcome

User can run the workshop demo locally with no undocumented steps.

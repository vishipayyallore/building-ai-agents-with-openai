# ADR-007: Client-Side Routing for Demo 1 (Home + Level 1 + Level 2)

## Status

Accepted

## Context

§4.1 introduces **Agent Maturity Levels**. Demo 1 must teach the contrast between **Level 1 — Direct LLM Interaction** and **Level 2 — Proxy Agent** without implying that raw LLM chat is the same system as the Agent Runtime.

Three implementation options were considered:

| Option | Approach | Trade-off |
| ------ | -------- | --------- |
| **1** | Tab switcher in a single page | Fastest to ship; no shareable URLs; awkward for docs and attendee setup; likely rewritten by Session 3 |
| **2** | `react-router-dom` with three routes in one frontend | Clean URLs; honest API split; scales session-by-session without a portal rewrite |
| **3** | Full demo shell / club portal | Premature — Session 1 scope and design freeze treat this as an Improvement, not a new platform |

Level 1 also required a **separate backend path** (`POST /api/llm` → `direct_llm.py`) so the UI contrast is honest: no MCP, no Decision Timeline events, no Agent Runtime orchestration.

## Decision

Use **client-side routing** in the existing React frontend with three routes:

| Route | Maturity | API |
| ----- | -------- | --- |
| `/` | Overview | — |
| `/demo/level-1` | Level 1 | `POST /api/llm` |
| `/demo/level-2` | Level 2 | `POST /api/chat` |

All three routes ship under the **same Git tag** (`v1.0-build-your-first-agent`). Level 2 remains the Session 1 engineering deliverable; Level 1 is a thin baseline for the opening compare flow.

Do **not** introduce a separate top-level application, a full multi-session navigation framework, or tabs as the long-term navigation model.

## Consequences

- Presenters and docs can link directly to `/demo/level-1` and `/demo/level-2`.
- The Level 1 vs Level 2 split is visible in both UI routes and API boundaries — easier to teach and test.
- Future sessions extend the same router and pages incrementally (e.g. Session 2 enhances Level 2, not a new app tree).
- Level 1 must stay intentionally thin; feature creep on `/api/llm` would blur the maturity lesson.
- JSON responses across `/health`, `/api/llm`, and `/api/chat` use **camelCase** field names for frontend parity (see `HealthResponse`, `LlmResponse`, `ChatResponse`).

## Related

- [02-master-plan.md §4.1](../02-master-plan.md#41-agent-maturity-levels) — Agent Maturity Levels
- [ADR-003](./ADR-003-dashboard.md) — Agent Dashboard vs chatbot UI
- [presentation/demo-01/README.md](../../presentation/demo-01/README.md) — live compare flow

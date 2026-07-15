# Agent Dashboard (observability contract)

> **Standing reference** for all sessions. Canonical contract: [02-master-plan.md](./02-master-plan.md) §6–§8 and §7.1.
>
> File name `13-observability-dashboard.md` is historical; the UI pattern is the **Agent Dashboard**.

This document describes the **Agent Dashboard** pattern used throughout the Swamy's Tech Skills Academy series — the most distinctive, recurring UI concept in the repository.

## Agent Dashboard panels

| Panel | Purpose |
| ----- | ------- |
| **Prompt** | User input |
| **Direct LLM vs Agentic** | Demo 1 maturity contrast (`MaturityContrastPanel`) — Level 1 vs Level 2 |
| **Current Provider** | Session 3+ panel showing the selected provider: OpenAI, AWS Bedrock, or later Azure OpenAI |
| **Current Model** | Session 3+ panel showing the selected model or deployment, such as GPT, Qwen3 Coder on Bedrock, or an Azure deployment name |
| **Decision Timeline** | Structured execution events (not raw model reasoning) |
| **Tool Registry** | Tool lifecycle states (→ Agent Registry in Session 6) |
| **Tool Execution** | Completed tool calls in Demo 1 (batch response); in-flight streaming arrives in Session 2 |
| **Final Response** | Agent answer (streaming from Session 2) |

See [02-master-plan.md §6](./02-master-plan.md#6-agent-dashboard-ui-concept) for the ASCII layout and per-session panel evolution.

## Decision Timeline

- **Event names and payload:** [02-master-plan.md §7](./02-master-plan.md#7-decision-timeline-backend--ui-contract) and [§7.1](./02-master-plan.md#71-event-payload-backend--frontend-contract)
- **Shared types:** `src/backend/app/agent_runtime/models.py` (Pydantic) and `src/frontend/src/types/decision-event.ts` (TypeScript)

## Tool Registry states

UI uses Font Awesome icons with text labels (`ToolRegistry.tsx`):

| Label | Event driver |
| ----- | ------------ |
| Available | Tool registered, not yet used |
| Selected | `ToolSelected` |
| Running | `ToolInvoked` |
| Success | `ToolCompleted` |
| Handled | `ToolFailedHandled` (`error.recoverable === true`) |
| Failed | `ToolFailedUnhandled` on a tool-tagged event (Demo 1 UI). `SystemErrorRaised` does not flip registry rows |

See [02-master-plan.md §8](./02-master-plan.md#8-tool-registry-visual-states).

## Demo 1 implementation notes (Session 1)

These are intentional teaching shortcuts — not contract violations:

| Topic | Demo 1 behavior | Later session |
| ----- | --------------- | ------------- |
| Intent / plan events | Regex heuristics in `agent_runtime/agent.py` before the SDK run | Tighter SDK/tool instrumentation |
| `ToolInvoked.params` | `{"query": "<user message>"}` (not MCP args like `expression` / `city`) | Structured tool-call arguments |
| `ToolCompleted.result` | Final agent answer text | Isolated tool payload + `latencyMs` (Session 7+) |
| Failure events | `ToolFailedHandled` / `ToolFailedUnhandled` defined but not emitted on happy path | Session 2+ failure demos |
| MCP lifecycle | Stdio server spawned per `/api/chat` request | Production boundaries (Session 7) |

Presenters: see [presentation/demo-01/README.md](../presentation/demo-01/README.md) (Presenter note — Demo 1 timeline instrumentation).

## Session links

When authoring session walkthroughs under `presentation/demo-0N/`, link here for dashboard behavior instead of duplicating the full contract.

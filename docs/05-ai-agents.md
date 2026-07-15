# AI Agents — Concepts

> **Demo scope:** Demo 1 implements a **Level 2 Proxy Agent** with tool calling. Conversation state (Level 3), working context (Level 4), and multi-agent coordination (Level 5) arrive in later sessions. See [02-master-plan.md §4.1](./02-master-plan.md#41-agent-maturity-levels).

## Plain English definition

An **AI agent** is software that uses a language model to **interpret a goal**, **decide whether external actions are needed**, and **execute those actions through tools** before answering the user.

A **chatbot** stops at text generation. An **agent** can *do things* — call APIs, run calculations, fetch live data — and show you *what it decided* along the way.

In this curriculum, that distinction maps to **Agent Maturity Levels**:

| Level | Name | What it means |
| ----- | ---- | ------------- |
| **1** | Direct LLM Interaction | User → prompt → model → text. Stateless. No runtime, tools, or audit trail. |
| **2** | Proxy Agent | **Session 1 / Demo 1** — Agent Runtime with instructions, MCP tools, and Decision Timeline events. |
| **3** | Assistant System | Session-based conversation and providers (Sessions 2–3). |
| **4** | Autonomous Agent | Working context, context assembly, knowledge (Sessions 4–6). |
| **5** | Multi-Agent System | Coordination plus production and enterprise depth (Session 6 onward). |

Progression is **incremental** — a session may introduce the next level without implementing every characteristic. The taxonomy is a teaching lens, not a certification checklist.

## Level 1 vs Level 2 (Direct LLM vs agentic)

**Level 1 — Direct LLM Interaction** (runnable at `/demo/level-1`; contrast only, not the Session 1 deliverable):

```text
User → Raw LLM Prompt → LLM Response
```

**Level 2 — Proxy Agent** (what `src/` runs for Session 1):

```text
User → Agent Runtime → Instructions / Tool Selection / MCP / Decision Timeline
```

The Agent Dashboard includes a **Direct LLM vs Agentic** panel on `/demo/level-2`. A runnable **Level 1** demo lives at `/demo/level-1` (`POST /api/llm` — response text only, no events). Level 2 uses `/demo/level-2` and `POST /api/chat`.

### Context note (avoiding a common confusion)

| Concept | Example | When |
| ------- | ------- | ---- |
| Conversation state | Current chat history | Session 2 (Level 3) |
| Agent working context | Context assembly, summaries, planning state | Sessions 4–6 (Level 4) |
| Persistent user memory | Cross-conversation personalization | Future / TBD |

Level 4 **working context** is not the same as long-term user profiles. See the Capability Roadmap in [02-master-plan.md](./02-master-plan.md).

## Agent vs chatbot (worked example)

**User:** `What is 15 * 23?`

| Level 1 / chatbot-only | Level 2 / agent (this repo) |
| ---------------------- | --------------------------- |
| Model may mental-math or hallucinate | Runtime classifies intent → selects `calculate` → MCP evaluates `15 * 23` → returns **345** |
| No audit trail | Decision Timeline shows structured events |
| User sees only final text | Tool Registry shows Available → Selected → Running → Success |

**User:** `What is an AI agent?`

| Agent behavior | Tool used |
| -------------- | --------- |
| General knowledge question | **None** — direct response; timeline still shows intent and plan |

Live Demo 1 narrates a no-tool path with `What is SOLID?`; `What is an AI agent?` is the same no-tool pattern — see [presentation/demo-01](../presentation/demo-01/README.md).

## The agent loop in this repository

```text
PromptReceived
    → IntentIdentified
    → ExecutionPlanCreated
    → [ToolSelected → ToolInvoked → ToolCompleted]  (optional)
    → ResponseSynthesized
    → ResponseDelivered
```

The loop is visible in the **Decision Timeline** panel — not hidden chain-of-thought. See [13-observability-dashboard.md](./13-observability-dashboard.md).

## Key vocabulary

| Term | Meaning in this repo |
| ---- | -------------------- |
| **Maturity level** | Architectural stage (1–5) — see [§4.1](./02-master-plan.md#41-agent-maturity-levels) |
| **Agent runtime** | Backend package `src/backend/app/agent_runtime/` — orchestrates events, SDK, MCP |
| **Tool** | A callable capability exposed via MCP (e.g. `calculate`, `get_weather`) |
| **Intent** | What the user is trying to do (arithmetic, weather, general) |
| **Execution plan** | Whether to use tools or answer directly |
| **Decision event** | One structured step in the timeline (`DecisionEvent` type) |

## Business grounding

**Support bot scenario:** A customer asks *"What's the status of order 8842?"* A chatbot might invent a status. An agent should **select an order-lookup tool**, pass `order_id=8842`, and synthesize the API response. Demo 1 uses calculator and weather, but the **decision pattern is the same**.

**Research assistant scenario:** *"What's the weather in Seattle and what's 15% of a $240 license?"* A mature agent may call **multiple tools** before one answer. The master plan's multi-tool timeline example is in [02-master-plan.md §7](./02-master-plan.md#7-decision-timeline-backend--ui-contract).

## What Demo 1 implements

In `agent.py`, intent is inferred from keywords:

- Arithmetic patterns → `calculate`
- Weather keywords → `get_weather`
- Otherwise → direct response (no tool)

The OpenAI Agent SDK still performs model-driven tool selection when tools are available; the runtime **emits timeline events** so the dashboard reflects the engineering contract.

## What's coming in later sessions

| Session | Maturity | Agent capability added |
| ---- | -------- | ---------------------- |
| 2 | Level 3 | **State** — sessions, streaming, and conversation continuity |
| 3 | Level 3 | **Provider abstraction** — OpenAI plus AWS Bedrock |
| 4 | Level 4 | **Context engineering** — working context, compression, prompt assembly |
| 5 | Level 4 | **RAG** — answers grounded in your documents |
| 6 | Level 5 | **Multi-agent** — planner delegates to specialists |
| 7+ | Level 5 | **Production & enterprise** — tracing, deployment, governance |

Topic guides: [09-context-engineering.md](./09-context-engineering.md), [10-rag.md](./10-rag.md), [11-multi-agent.md](./11-multi-agent.md), [12-production.md](./12-production.md)

## Related

- [02-master-plan.md §4.1](./02-master-plan.md#41-agent-maturity-levels) — Agent Maturity Levels taxonomy
- [08-tool-calling.md](./08-tool-calling.md) — step-by-step tool flow
- [07-mcp.md](./07-mcp.md) — how tools are standardized
- [OpenAI Agents documentation](https://openai.github.io/openai-agents-python/) — upstream SDK reference

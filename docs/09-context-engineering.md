# Context Engineering

> **Status:** 📅 Planned — Session 4 (`v4.0-context-engineering`)  
> **Prerequisite:** Demo 1 tool calling ([08-tool-calling.md](./08-tool-calling.md))

Session 4 reframes the old memory bucket as **Context Engineering**: deciding what information should actually be sent to the LLM.

## Plain English

Today (Sessions 1–3), each prompt can run through tools, application state, and provider abstraction. Session 4 sharpens the next boundary:

```text
Application State

≠

LLM Context

≠

Knowledge
```

Session 2 asks: **How does my application remember conversations?** Session 4 asks: **What should I actually send to the LLM?** Session 5 asks: **How do I retrieve external knowledge?**

**Turn 1:** `What's the weather in Seattle?`  
**Turn 2:** `Will I need an umbrella tomorrow?` — the agent should know you mean Seattle without you repeating the city.

**Business scenario:** A support agent that remembers the customer's account ID from turn one avoids asking the same question twice — higher resolution rate, better UX.

## Planned capabilities

| Capability | Purpose |
| ---------- | ------- |
| **Context window management** | Decide what fits in the prompt window |
| **Sliding window** | Keep recent turns without overflowing token limits |
| **Summarization** | Compress older turns when they still matter |
| **Prompt assembly** | Combine state, tool results, summaries, and instructions deliberately |
| **Context tracing** | Show what was included, summarized, or dropped |

## Planned code additions

From [02-master-plan.md §11](./02-master-plan.md#11-what-each-session-adds-code):

```text
src/backend/app/agent_runtime/
    + context_window.py
    + context_builder.py
    + context_compression.py
src/frontend/src/components/
    + ContextPanel.tsx
```

## Killer demo (planned)

1. Force a small context window.
2. Continue a conversation long enough to exceed it.
3. Show the Context Panel deciding what to include, summarize, and drop.
4. Compare this with Session 2 application state and Session 5 knowledge retrieval.

## Dashboard changes

| Panel | Enhancement |
| ----- | ----------- |
| **Context Panel** | Active context budget, included turns, summaries, dropped items |
| **Decision Timeline** | Prompt assembly and compression events remain structured |

See [13-observability-dashboard.md § Session links](./13-observability-dashboard.md#session-links) — panel list updates with each session.

## API sketch (planned)

Session 2 introduces **persisted conversation state** (SQLite store) built on the `sessionId` field that Demo 1 already accepts on `POST /api/chat`. Context Engineering will:

- Reuse `sessionId` across requests (and eventually across persistent session store rows)
- Read conversation state as input
- Assemble the prompt context deliberately
- Keep durable personalization as a future extension, not the Session 4 teaching goal

## What to read now

- [05-ai-agents.md](./05-ai-agents.md) — agent loop baseline
- [presentation/demo-04/README.md](../presentation/demo-04/README.md) — Context Engineering session placeholder
- [02-master-plan.md § Curriculum roadmap](./02-master-plan.md#10-curriculum-roadmap)

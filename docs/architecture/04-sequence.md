# Sequence View

> **View:** Request and tool-calling flow  
> **Scope:** Demo 1 chat request

```mermaid
sequenceDiagram
  participant User
  participant UI as React Dashboard
  participant API as FastAPI
  participant Runtime as Agent Runtime
  participant SDK as OpenAI Agent SDK
  participant MCP as MCP Server
  participant Tool as Calculator or Weather

  User->>UI: Submit prompt
  UI->>API: POST /api/chat
  API->>Runtime: run_agent_chat(message)
  Runtime->>Runtime: emit PromptReceived
  Runtime->>Runtime: emit IntentIdentified
  Runtime->>Runtime: emit ExecutionPlanCreated
  Runtime->>SDK: Runner.run(agent, input)
  SDK->>MCP: tool call
  MCP->>Tool: execute
  Tool-->>MCP: tool result
  MCP-->>SDK: structured result
  SDK-->>Runtime: final output
  Runtime->>Runtime: emit ResponseDelivered
  Runtime-->>API: ChatResponse
  API-->>UI: response + events
```

ASCII fallback:

```text
User
  -> React Dashboard: Submit prompt
  -> FastAPI: POST /api/chat
  -> Agent Runtime: run_agent_chat(message)
  -> Agent Runtime: emit PromptReceived / IntentIdentified / ExecutionPlanCreated
  -> OpenAI Agent SDK: Runner.run(agent, input)
  -> MCP Server: tool call
  -> Calculator or Weather: execute
  <- MCP Server: tool result
  <- OpenAI Agent SDK: structured result / final output
  -> Agent Runtime: emit ResponseDelivered
  <- FastAPI: ChatResponse
  <- React Dashboard: response + events
```

## Why this matters

The sequence separates three concerns that learners can observe in the UI:

- Agent behavior: intent, plan, response synthesis.
- Tool behavior: selected, invoked, completed, or failed.
- System behavior: request IDs, session IDs, and ordered events.

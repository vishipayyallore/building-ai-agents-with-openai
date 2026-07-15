# OpenAI Agent SDK

> **Demo scope:** Demo 1 uses `Agent`, `Runner`, and `MCPServerStdio` in `src/backend/app/agent_runtime/agent.py` for Level 2 (`POST /api/chat`). Level 1 (`POST /api/llm` via `direct_llm.py`) uses a minimal `Agent` + `Runner` without MCP or Decision Timeline events.

The [OpenAI Agents SDK for Python](https://openai.github.io/openai-agents-python/) orchestrates model calls, tool access, and multi-step runs. In this repository it sits between FastAPI and the MCP tool server (Level 2) or behind the thin Level 1 direct path.

## Where it lives in the stack

```text
Level 1: POST /api/llm   →  run_direct_llm()  →  Agent + Runner  (no MCP, no events)
Level 2: POST /api/chat  →  run_agent_chat()  →  Agent + Runner  →  MCPServerStdio  →  MCP tools
```

**Plain English:** FastAPI receives the user message. The agent runtime creates an SDK `Agent` with instructions and MCP servers, then `Runner.run()` executes the conversation turn.

## Core objects in Demo 1

| SDK type | Role in this repo |
| -------- | ----------------- |
| `Agent` | Named assistant with instructions and connected MCP servers |
| `Runner` | Executes the agent against user input |
| `MCPServerStdio` | Spawns the MCP server as a child process; tools appear to the agent over stdio |

### Agent configuration

From `agent.py`:

```python
agent = Agent(
    name="Demo1Agent",
    instructions=AGENT_INSTRUCTIONS,
    model=settings.openai_model,
    mcp_servers=[mcp_server],
)
result = await Runner.run(agent, input=message)
final_text = str(result.final_output)
```

Instructions (`instructions.py`) tell the model when to prefer `calculate` vs `get_weather` vs a direct answer.

### MCP stdio spawn

The backend does **not** require you to start MCP manually for Demo 1:

```python
MCPServerStdio(
    name="agentic-tools",
    params={
        "command": uv,
        "args": ["run", "python", str(server_script)],
        "cwd": str(REPO_ROOT),
        "env": {**os.environ, "PYTHONPATH": str(server_dir)},
    },
    cache_tools_list=True,
)
```

**Why stdio:** One less port to manage in the room. The SDK owns the MCP process lifecycle for each request.

## Worked example: calculator prompt

1. User sends `What is 15 * 23?`
2. Runtime emits timeline events (intent, plan, tool selection)
3. SDK agent receives message + tool schemas from MCP
4. Model invokes `calculate` with expression `15 * 23`
5. MCP returns `345`
6. Model synthesizes: *"15 multiplied by 23 is 345."*
7. Runtime emits `ToolCompleted`, `ResponseDelivered`
8. API returns `ChatResponse`: `{ response, events[], sessionId, requestId, maturityLevel, maturityName }`

## Environment requirements

| Variable | Purpose |
| -------- | ------- |
| `OPENAI_API_KEY` | Required — agent cannot run without it |
| `OPENAI_MODEL` | Optional override (see `.env.example`) |

Missing key handling: runtime emits `SystemErrorRaised` with code `MISSING_API_KEY` and a user-facing message pointing to [03-getting-started.md](./03-getting-started.md).

## Error handling

Uncaught exceptions during the SDK/MCP run emit:

- `ToolFailedUnhandled` when a tool was selected — this drives the **Failed** Tool Registry state in Demo 1
- `SystemErrorRaised` for general runtime failures (for example `MISSING_API_KEY`) — appears on the Decision Timeline and Final Response; Demo 1 Tool Registry rows stay **Available** unless a tool-tagged failure event is present

See [13-observability-dashboard.md](./13-observability-dashboard.md).

## What the SDK does *not* do in Demo 1

- **Memory across turns** — Demo 2 adds conversation state
- **Streaming tokens to UI** — Demo 2 adds SSE streaming
- **Built-in tracing dashboard** — Session 7 adds observability; we already emit `DecisionEvent` for Session 1

## Related

- [07-mcp.md](./07-mcp.md) — tool server the SDK connects to
- [08-tool-calling.md](./08-tool-calling.md) — full request flow
- [architecture/demo-1-stack.md](./architecture/demo-1-stack.md) — file-level map

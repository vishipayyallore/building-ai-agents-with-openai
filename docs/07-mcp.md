# Model Context Protocol (MCP)

> **Demo scope:** Demo 1 exposes `calculate` and `get_weather` via FastMCP in `src/mcp-server/`.

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) standardizes how AI applications discover and invoke **tools** — a common plug shape so you can swap implementations without rewriting the agent.

## Plain English

Without MCP, every agent framework invents its own tool wiring. With MCP, tools advertise a **schema** (name, description, parameters) and respond over a **transport** (here: stdio). The OpenAI Agent SDK speaks MCP; our server implements the tools.

**Business analogy:** MCP is like USB-C for agent capabilities — the agent runtime is the laptop; calculator and weather are peripherals.

## Layout in this repository

```text
src/mcp-server/
├── server.py           # FastMCP app + @mcp.tool() registrations
└── tools/
    ├── calculator.py   # safe_evaluate()
    └── weather.py      # OpenWeatherMap or demo fallback
```

## Demo 1 tools

| Tool name | Input | Output | Business use |
| --------- | ----- | ------ | -------------- |
| `calculate` | Math expression string | Stringified numeric result or error message | Pricing, metrics, capacity planning |
| `get_weather` | City name | Weather summary string | Travel scheduling, field-service routing |

### Tool registration (`server.py`)

```python
@mcp.tool()
def calculate(expression: str) -> str:
    """Evaluate a math expression. Example: '15 * 23' or '(10 + 5) / 3'."""
    ...

@mcp.tool()
def get_weather(city: str) -> str:
    """Get current weather for a city. Example: 'Seattle' or 'London'."""
    ...
```

Docstrings become tool descriptions the model reads when choosing actions.

## How the backend connects (stdio)

Demo 1 spawns MCP from `agent_runtime/agent.py` using `MCPServerStdio`. You do **not** run `server.py` in a separate terminal for the club session — the agent runtime launches it when handling `POST /api/chat`.

For local debugging only:

```powershell
cd D:\GitHub\agentic-engineering-in-practice
$env:PYTHONPATH = "src/mcp-server"
uv run python src/mcp-server/server.py
```

## Weather tool and configuration

`get_weather` uses OpenWeatherMap when `OPENWEATHER_API_KEY` is set in repo-root `.env` (the MCP subprocess reads the env var when started via `uv run`). Without a key, it returns deterministic **demo-mode** text so the agent flow still works in the room.

Demo-mode example: `[demo mode] Weather in Seattle: 22°C, partly cloudy. Set OPENWEATHER_API_KEY in .env for live data.`

Live data shape: `Weather in Seattle: 22°C, partly cloudy.`

## Adding a new tool (pattern for later demos)

1. Implement logic in `src/mcp-server/tools/your_tool.py`
2. Register with `@mcp.tool()` in `server.py`
3. Update agent instructions if the model needs a hint
4. Add tests under `src/mcp-server/tests/`
5. Update Tool Registry UI defaults in the frontend

Session 5 adds `knowledge.py` (or equivalent `search_docs`) for document search using the same pattern. Session 3 stays focused on provider abstraction.

## MCP vs REST API tools

| Approach | When to use |
| -------- | ----------- |
| **MCP (this repo)** | Reusable tool servers, schema discovery, SDK integration |
| **Direct HTTP in backend** | Internal-only helpers not exposed as agent tools |

We keep user-facing capabilities in MCP so the Tool Registry and Session 6 multi-agent split stay clean.

## Related

- [08-tool-calling.md](./08-tool-calling.md) — when the agent chooses a tool
- [06-openai-agent-sdk.md](./06-openai-agent-sdk.md) — SDK side of the connection
- [FastMCP documentation](https://github.com/jlowin/fastmcp) — server implementation library

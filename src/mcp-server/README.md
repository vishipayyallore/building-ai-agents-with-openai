# MCP server (Demo 1)

Calculator and weather tools via MCP (stdio). Started automatically by the backend via `MCPServerStdio`.

Manual smoke test (from **repo root**):

```powershell
$env:PYTHONPATH = "src/mcp-server"
uv run python src/mcp-server/server.py
```

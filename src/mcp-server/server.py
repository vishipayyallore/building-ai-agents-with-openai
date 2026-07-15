"""MCP tool server — calculator and weather tools (Demo 1)."""

from mcp.server.fastmcp import FastMCP

from tools.calculator import safe_evaluate
from tools.weather import get_weather as fetch_weather

mcp = FastMCP("agentic-tools")


@mcp.tool()
def calculate(expression: str) -> str:
    """Evaluate a math expression. Example: '15 * 23' or '(10 + 5) / 3'."""
    try:
        value = safe_evaluate(expression)
        return str(value)
    except Exception as exc:
        return f"Error: {exc}"


@mcp.tool()
def get_weather(city: str) -> str:
    """Get current weather for a city. Example: 'Seattle' or 'London'."""
    try:
        return fetch_weather(city)
    except Exception as exc:
        return f"Error: {exc}"


if __name__ == "__main__":
    mcp.run()

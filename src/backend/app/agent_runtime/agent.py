import os
import re
import shutil

from agents import Agent, Runner
from agents.mcp import MCPServerStdio

from app.agent_runtime.event_bus import EventBus
from app.agent_runtime.instructions import AGENT_INSTRUCTIONS
from app.agent_runtime.models import (
    CURRENT_MATURITY_LEVEL,
    ChatResponse,
    DecisionEventError,
    DecisionEventType,
    maturity_fields,
    new_request_id,
    new_session_id,
)
from app.config import REPO_ROOT, settings


def _mcp_stdio_server() -> MCPServerStdio:
    server_dir = settings.mcp_server_dir.resolve()
    server_script = server_dir / "server.py"
    uv = shutil.which("uv") or "uv"
    return MCPServerStdio(
        name="agentic-tools",
        params={
            "command": uv,
            "args": ["run", "python", str(server_script)],
            "cwd": str(REPO_ROOT),
            "env": {**os.environ, "PYTHONPATH": str(server_dir)},
        },
        cache_tools_list=True,
    )


def _infer_intent(message: str) -> str:
    lower = message.lower()
    if re.search(r"\d|\+|\-|\*|/|calculate|math|multiply|add", lower):
        return "arithmetic"
    if "weather" in lower or "temperature" in lower:
        return "weather"
    return "general"


def _tool_for_intent(intent: str) -> str | None:
    return {"arithmetic": "calculate", "weather": "get_weather"}.get(intent)


async def run_agent_chat(message: str, session_id: str | None = None) -> ChatResponse:
    sid = session_id or new_session_id()
    rid = new_request_id()
    bus = EventBus(sid, rid)

    bus.emit(DecisionEventType.PROMPT_RECEIVED, metadata={"prompt": message})
    intent = _infer_intent(message)
    bus.emit(DecisionEventType.INTENT_IDENTIFIED, metadata={"intent": intent})

    if not settings.openai_api_key:
        bus.emit(
            DecisionEventType.SYSTEM_ERROR_RAISED,
            error=DecisionEventError(
                code="MISSING_API_KEY",
                message="OPENAI_API_KEY is not set. Copy .env.example to .env and add your key.",
                recoverable=False,
            ),
        )
        return ChatResponse(
            session_id=sid,
            request_id=rid,
            response="Cannot run the agent without OPENAI_API_KEY. See docs/03-getting-started.md.",
            events=bus.events,
            **maturity_fields(CURRENT_MATURITY_LEVEL),
        )

    plan = "use_tools" if intent in {"arithmetic", "weather"} else "direct_response"
    bus.emit(DecisionEventType.EXECUTION_PLAN_CREATED, metadata={"plan": plan})

    tool_name = _tool_for_intent(intent)
    if tool_name:
        bus.emit(DecisionEventType.TOOL_SELECTED, tool=tool_name)
        bus.emit(DecisionEventType.TOOL_INVOKED, tool=tool_name, params={"query": message})

    mcp_server = _mcp_stdio_server()
    try:
        async with mcp_server:
            agent = Agent(
                name="Demo1Agent",
                instructions=AGENT_INSTRUCTIONS,
                model=settings.openai_model,
                mcp_servers=[mcp_server],
            )
            result = await Runner.run(agent, input=message)
            final_text = str(result.final_output)

        if tool_name:
            bus.emit(DecisionEventType.TOOL_COMPLETED, tool=tool_name, result=final_text)

        bus.emit(DecisionEventType.RESPONSE_SYNTHESIZED, metadata={"summary": "Agent completed"})
        bus.emit(DecisionEventType.RESPONSE_DELIVERED, result=final_text)

        return ChatResponse(
            session_id=sid,
            request_id=rid,
            response=final_text,
            events=bus.events,
            **maturity_fields(CURRENT_MATURITY_LEVEL),
        )
    except Exception as exc:
        if tool_name:
            bus.emit(
                DecisionEventType.TOOL_FAILED_UNHANDLED,
                tool=tool_name,
                error=DecisionEventError(
                    code="TOOL_ERROR",
                    message=str(exc),
                    recoverable=False,
                ),
            )
        else:
            bus.emit(
                DecisionEventType.SYSTEM_ERROR_RAISED,
                error=DecisionEventError(
                    code="AGENT_RUNTIME_ERROR",
                    message=str(exc),
                    recoverable=False,
                ),
            )
        return ChatResponse(
            session_id=sid,
            request_id=rid,
            response=f"Agent error: {exc}",
            events=bus.events,
            **maturity_fields(CURRENT_MATURITY_LEVEL),
        )

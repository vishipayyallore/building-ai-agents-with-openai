from types import SimpleNamespace

import pytest

from app.agent_runtime.agent import run_agent_chat
from app.agent_runtime.models import DecisionEventType


class _FakeMcpServer:
    async def __aenter__(self):
        return self

    async def __aexit__(self, *_args):
        return None


@pytest.mark.asyncio
async def test_chat_arithmetic_emits_tool_timeline(fake_openai_api_key, monkeypatch):
    async def fake_run(_agent, input):
        assert "15 * 23" in input
        return SimpleNamespace(final_output="15 multiplied by 23 is 345.")

    monkeypatch.setattr("app.agent_runtime.agent.Runner.run", fake_run)
    monkeypatch.setattr("app.agent_runtime.agent._mcp_stdio_server", lambda: _FakeMcpServer())

    result = await run_agent_chat("What is 15 * 23?")
    event_names = [e.event for e in result.events]

    assert result.response == "15 multiplied by 23 is 345."
    assert event_names[0] == DecisionEventType.PROMPT_RECEIVED
    assert DecisionEventType.INTENT_IDENTIFIED in event_names
    assert DecisionEventType.TOOL_SELECTED in event_names
    assert DecisionEventType.TOOL_INVOKED in event_names
    assert DecisionEventType.TOOL_COMPLETED in event_names
    assert DecisionEventType.RESPONSE_DELIVERED in event_names

    tool_events = [e for e in result.events if e.tool]
    assert any(e.tool == "calculate" for e in tool_events)


@pytest.mark.asyncio
async def test_chat_general_skips_tool_events(fake_openai_api_key, monkeypatch):
    async def fake_run(_agent, input):
        return SimpleNamespace(final_output="SOLID is a design principles acronym.")

    monkeypatch.setattr("app.agent_runtime.agent.Runner.run", fake_run)
    monkeypatch.setattr("app.agent_runtime.agent._mcp_stdio_server", lambda: _FakeMcpServer())

    result = await run_agent_chat("What is SOLID?")
    event_names = [e.event for e in result.events]

    assert DecisionEventType.TOOL_SELECTED not in event_names
    assert DecisionEventType.EXECUTION_PLAN_CREATED in event_names
    assert result.response.startswith("SOLID")

import pytest

from app.agent_runtime.agent import _infer_intent, _tool_for_intent


@pytest.mark.parametrize(
    ("message", "expected"),
    [
        ("What is 15 * 23?", "arithmetic"),
        ("calculate 2 + 2", "arithmetic"),
        ("multiply these numbers", "arithmetic"),
        ("What's the weather in Seattle?", "weather"),
        ("temperature in London", "weather"),
        ("What is SOLID?", "general"),
        ("hello", "general"),
    ],
)
def test_infer_intent(message: str, expected: str):
    assert _infer_intent(message) == expected


@pytest.mark.parametrize(
    ("intent", "tool"),
    [
        ("arithmetic", "calculate"),
        ("weather", "get_weather"),
        ("general", None),
        ("unknown", None),
    ],
)
def test_tool_for_intent(intent: str, tool: str | None):
    assert _tool_for_intent(intent) == tool

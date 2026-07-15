from app.agent_runtime.models import (
    CURRENT_MATURITY_LEVEL,
    DIRECT_LLM_MATURITY_LEVEL,
    AgentMaturityLevel,
    maturity_fields,
)


def test_maturity_fields_from_intenum():
    fields = maturity_fields(AgentMaturityLevel.PROXY_AGENT)
    assert fields == {"maturity_level": 2, "maturity_name": "PROXY_AGENT"}


def test_maturity_level_ordered_comparison():
    assert AgentMaturityLevel.PROXY_AGENT < AgentMaturityLevel.ASSISTANT_SYSTEM
    assert AgentMaturityLevel.AUTONOMOUS_AGENT >= AgentMaturityLevel.AUTONOMOUS_AGENT


def test_session_constants():
    assert CURRENT_MATURITY_LEVEL is AgentMaturityLevel.PROXY_AGENT
    assert DIRECT_LLM_MATURITY_LEVEL is AgentMaturityLevel.DIRECT_LLM_INTERACTION

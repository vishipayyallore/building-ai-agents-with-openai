import json

from app.agent_runtime.models import (
    AgentMaturityLevel,
    ChatResponse,
    DecisionEvent,
    DecisionEventType,
    HealthResponse,
    LlmResponse,
    maturity_fields,
)


def test_decision_event_serializes_camel_case_aliases():
    event = DecisionEvent(
        event=DecisionEventType.PROMPT_RECEIVED,
        timestamp="2026-01-01T00:00:00Z",
        session_id="sess-1",
        request_id="req-1",
        sequence=1,
        metadata={"prompt": "hi"},
    )
    payload = event.model_dump(by_alias=True)
    assert payload["sessionId"] == "sess-1"
    assert payload["requestId"] == "req-1"
    assert "session_id" not in payload
    assert payload["event"] == "PromptReceived"


def test_chat_response_json_uses_camel_case():
    response = ChatResponse(
        session_id="sess-1",
        request_id="req-1",
        response="ok",
        events=[],
        **maturity_fields(AgentMaturityLevel.PROXY_AGENT),
    )
    raw = json.loads(response.model_dump_json(by_alias=True))
    assert raw["sessionId"] == "sess-1"
    assert raw["requestId"] == "req-1"
    assert raw["maturityLevel"] == 2
    assert raw["maturityName"] == "PROXY_AGENT"


def test_llm_and_health_response_aliases():
    llm = LlmResponse(
        response="hi",
        **maturity_fields(AgentMaturityLevel.DIRECT_LLM_INTERACTION),
    )
    health = HealthResponse(
        status="ok", demo="1", **maturity_fields(AgentMaturityLevel.PROXY_AGENT)
    )

    llm_raw = json.loads(llm.model_dump_json(by_alias=True))
    health_raw = json.loads(health.model_dump_json(by_alias=True))

    assert llm_raw["maturityLevel"] == 1
    assert llm_raw["maturityName"] == "DIRECT_LLM_INTERACTION"
    assert health_raw["maturityLevel"] == 2
    assert health_raw["maturityName"] == "PROXY_AGENT"

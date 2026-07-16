from enum import IntEnum, StrEnum
from typing import Any
from uuid import uuid4

from pydantic import BaseModel, Field


class AgentMaturityLevel(IntEnum):
    """Agent Maturity Levels — architectural lens from §4.1 of the master plan.

    IntEnum: members serialize as ints (`maturityLevel`) and expose `.name`
    for `maturityName` without a second lookup table. Ordered comparisons are
    valid (e.g. ``level >= AgentMaturityLevel.AUTONOMOUS_AGENT``).

    Progression is incremental rather than discrete. A session may introduce
    capabilities associated with the next level without fully implementing all
    characteristics of that level.
    """

    DIRECT_LLM_INTERACTION = 1  # Stateless, human-led — Session 1 opening
    PROXY_AGENT = 2  # Instruction-based tool calling — Session 1
    ASSISTANT_SYSTEM = 3  # Session-based context, user-guided — Sessions 2–3
    AUTONOMOUS_AGENT = 4  # Persistent working context, partial autonomy — Sessions 4–6
    MULTI_AGENT_SYSTEM = 5  # Distributed context, specialist coordination — Session 6+


def maturity_fields(level: AgentMaturityLevel) -> dict[str, int | str]:
    """Kwargs for HealthResponse, LlmResponse, and ChatResponse maturity columns."""
    return {"maturity_level": int(level), "maturity_name": level.name}


# Session 1 shipped maturity — Level 2 Proxy Agent (§4.1). Import for /health and agent chat.
CURRENT_MATURITY_LEVEL = AgentMaturityLevel.PROXY_AGENT

# Level 1 baseline path — Direct LLM only (POST /api/llm).
DIRECT_LLM_MATURITY_LEVEL = AgentMaturityLevel.DIRECT_LLM_INTERACTION


class DecisionEventType(StrEnum):
    PROMPT_RECEIVED = "PromptReceived"
    INTENT_IDENTIFIED = "IntentIdentified"
    EXECUTION_PLAN_CREATED = "ExecutionPlanCreated"
    TOOL_SELECTED = "ToolSelected"
    TOOL_INVOKED = "ToolInvoked"
    TOOL_COMPLETED = "ToolCompleted"
    TOOL_FAILED_HANDLED = "ToolFailedHandled"
    TOOL_FAILED_UNHANDLED = "ToolFailedUnhandled"
    SYSTEM_ERROR_RAISED = "SystemErrorRaised"
    RESPONSE_SYNTHESIZED = "ResponseSynthesized"
    RESPONSE_DELIVERED = "ResponseDelivered"


class DecisionEventError(BaseModel):
    code: str
    message: str
    recoverable: bool


class DecisionEvent(BaseModel):
    event: DecisionEventType
    timestamp: str
    session_id: str = Field(serialization_alias="sessionId")
    request_id: str = Field(serialization_alias="requestId")
    sequence: int
    tool: str | None = None
    agent: str | None = None
    params: dict[str, Any] | None = None
    result: Any | None = None
    error: DecisionEventError | None = None
    latency_ms: int | None = Field(default=None, serialization_alias="latencyMs")
    metadata: dict[str, Any] | None = None

    model_config = {"populate_by_name": True}


class ChatRequest(BaseModel):
    message: str
    session_id: str | None = Field(
        default=None,
        validation_alias="sessionId",
        serialization_alias="sessionId",
    )

    model_config = {"populate_by_name": True}


class ChatResponse(BaseModel):
    session_id: str = Field(serialization_alias="sessionId", validation_alias="sessionId")
    request_id: str = Field(serialization_alias="requestId", validation_alias="requestId")
    response: str
    events: list[DecisionEvent]
    maturity_level: int = Field(serialization_alias="maturityLevel")
    maturity_name: str = Field(serialization_alias="maturityName")

    model_config = {"populate_by_name": True}


class LlmRequest(BaseModel):
    message: str


class LlmResponse(BaseModel):
    response: str
    maturity_level: int = Field(serialization_alias="maturityLevel")
    maturity_name: str = Field(serialization_alias="maturityName")

    model_config = {"populate_by_name": True}


class HealthResponse(BaseModel):
    status: str
    demo: str
    maturity_level: int = Field(serialization_alias="maturityLevel")
    maturity_name: str = Field(serialization_alias="maturityName")

    model_config = {"populate_by_name": True}


def new_session_id() -> str:
    return str(uuid4())


def new_request_id() -> str:
    return str(uuid4())

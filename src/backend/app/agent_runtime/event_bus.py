from datetime import UTC, datetime
from typing import Any

from app.agent_runtime.models import DecisionEvent, DecisionEventError, DecisionEventType


class EventBus:
    """Collects Decision Timeline events for one chat request."""

    def __init__(self, session_id: str, request_id: str) -> None:
        self.session_id = session_id
        self.request_id = request_id
        self._sequence = 0
        self.events: list[DecisionEvent] = []

    def emit(
        self,
        event: DecisionEventType,
        *,
        tool: str | None = None,
        agent: str | None = None,
        params: dict[str, Any] | None = None,
        result: Any | None = None,
        error: DecisionEventError | None = None,
        latency_ms: int | None = None,
        metadata: dict[str, Any] | None = None,
    ) -> DecisionEvent:
        self._sequence += 1
        record = DecisionEvent(
            event=event,
            timestamp=datetime.now(UTC).isoformat(),
            session_id=self.session_id,
            request_id=self.request_id,
            sequence=self._sequence,
            tool=tool,
            agent=agent,
            params=params,
            result=result,
            error=error,
            latency_ms=latency_ms,
            metadata=metadata,
        )
        self.events.append(record)
        return record

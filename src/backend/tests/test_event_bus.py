from app.agent_runtime.event_bus import EventBus
from app.agent_runtime.models import DecisionEventType


def test_event_bus_sequence():
    bus = EventBus("sess-1", "req-1")
    bus.emit(DecisionEventType.PROMPT_RECEIVED, metadata={"prompt": "hi"})
    bus.emit(DecisionEventType.INTENT_IDENTIFIED, metadata={"intent": "general"})
    assert len(bus.events) == 2
    assert bus.events[0].sequence == 1
    assert bus.events[1].sequence == 2

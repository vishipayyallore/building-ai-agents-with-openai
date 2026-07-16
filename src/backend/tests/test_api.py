import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app


@pytest.mark.asyncio
async def test_health():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/health")
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    assert body["maturityLevel"] == 2
    assert body["maturityName"] == "PROXY_AGENT"


@pytest.mark.asyncio
async def test_chat_missing_api_key(clear_openai_api_key):
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.post("/api/chat", json={"message": "hello"})
    assert response.status_code == 200
    body = response.json()
    assert body["events"][0]["event"] == "PromptReceived"
    assert body["maturityLevel"] == 2
    assert body["maturityName"] == "PROXY_AGENT"
    error_events = [e for e in body["events"] if e["event"] == "SystemErrorRaised"]
    assert len(error_events) == 1
    assert error_events[0]["error"]["code"] == "MISSING_API_KEY"
    assert "OPENAI_API_KEY" in body["response"]


@pytest.mark.asyncio
async def test_llm_missing_api_key(clear_openai_api_key):
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.post("/api/llm", json={"message": "hello"})
    assert response.status_code == 200
    body = response.json()
    assert "response" in body
    assert body["maturityLevel"] == 1
    assert body["maturityName"] == "DIRECT_LLM_INTERACTION"
    assert "events" not in body
    assert "OPENAI_API_KEY" in body["response"]

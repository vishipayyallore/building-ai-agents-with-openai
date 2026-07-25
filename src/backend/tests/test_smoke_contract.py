"""HTTP smoke contract — mirrors tools/psscripts/e2e-smoke.ps1 via ASGITransport.

Default pytest runs exclude ``integration`` tests (no live OpenAI/MCP).
The optional CI smoke job runs ``pytest -m integration`` when OPENAI_API_KEY is set.
"""

import os

import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app


@pytest.mark.asyncio
async def test_smoke_home_contract():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/")
    body = response.json()
    assert response.status_code == 200
    assert "application/json" in response.headers["content-type"]
    assert body["documentation"]["swagger"]["path"] == "/docs"
    assert body["documentation"]["openapi"]["path"] == "/openapi.json"
    assert body["documentation"]["redoc"]["path"] == "/redoc"
    assert body["maturityLevel"] == 2
    assert body["maturityName"] == "PROXY_AGENT"


@pytest.mark.asyncio
async def test_smoke_health_contract():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/health")
    body = response.json()
    assert response.status_code == 200
    assert body["status"] == "ok"
    assert body["maturityLevel"] == 2
    assert body["maturityName"] == "PROXY_AGENT"


@pytest.mark.asyncio
async def test_smoke_llm_level1_contract(clear_openai_api_key):
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.post("/api/llm", json={"message": "Say hi in one word"})
    body = response.json()
    assert response.status_code == 200
    assert body["maturityLevel"] == 1
    assert body["maturityName"] == "DIRECT_LLM_INTERACTION"
    assert body["response"]
    assert "events" not in body


@pytest.mark.asyncio
async def test_smoke_chat_missing_key_contract(clear_openai_api_key):
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.post("/api/chat", json={"message": "What is 15 * 23?"})
    body = response.json()
    assert response.status_code == 200
    assert body["maturityLevel"] == 2
    error_events = [e for e in body["events"] if e["event"] == "SystemErrorRaised"]
    assert len(error_events) == 1
    assert error_events[0]["error"]["code"] == "MISSING_API_KEY"


@pytest.mark.asyncio
@pytest.mark.integration
@pytest.mark.skipif(
    not os.getenv("OPENAI_API_KEY"), reason="OPENAI_API_KEY required for live smoke"
)
async def test_smoke_live_calculator_chat():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test", timeout=120.0) as client:
        chat = await client.post("/api/chat", json={"message": "What is 15 * 23?"})
    body = chat.json()
    assert chat.status_code == 200
    assert body["maturityLevel"] == 2
    assert body["maturityName"] == "PROXY_AGENT"
    assert len(body["events"]) >= 6
    assert "345" in body["response"]


@pytest.mark.asyncio
@pytest.mark.integration
@pytest.mark.skipif(
    not os.getenv("OPENAI_API_KEY"), reason="OPENAI_API_KEY required for live smoke"
)
async def test_smoke_live_general_chat_no_tool():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test", timeout=120.0) as client:
        chat = await client.post("/api/chat", json={"message": "What is SOLID?"})
    body = chat.json()
    tool_selected = [e for e in body["events"] if e["event"] == "ToolSelected"]
    assert chat.status_code == 200
    assert len(tool_selected) == 0

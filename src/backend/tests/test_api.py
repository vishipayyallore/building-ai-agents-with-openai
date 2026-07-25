import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app


@pytest.mark.asyncio
async def test_home():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/")
    assert response.status_code == 200
    assert "application/json" in response.headers["content-type"]
    body = response.json()
    assert body["name"] == "Agentic Engineering — Demo 1"
    assert body["version"] == "1.0.0"
    assert body["demo"] == "1"
    assert body["maturityLevel"] == 2
    assert body["maturityName"] == "PROXY_AGENT"
    docs = body["documentation"]
    assert docs["swagger"]["path"] == "/docs"
    assert "Swagger" in docs["swagger"]["description"]
    assert docs["openapi"]["path"] == "/openapi.json"
    assert "OpenAPI 3.1" in docs["openapi"]["description"]
    assert docs["redoc"]["path"] == "/redoc"
    assert "ReDoc" in docs["redoc"]["description"]
    paths = {endpoint["path"] for endpoint in body["endpoints"]}
    assert {"/", "/health", "/docs", "/openapi.json", "/redoc", "/api/llm", "/api/chat"} <= paths


@pytest.mark.asyncio
async def test_openapi_schema_is_v31():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/openapi.json")
    assert response.status_code == 200
    schema = response.json()
    assert schema["openapi"].startswith("3.1")
    assert schema["info"]["title"] == "Agentic Engineering — Demo 1"
    assert schema["info"]["version"] == "1.0.0"
    paths = schema["paths"]
    assert "/" in paths
    assert "/health" in paths
    assert "/api/llm" in paths
    assert "/api/chat" in paths


@pytest.mark.asyncio
async def test_swagger_docs_available():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/docs")
    assert response.status_code == 200
    assert "swagger" in response.text.lower()
    assert "/openapi.json" in response.text


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

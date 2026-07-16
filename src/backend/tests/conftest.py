import pytest

from app.config import settings


@pytest.fixture
def clear_openai_api_key(monkeypatch):
    """Isolate tests from a developer's local .env OPENAI_API_KEY."""
    monkeypatch.setattr(settings, "openai_api_key", "")


@pytest.fixture
def fake_openai_api_key(monkeypatch):
    monkeypatch.setattr(settings, "openai_api_key", "sk-test-fake-key")

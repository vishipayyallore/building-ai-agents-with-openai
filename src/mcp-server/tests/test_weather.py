from unittest.mock import MagicMock

import httpx
import pytest

from tools.weather import get_weather


def test_weather_demo_mode_without_api_key(monkeypatch):
    monkeypatch.delenv("OPENWEATHER_API_KEY", raising=False)
    result = get_weather("Seattle")
    assert "Seattle" in result
    assert "demo mode" in result.lower()


def test_weather_rejects_empty_city():
    with pytest.raises(ValueError, match="City is required"):
        get_weather("   ")


def test_weather_live_path_with_mocked_http(monkeypatch):
    monkeypatch.setenv("OPENWEATHER_API_KEY", "test-key")

    mock_response = MagicMock()
    mock_response.raise_for_status.return_value = None
    mock_response.json.return_value = {
        "weather": [{"description": "clear sky"}],
        "main": {"temp": 18.5},
    }

    mock_client = MagicMock()
    mock_client.get.return_value = mock_response
    mock_client.__enter__.return_value = mock_client
    mock_client.__exit__.return_value = None

    monkeypatch.setattr(httpx, "Client", lambda **_kwargs: mock_client)

    result = get_weather("Seattle")
    assert "18.5" in result
    assert "clear sky" in result
    mock_client.get.assert_called_once()

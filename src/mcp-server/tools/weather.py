"""Weather tool — OpenWeatherMap when configured, demo fallback otherwise."""

import os

import httpx

OPENWEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"


def get_weather(city: str) -> str:
    city = city.strip()
    if not city:
        raise ValueError("City is required")

    api_key = os.getenv("OPENWEATHER_API_KEY", "").strip()
    if not api_key:
        return (
            f"[demo mode] Weather in {city}: 22°C, partly cloudy. "
            "Set OPENWEATHER_API_KEY in config/.env for live data."
        )

    params = {"q": city, "appid": api_key, "units": "metric"}
    with httpx.Client(timeout=10.0) as client:
        response = client.get(OPENWEATHER_URL, params=params)
        response.raise_for_status()
        data = response.json()

    description = data["weather"][0]["description"]
    temp = data["main"]["temp"]
    return f"Weather in {city}: {temp}°C, {description}."

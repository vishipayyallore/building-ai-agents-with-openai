"""Level 1 — Direct LLM Interaction (§4.1).

Thin SDK wrapper: prompt → model → text. No MCP tools, no Decision Timeline
events, and no Agent Runtime orchestration beyond a minimal Agent + Runner call.
"""

from agents import Agent, Runner

from app.agent_runtime.models import (
    DIRECT_LLM_MATURITY_LEVEL,
    LlmResponse,
    maturity_fields,
)
from app.config import settings


async def run_direct_llm(message: str) -> LlmResponse:
    level = DIRECT_LLM_MATURITY_LEVEL
    if not settings.openai_api_key:
        return LlmResponse(
            response=(
                "Cannot call the model without OPENAI_API_KEY. "
                "Copy .env.example to config/.env and add your key."
            ),
            **maturity_fields(level),
        )

    agent = Agent(
        name="DirectLlm",
        instructions="You are a helpful assistant. Answer the user directly.",
        model=settings.openai_model,
    )
    result = await Runner.run(agent, input=message)
    return LlmResponse(response=str(result.final_output), **maturity_fields(level))

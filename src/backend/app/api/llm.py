from fastapi import APIRouter

from app.agent_runtime.direct_llm import run_direct_llm
from app.agent_runtime.models import LlmRequest, LlmResponse

router = APIRouter(prefix="/api", tags=["llm"])


@router.post("/llm", response_model=LlmResponse, response_model_by_alias=True)
async def llm(request: LlmRequest) -> LlmResponse:
    return await run_direct_llm(request.message)

from fastapi import APIRouter

from app.agent_runtime.agent import run_agent_chat
from app.agent_runtime.models import ChatRequest, ChatResponse

router = APIRouter(prefix="/api", tags=["chat"])


@router.post("/chat", response_model=ChatResponse, response_model_by_alias=True)
async def chat(request: ChatRequest) -> ChatResponse:
    return await run_agent_chat(request.message, session_id=request.session_id)

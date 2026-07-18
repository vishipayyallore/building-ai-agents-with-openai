import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.agent_runtime.models import CURRENT_MATURITY_LEVEL, HealthResponse, maturity_fields
from app.api.chat import router as chat_router
from app.api.llm import router as llm_router
from app.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    if settings.openai_api_key and not os.environ.get("OPENAI_API_KEY"):
        os.environ["OPENAI_API_KEY"] = settings.openai_api_key
    if settings.openweather_api_key and not os.environ.get("OPENWEATHER_API_KEY"):
        os.environ["OPENWEATHER_API_KEY"] = settings.openweather_api_key
    yield


app = FastAPI(
    title="Agentic Engineering — Demo 1",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router)
app.include_router(llm_router)


@app.get("/health", response_model=HealthResponse, response_model_by_alias=True)
async def health() -> HealthResponse:
    return HealthResponse(
        status="ok",
        demo="1",
        **maturity_fields(CURRENT_MATURITY_LEVEL),
    )

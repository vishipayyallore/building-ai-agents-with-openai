import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.agent_runtime.models import (
    CURRENT_MATURITY_LEVEL,
    HealthResponse,
    HomeDocLink,
    HomeDocumentation,
    HomeEndpoint,
    HomeResponse,
    maturity_fields,
)
from app.api.chat import router as chat_router
from app.api.llm import router as llm_router
from app.config import settings

APP_TITLE = "Agentic Engineering — Demo 1"
APP_VERSION = "1.0.0"
APP_SUMMARY = "Session 1 FastAPI backend — Direct LLM, Proxy Agent, and MCP tools."
APP_DESCRIPTION = """
## Agentic Engineering in Practice (Demo 1)

Interactive docs:
- **Swagger UI** — `/docs` (try requests in the browser)
- **ReDoc** — `/redoc`
- **OpenAPI 3.1** schema — `/openapi.json`

### Maturity paths
- **Level 1** — `POST /api/llm` — Direct LLM (no tools, no Decision Timeline)
- **Level 2** — `POST /api/chat` — Proxy Agent with MCP calculator + weather tools
"""

OPENAPI_TAGS = [
    {
        "name": "meta",
        "description": "Service discovery and health probes.",
    },
    {
        "name": "llm",
        "description": "Level 1 Direct LLM — thin Agent + Runner call; no MCP tools, no Decision Timeline.",
    },
    {
        "name": "chat",
        "description": "Level 2 Proxy Agent — OpenAI Agent SDK + MCP tools + Decision Timeline.",
    },
]


@asynccontextmanager
async def lifespan(app: FastAPI):
    if settings.openai_api_key and not os.environ.get("OPENAI_API_KEY"):
        os.environ["OPENAI_API_KEY"] = settings.openai_api_key
    yield


app = FastAPI(
    title=APP_TITLE,
    summary=APP_SUMMARY,
    description=APP_DESCRIPTION,
    version=APP_VERSION,
    openapi_url="/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_tags=OPENAPI_TAGS,
    swagger_ui_parameters={"tryItOutEnabled": True},
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


@app.get(
    "/",
    response_model=HomeResponse,
    response_model_by_alias=True,
    tags=["meta"],
    summary="API home (JSON)",
)
async def home() -> HomeResponse:
    """Return JSON discovery for this API — including Swagger and OpenAPI links."""
    return HomeResponse(
        name=APP_TITLE,
        version=APP_VERSION,
        summary=APP_SUMMARY,
        demo="1",
        documentation=HomeDocumentation(
            swagger=HomeDocLink(
                path="/docs",
                description="Swagger UI — interactive OpenAPI 3.1 docs (try requests in the browser)",
            ),
            openapi=HomeDocLink(
                path="/openapi.json",
                description="OpenAPI 3.1 schema — machine-readable contract for clients and codegen",
            ),
            redoc=HomeDocLink(
                path="/redoc",
                description="ReDoc — readable reference UI for the same OpenAPI schema",
            ),
        ),
        endpoints=[
            HomeEndpoint(
                method="GET",
                path="/",
                description="API home — JSON discovery (this response)",
            ),
            HomeEndpoint(
                method="GET",
                path="/health",
                description="Liveness probe with Demo 1 maturity fields",
            ),
            HomeEndpoint(
                method="GET",
                path="/docs",
                description="Swagger UI (OpenAPI 3.1)",
            ),
            HomeEndpoint(
                method="GET",
                path="/openapi.json",
                description="Machine-readable OpenAPI 3.1 schema",
            ),
            HomeEndpoint(
                method="GET",
                path="/redoc",
                description="ReDoc documentation UI",
            ),
            HomeEndpoint(
                method="POST",
                path="/api/llm",
                description="Level 1 Direct LLM",
            ),
            HomeEndpoint(
                method="POST",
                path="/api/chat",
                description="Level 2 Proxy Agent chat with Decision Timeline",
            ),
        ],
        **maturity_fields(CURRENT_MATURITY_LEVEL),
    )


@app.get(
    "/health",
    response_model=HealthResponse,
    response_model_by_alias=True,
    tags=["meta"],
    summary="Health check",
)
async def health() -> HealthResponse:
    return HealthResponse(
        status="ok",
        demo="1",
        **maturity_fields(CURRENT_MATURITY_LEVEL),
    )

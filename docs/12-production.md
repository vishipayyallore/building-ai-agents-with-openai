# Production Agentic Engineering

> **Status:** 📅 Planned — Session 7 (`v7.0-production-foundations`)  
> **Prerequisite:** Sessions 1–6

Session 7 introduces **production foundations** — Docker packaging, deploy-oriented GitHub Actions, formal smoke suites, structured logging, production-grade health probes, and foundational observability. Demo 1 already exposes a basic `GET /health` endpoint and CI lint/test workflows; Session 7 hardens and expands that baseline.

## Plain English

Sessions 1–6 prove the agent **works**. Session 7 proves it can **run reliably** in a production-like engineering workflow: packaged, logged, health-checked, and smoke-tested.

**Business scenario:** Preparing the IT helpdesk bot for internal review requires reproducible packaging, health checks, logs, and a deploy pipeline — not just a localhost dashboard.

## Planned capabilities

| Area | Session 7 additions |
| ---- | ---------------- |
| **Logging** | Structured logs for requests, tool calls, and failures |
| **Health checks** | Production probes beyond Demo 1's basic `GET /health` (readiness/liveness, dependency checks) |
| **Docker** | `docker-compose.yml` for reproducible environments |
| **CI/CD** | Lint, build, deploy, **smoke tests** |

## Planned code additions

```text
src/backend/app/
    observability/       # logging, health checks, basic traces
.github/workflows/
    ci-deploy.yml
docker-compose.yml
tests/smoke/
    test_health.py
    test_chat_roundtrip.py
```

The repository already has CI workflows, a Demo 1 `GET /health` endpoint, backend smoke-contract tests under `src/backend/tests/`, and a local smoke script under `tools/e2e-smoke.ps1`. Session 7 formalizes those into a repeatable production-foundation workflow (Docker Compose, deploy pipeline, dedicated `tests/smoke/`).

## Session 7 vs Session 8 testing boundary

| | Session 7 | Session 8 |
| - | --------- | --------- |
| CI | Smoke tests — app starts, chat works, tool happy path | Eval harness + golden datasets |
| Question answered | "Does it run in prod-like env?" | "Is agent quality regressing?" |

See [02-master-plan.md § Curriculum roadmap](./02-master-plan.md#10-curriculum-roadmap).

## Observability and DecisionEvent

Demo 1 already emits structured events. Session 7 **indexes the same stream** for tracing and dashboards — no redesign of the Session 1 contract.

New UI panels (planned):

- System Health
- Request Logging
- Basic Metrics

## Smoke test expectations (planned)

```powershell
uv run pytest tests/smoke/ -q
# health endpoint, chat round-trip, tool-call happy path
```

Until those Session 7 pytest smoke tests exist, use `tools/e2e-smoke.ps1` against a running backend for the local integration smoke path.

## Docker workflow (planned)

```powershell
docker compose up --build
# frontend + backend + mcp-server orchestrated
```

Exact commands will land with the Session 7 scaffold.

## Related

- [13-observability-dashboard.md](./13-observability-dashboard.md) — event contract Session 7 consumes
- [presentation/demo-07/README.md](../presentation/demo-07/README.md)
- [02-master-plan.md § Curriculum roadmap](./02-master-plan.md#10-curriculum-roadmap)

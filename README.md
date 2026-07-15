# Agentic Engineering in Practice

> A hands-on repository for learning and building AI Agents using **React**, **FastAPI**, **OpenAI Agent SDK**, and **Model Context Protocol (MCP)**.

## Overview

Artificial Intelligence is transforming software development—from chat-based assistants to autonomous agents capable of reasoning, planning, and interacting with external systems through tools.

This repository is a practical, code-first journey into **Agentic Engineering**. Each iteration introduces a new capability while maintaining a clean, production-inspired architecture.

**Audience:** practicing software engineers new to agentic system design — see [Audience Contract](docs/02-master-plan.md#audience-contract) in the master plan for prerequisites and expected outcomes.

Whether you're a software engineer, architect, or AI enthusiast, the goal is to help you understand **how AI agents work** and **how to build them**.

---

## Objectives

* Learn AI Agent fundamentals
* Build end-to-end agent applications
* Understand the OpenAI Agent SDK
* Learn the Model Context Protocol (MCP)
* Integrate external tools with AI Agents
* Apply software engineering best practices to AI systems

---

## Technology Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

### Backend

* Python 3.13
* FastAPI
* OpenAI Agent SDK
* Pydantic

### AI & Tooling

* OpenAI Models
* Model Context Protocol (MCP)
* FastMCP

---

# Repository Structure

This repository has **three complementary parts**:

1. **Application** — `src/` — the single evolving product
2. **Course** — `sessions/` — learning packages bound to Git tags
3. **Architecture & governance** — `docs/` — master plan, ADRs, global guides

Supporting roots: `_meta/` (publishing), `_internal/` (never published), `tools/`, `assets/` (prefer `assets/images/` for shared media), `examples/`.

**Two products:** this private repo is the **Engineering Organization**; `building-ai-agents-with-openai` is the **Teaching Product** (versioned projection via `_meta/Publish-Release.ps1`). See [ADR-008](docs/ADRs/ADR-008-product-organization-publishing.md).

**Repository Architecture v1.0** is frozen. Structural changes to top-level folders or ownership boundaries need a new ADR. Adding sessions, docs, code, tests, and assets does not.

From here the work is product delivery: session content, milestone tags (`v1.0-build-your-first-agent` …), and the public publish pipeline — not further repository redesign.

Canonical layout: [docs/01-repository-structure.md](docs/01-repository-structure.md)

```text
agentic-engineering-in-practice/

src/                 # The product (ADR-001)
├── frontend/
├── backend/
└── mcp-server/

sessions/            # The course — pedagogical projection of src/ (no nested src/)
docs/                # Architecture & governance
presentation/        # Live scripts (migrating into sessions/*/presentation/)
examples/
assets/
tools/
_meta/
_internal/

README.md
```

Product organization and publishing: [ADR-008](docs/ADRs/ADR-008-product-organization-publishing.md).

---

# Learning Roadmap

This repository evolves through a series of practical demonstrations.

## Session 1 – Build Your First AI Agent

**Status:** ✅ Released (`v1.0-build-your-first-agent`)

Topics

* Agent Dashboard (Home, Level 1, Level 2)
* Decision Timeline and Tool Registry
* FastAPI Backend
* OpenAI Agent SDK
* MCP Server
* Calculator Tool
* Weather Tool
* Tool Calling
* Agent Decision Flow

---

## Session 2 – Stateful Agents

Planned topics

* Conversation Sessions
* SQLite Persistence
* Streaming Responses
* Session Management

Question: **How does an Agent continue a conversation?**

---

## Session 3 – Multi-Provider Agents

Planned topics

* Provider Pattern
* OpenAI Provider
* AWS Bedrock Provider
* IAM and Bedrock Runtime
* Optional Azure OpenAI Extension

Question: **How do we make our Agent cloud-provider independent?**

---

## Session 4 – Context Engineering

Planned topics

* Context Window
* Token Limits
* Sliding Window
* Context Compression
* Summarization
* Prompt Assembly

Question: **What should I actually send to the LLM?**

---

## Session 5 – Knowledge-Driven Agents

Planned topics

* Retrieval-Augmented Generation (RAG)
* Vector Databases
* Embeddings
* Semantic Search
* Enterprise Knowledge

Question: **How does an Agent know things it was never trained on?**

---

## Session 6 – Multi-Agent Engineering

Planned topics

* Specialized Agents
* Planning
* Delegation
* Agent Coordination
* Workflow Orchestration

Question: **How do Agents collaborate?**

---

## Session 7 – Production Foundations

Planned topics

* Logging
* Health Checks
* Docker
* CI/CD
* Foundational Observability

Question: **How do we package and run our application?**

---

## Session 8 – Evaluation & Guardrails

Planned topics

* Evals
* Guardrails
* Regression Testing
* Prompt Injection

Question: **How do we know our Agent is correct and safe?**

---

## Session 9 – Local Capstone

Planned topics

* Complete local application
* Scenario configuration
* End-to-end dashboard demo

Question: **Can we build a complete local AI application?**

---

## Phase II – AI Platform Engineering

| Session | Title | Question |
| ------- | ----- | -------- |
| 10 | Distributed Persistence | How do we persist data across services? |
| 11 | Event-Driven AI | How do services communicate asynchronously? |
| 12 | Cloud-Native AI | How do we orchestrate distributed services and model traffic? |
| 13 | Kubernetes & Cloud | How do we deploy to the cloud? |
| 14 | Enterprise Operations | How do we operate the platform? |
| 15 | Enterprise Capstone | Can we run the complete enterprise system? |

---

# Demo 1 Architecture

```text
        Agent Dashboard (React)
                    │
                    ▼
             Python FastAPI
                    │
                    ▼
                         Agent Runtime
                         ┌─────────┴─────────┐
                         │                   │
                         ▼                   ▼
                 OpenAI Agent SDK    MCP Server
                                    ┌────┴────┐
                                    ▼         ▼
                                Calculator Weather
```

---

# What You'll Learn

* What an AI Agent is
* How an AI Agent differs from a chatbot
* How AI Agents reason about tasks
* How AI Agents use external tools
* How MCP standardizes tool integration
* How to build an AI Agent from scratch

---

# Repository Philosophy

This repository emphasizes:

* Simplicity over complexity
* Hands-on learning
* Incremental development
* Clean architecture
* Practical engineering

Each demo builds on the previous one, gradually introducing more advanced concepts without overwhelming the learner.

---

# Getting Started

**Demo 1** is implemented and runnable for the July session. Full setup: [docs/03-getting-started.md](docs/03-getting-started.md)

### Quick start

```powershell
copy .env.example .env
# Add OPENAI_API_KEY to .env
# Provider switching (OpenAI, AWS Bedrock, Azure OpenAI) arrives in Session 3

uv sync --all-groups
uv run uvicorn app.main:app --app-dir src/backend --reload --port 8000
# New terminal:
cd src\frontend && npm install && npm run dev
```

Open [http://localhost:5173/demo/level-2](http://localhost:5173/demo/level-2) (or Home → **Open Agent Dashboard**) and try:

- `What is 15 * 23?`
- `What's the weather in Seattle?`

---

# Documentation

Educational content lives in two layers:

- **Global spine** — `docs/` (concepts, ADRs, architecture)
- **Course packages** — `sessions/` (learner packaging bound to Git tags)

Presenter scripts remain under `presentation/demo-0N/` until migrated into session packages ([ADR-008](docs/ADRs/ADR-008-product-organization-publishing.md)).

Start with [docs/03-getting-started.md](docs/03-getting-started.md) and [sessions/session-01-build-your-first-agent/README.md](sessions/session-01-build-your-first-agent/README.md), then follow the topic guides below.

**Series plan:** [docs/02-master-plan.md](docs/02-master-plan.md)

| Doc | Topic | Status |
| --- | ----- | ------ |
| [04-introduction.md](docs/04-introduction.md) | Series overview | ✅ |
| [05-ai-agents.md](docs/05-ai-agents.md) | Agent vs chatbot | ✅ Demo 1 |
| [06-openai-agent-sdk.md](docs/06-openai-agent-sdk.md) | OpenAI Agent SDK | ✅ Demo 1 |
| [07-mcp.md](docs/07-mcp.md) | Model Context Protocol | ✅ Demo 1 |
| [08-tool-calling.md](docs/08-tool-calling.md) | Tool calling flow | ✅ Demo 1 |
| [09-context-engineering.md](docs/09-context-engineering.md) | Context engineering | 📅 Session 4 |
| [10-rag.md](docs/10-rag.md) | RAG | 📅 Session 5 |
| [11-multi-agent.md](docs/11-multi-agent.md) | Multi-agent | 📅 Session 6 |
| [12-production.md](docs/12-production.md) | Production | 📅 Session 7 |
| [13-observability-dashboard.md](docs/13-observability-dashboard.md) | Agent Dashboard contract | ✅ |
| [14-versioning-branching.md](docs/14-versioning-branching.md) | Git tags and branching | ✅ |
| [15-evaluation-guardrails.md](docs/15-evaluation-guardrails.md) | Evaluation & guardrails | 📅 Session 8 |
| [16-releases.md](docs/16-releases.md) | Tag + GitHub Release command track | ✅ |

Architecture detail: [docs/architecture/demo-1-stack.md](docs/architecture/demo-1-stack.md)

---

# Presentation Series

This repository accompanies the **Swamy's Tech Skills Academy** sessions.

| Demo | Topic                          | Status |
| ---- | ------------------------------ | ------ |
| 1    | Build Your First AI Agent      | ✅ Released (`v1.0-build-your-first-agent`) |
| 2    | Stateful Agents                | 📅     |
| 3    | Multi-Provider Agents          | 📅     |
| 4    | Context Engineering            | 📅     |
| 5    | Knowledge-Driven Agents        | 📅     |
| 6    | Multi-Agent Engineering        | 📅     |
| 7    | Production Foundations         | 📅     |
| 8    | Evaluation & Guardrails        | 📅     |
| 9    | Local Capstone                 | 📅     |
| 10   | Distributed Persistence        | 📅     |
| 11   | Event-Driven AI                | 📅     |
| 12   | Cloud-Native AI                | 📅     |
| 13   | Kubernetes & Cloud             | 📅     |
| 14   | Enterprise Operations          | 📅     |
| 15   | Enterprise Capstone            | 📅     |

---

# Contributing

Contributions, feedback, and suggestions are welcome.

If you find this repository useful, consider starring it and following along as new demos are added.

---

# License

This project is licensed under the MIT License.

---

# References

* [OpenAI](https://openai.com/) — AI models and the Agent SDK used throughout this project
* [OpenWeatherMap](https://openweathermap.org/) — Weather API powering the weather tool in the MCP server

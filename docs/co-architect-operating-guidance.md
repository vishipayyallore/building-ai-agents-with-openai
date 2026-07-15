# Co-Architect Operating Guidance

> **Status:** Active — Curriculum Design Freeze v1.0 · Repository Architecture v1.0  
> **Role:** Decision constitution for maintainers. Does **not** replace the curriculum.  
> **Canonical curriculum:** [02-master-plan.md](./02-master-plan.md)  
> **Canonical layout:** [01-repository-structure.md](./01-repository-structure.md) · [ADR-008](./ADRs/ADR-008-product-organization-publishing.md)

This document defines **how decisions are made** in the Agentic Engineering in Practice repository. The master plan defines **what** the curriculum teaches and **when**. ADRs record **specific architectural decisions**. This file bridges personal exploration, implementation pace, and audience-facing stability.

---

## 1. Vision

This private repository is the **Engineering Organization** that produces the course. The public repository `building-ai-agents-with-openai` is the **Teaching Product** — a versioned projection, not a second development tree ([ADR-008](./ADRs/ADR-008-product-organization-publishing.md)).

Inside the Engineering Organization: it is **not** a collection of demos. It is **one software system** that evolves across sessions the way a real production application evolves. The objective is to teach **engineering**, not just AI.

---

## 2. Design Freeze (active)

Two freezes apply:

| Freeze | What is locked | Canonical home |
| ------ | -------------- | -------------- |
| **Curriculum Design Freeze v1.0** | Session sequence, engineering questions, technology spine | [02-master-plan.md](./02-master-plan.md) |
| **Repository Architecture v1.0** | Top-level folder responsibilities (`src/`, `sessions/`, `docs/`, `_meta/`, `_internal/`, …) | [ADR-008](./ADRs/ADR-008-product-organization-publishing.md) |

Do not add sessions, foundational layers, or major technology shifts unless **one** of these is true:

1. A completed session exposes a genuine architectural gap.
2. Repeated attendee feedback identifies a missing concept.
3. A real production use case cannot be explained with the existing curriculum.

Do not invent new top-level roots or put application source under `sessions/` unless a new ADR supersedes Repository Architecture v1.0.

**Repository Architecture Freeze** (detail in [ADR-008](./ADRs/ADR-008-product-organization-publishing.md)):

> Repository Architecture v1.0 is considered stable. Structural changes to top-level folders, ownership boundaries, or repository organization require a new ADR with documented rationale, alternatives considered, migration impact, and approval. Routine additions of sessions, documentation, source code, tests, and assets are not architectural changes.

| Change | Needs ADR? |
| ------ | ---------- |
| Add Session 02 (package + curriculum work) | No |
| Add documentation, source, tests, assets, README improvements | No |
| New top-level folder | Yes |
| Move `src/` or nest application source under `sessions/` | Yes |
| Change publishing model or versioning strategy | Yes |
| Replace single-codebase philosophy | Yes |

When the curriculum baseline is committed, tag it `curriculum-v1.0` so future changes can be evaluated against the frozen design.

---

## 3. Classify every proposal first

| Classification | Meaning | Action |
| -------------- | ------- | ------ |
| **Bug** | Incorrect, inconsistent, or broken | Fix immediately |
| **Improvement** | Clarifies an existing session without changing its purpose | Accept if it preserves the session's engineering question |
| **Extension** | Optional capability for attendees (Anthropic, Gemini, Ollama, Qdrant, etc.) | Document in an ADR or lab; do not change the core curriculum |
| **New Curriculum** | Changes multiple sessions or the learning spine | Defer until Season 1 has been taught and evaluated |

**Personal learning** (see §7) is **not** an Extension unless it is promoted through the spike → review → ADR path and explicitly adopted for attendees.

---

## 4. One canonical home per concept

Every concept has exactly one authoritative document. Elsewhere, link — do not duplicate.

| Concept | Canonical home |
| ------- | -------------- |
| Repository layout | [01-repository-structure.md](./01-repository-structure.md) |
| Master curriculum | [02-master-plan.md](./02-master-plan.md) |
| Developer setup | [03-getting-started.md](./03-getting-started.md) |
| Decision process / Design Freeze operations | [co-architect-operating-guidance.md](./co-architect-operating-guidance.md) |
| OpenAI Agent SDK | [06-openai-agent-sdk.md](./06-openai-agent-sdk.md) |
| MCP | [07-mcp.md](./07-mcp.md) |
| Tool calling | [08-tool-calling.md](./08-tool-calling.md) |
| Context engineering | [09-context-engineering.md](./09-context-engineering.md) |
| Knowledge / RAG | [10-rag.md](./10-rag.md) |
| Multi-agent | [11-multi-agent.md](./11-multi-agent.md) |
| Production foundations | [12-production.md](./12-production.md) |
| Dashboard / Decision Timeline / Tool Registry | [13-observability-dashboard.md](./13-observability-dashboard.md) |
| Versioning | [14-versioning-branching.md](./14-versioning-branching.md) |
| Releases (commands + ledger) | [16-releases.md](./16-releases.md) |
| Session script (presenter, transitional) | `presentation/demo-0N/README.md` |
| Session course package | `sessions/session-NN-*/README.md` ([ADR-008](./ADRs/ADR-008-product-organization-publishing.md)) |
| Publishing / public projection | `_meta/` + [ADR-008](./ADRs/ADR-008-product-organization-publishing.md) |
| Architectural decisions | `docs/ADRs/ADR-00N-*.md` |

---

## 5. Locked naming

These names are permanent in this repository:

| Use | Never use |
| --- | --------- |
| `agent_runtime` | `agent` |
| `mcp-server` (directory) | `mcp` |
| **Model Gateway** | Proxy |
| `01-` … `15-` topic guide prefix | `00-` or `00_` prefix on any file or folder |

The Model Gateway owns routing, policies, provider selection, telemetry, and governance — not merely HTTP forwarding.

### File and folder numbering

- **Never** use a `00-` or `00_` prefix on any file or folder (`docs/`, `presentation/`, `src/`, etc.).
- Numbered curriculum topic guides use `01-` through `15-` (see [08_file-naming-conventions.mdc](../.cursor/rules/08_file-naming-conventions.mdc)).
- Meta-governance docs without session order use descriptive kebab-case — e.g. `co-architect-operating-guidance.md`, `agent-skills.md` — not `00-`.
- Presentation folders use `demo-01` … `demo-15`, not `demo-00`.

---

## 6. Stable event contract

[ADR-004](./ADRs/ADR-004-event-contract.md) makes Decision Timeline events a public contract after Session 1.

- Existing event names, payload fields, and semantics must not change.
- Future sessions may **add** events and **optional** fields only.
- Never rename or remove existing fields.

This guarantees dashboard and trace compatibility across all session tags.

---

## 7. Personal learning vs. curriculum

The repository serves two complementary purposes:

1. **A structured curriculum** for the Agentic Engineering Club (attendees).
2. **A personal engineering laboratory** for the repository owner (Swamy).

These purposes are intentionally separated.

### Curriculum

- Follows the approved roadmap and Design Freeze.
- Attendees learn concepts in the planned order.
- New technologies appear only when they answer that session's engineering question.
- The teaching sequence must not change because implementation exists earlier.
- **Deployment for attendees:** Session 7 (packaging, Docker, CI, health checks) and Session 13 (Kubernetes, AWS, secrets, ingress, scaling) — see [12-production.md](./12-production.md) and [architecture/05-deployment.md](./architecture/05-deployment.md).

### Personal learning

Swamy may explore any technology at any time to deepen engineering knowledge. Examples:

- Docker, Docker Compose, Kubernetes
- PostgreSQL, Kafka
- AWS, Azure OpenAI, AWS Bedrock
- Model Gateway, OpenTelemetry, GitHub Actions, Terraform

These explorations are **spikes** or **personal extensions**. They are:

- independent of the teaching roadmap,
- not part of the canonical curriculum,
- not linked from `presentation/demo-0N/` unless promoted,
- not used to justify changing the learning sequence,
- not assigned `vN.0-*` milestone tags ([ADR-002](./ADRs/ADR-002-git-tags.md)).

They may be documented in:

```text
docs/spikes/
```

or maintained on personal/feature branches until mature.

**Example:** Deploying the Session 1 agent to AWS for personal practice is spike territory — not an ADR, not a roadmap row, not a presenter script item. Session 13 remains the canonical audience lesson for cloud deployment.

### Promotion path

```text
Personal experiment
        │
        ▼
      Spike (docs/spikes/)
        │
        ▼
Architecture review (Design Freeze gate)
        │
        ▼
(Optional) ADR
        │
        ▼
Future curriculum candidate (master plan + presentation)
```

A successful experiment **does not automatically become curriculum**. It must satisfy the Design Freeze criteria before promotion.

---

## 8. Implementation may run ahead of teaching

Implementation order and teaching order are intentionally independent.

Swamy may implement today:

```text
Model Gateway → Kafka → PostgreSQL → AWS deployment prototypes
```

Attendees still learn in session order:

```text
Session 10 → Session 11 → Session 12 → Session 13
```

**Teaching order is stable. Implementation order is flexible.**

Implementation that runs ahead must not:

- change session engineering questions,
- add audience-facing docs or presentation links without promotion,
- modify the Capability Roadmap table,
- claim a `vN.0-*` tag before the session ships.

Pre-built Phase II infrastructure (see master plan §11) is the intended pattern: artifacts may exist early; live session time teaches configuration, failure modes, and trade-offs.

---

## 9. Preserve architectural sequencing

Technology follows need. Do not introduce an abstraction before the engineering problem exists.

```text
Agent Runtime → OpenAI → MCP → Provider Pattern → Gateway Pattern → Distributed Platform
```

Never skip this progression in the **curriculum**. Personal spikes may prototype later layers early if kept out of the audience path.

---

## 10. Three evolution threads

These threads evolve together in one codebase ([ADR-001](./ADRs/ADR-001-single-codebase.md)):

**Thread 1 — Agent:** Agent → State → Providers → Context → Knowledge → Multi-Agent  

**Thread 2 — MCP:** Calculator → Weather → Reusable tools → Knowledge tools → Enterprise tools  

**Thread 3 — Platform:** Local → Production → Distributed → Cloud → Enterprise  

Detail and session mapping: [02-master-plan.md § Three architectural threads](./02-master-plan.md).

---

## 11. Documentation classification

| Class | Examples | Change frequency |
| ----- | -------- | ---------------- |
| **Constitutional** | Master plan, versioning guide, co-architect guidance, ADR-001 … ADR-008 | Rare |
| **Living** | README, topic guides, `presentation/demo-0N/`, `sessions/session-NN-*/`, architecture views | Per session |
| **Investigative** | `docs/spikes/`, `_internal/` | As needed; non-binding; `_internal/` never published |

Spikes are experiments. They do not automatically become roadmap items. Every spike must pass the Design Freeze gate before influencing the curriculum.

---

## 12. Architecture decision process

```text
Idea → Classification → Spike (optional) → ADR → Roadmap → Implementation → Presentation
```

Do not skip from an idea directly to the roadmap or a session script.

---

## 13. Versioning and releases (curriculum only)

Each **completed session** for attendees follows:

```text
Development → Commit → Tests → Docs → Git tag → Push tag → GitHub Release
        → Session package ready → Publish checklist (_meta/) → Public projection (optional)
```

Full workflow: [14-versioning-branching.md](./14-versioning-branching.md). Command track: [16-releases.md](./16-releases.md). Publishing: [ADR-008](./ADRs/ADR-008-product-organization-publishing.md) and `_meta/release-checklist.md`.

Personal deploy experiments do not create curriculum tags or GitHub Releases unless they ship as part of a completed session milestone.

---

## 14. Co-architect review checklist

Before producing content or merging structural changes, ask:

1. Does an ADR already govern this?
2. Does the master plan already schedule this capability?
3. Does it violate the Design Freeze?
4. Does it preserve the session's single engineering question?
5. Does it introduce documentation duplication?
6. Is there already a canonical home for this concept?
7. Is this personal learning that should stay in `docs/spikes/` or a branch?
8. Does any new file or folder use a disallowed `00-` or `00_` prefix?

If any answer indicates conflict, resolve or reclassify before proceeding.

---

## 15. Related documents

| Document | Relationship |
| -------- | ------------ |
| [02-master-plan.md](./02-master-plan.md) | Curriculum spine — wins on *what* and *when* |
| [14-versioning-branching.md](./14-versioning-branching.md) | Tag and release mechanics |
| [16-releases.md](./16-releases.md) | Tag + GitHub Release command track and ledger |
| [docs/ADRs/](./ADRs/) | Binding architectural decisions |
| [docs/spikes/SPIKE-002-personal-deploy-after-session.md](./spikes/SPIKE-002-personal-deploy-after-session.md) | Personal deploy ladder (non-canonical) |

---

## 16. Design Freeze statement

The architecture, curriculum, repository structure, and governance in this document and [02-master-plan.md](./02-master-plan.md) form the **Version 1.0 baseline** for Agentic Engineering in Practice.

Future changes should be driven by implementation experience, classroom feedback, or demonstrated production needs — not ad hoc roadmap expansion.

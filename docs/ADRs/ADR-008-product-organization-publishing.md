# ADR-008: Product Organization & Publishing Pipeline

## Status

Accepted

## Context

This repository serves two complementary jobs that were previously conflated into one layout:

1. **Engineering product** — one evolving agent application (`src/`), taught as architectural growth across fifteen sessions ([ADR-001](./ADR-001-single-codebase.md), [ADR-002](./ADR-002-git-tags.md)).
2. **Course product** — learner-facing packaging: session READMEs, walkthroughs, exercises, presentation companions, and a public GitHub artifact (`building-ai-agents-with-openai`).

A proposal to split `src/` into fifteen independently runnable applications was rejected. That model would improve topic portability but would hide how a real system evolves and would duplicate shared contracts (Decision Timeline, MCP tools, dashboard).

What we still need is a professional way to:

- keep private engineering artifacts out of the public course,
- package each session for discoverability without copying the application,
- publish a curated projection to the public repository.

## Decision

Introduce a **product-organization layout** and a **publishing pipeline**. Do **not** supersede ADR-001.

### Two products (not two competing codebases)

```text
                Engineering Organization
                          │
                          ▼
      agentic-engineering-in-practice (private)
                          │
            Build · Research · Design · Validate
                          │
                    Release pipeline (_meta/)
                          │
                          ▼
     building-ai-agents-with-openai (public)
                          │
          Learn · Demo · Conference · Workshop
```

| Product | Repository | Mission | Audience |
| ------- | ---------- | ------- | -------- |
| **Engineering Organization** | `agentic-engineering-in-practice` | Engineer the course | Maintainers / presenters |
| **Teaching Product** | `building-ai-agents-with-openai` | Teach engineers | Students / workshop / conference |

> **The private repository is the Engineering Organization. The public repository is the Teaching Product. The application has a single source of truth in the private repository. Every public release is a reproducible, versioned projection of that source.**

Thinking in **products** (not “two repos to maintain in parallel”) keeps ownership clear: engineers work only in private; learners consume only public projections.

### Orthogonal concerns

| Concern | Governing rule | Location |
| ------- | -------------- | -------- |
| How the application evolves | [ADR-001](./ADR-001-single-codebase.md), [ADR-002](./ADR-002-git-tags.md) | `src/` + Git tags |
| How learners consume the material | This ADR | `sessions/`, `_meta/`, public repo |
| Engineering-only scratch space | This ADR | `_internal/` |

### Three first-class citizens

| Citizen | Path | Responsibility |
| ------- | ---- | -------------- |
| **The application** | `src/` | One production-inspired app that evolves across sessions |
| **The course** | `sessions/` | Learning packages that **explain** `src/` at a tag — they never contain another `src/` |
| **Architecture & governance** | `docs/` | Global spine, ADRs, master plan, architecture views |

Sessions teach the application. They do not own it. Bug fixes and refactors happen in exactly one place: `src/`.

> **The `sessions/` directory is a pedagogical projection of the application. It is not an alternative application structure.**

Contributors must not add `src/` under a session folder. Session 6 (or any session) still runs the root application at its milestone tag.

### Repository Architecture v1.0 (frozen)

| Concern | Owner |
| ------- | ----- |
| Application | `src/` |
| Course material | `sessions/` |
| Architecture decisions & global docs | `docs/` |
| Personal engineering notes | `_internal/` |
| Publishing & release meta | `_meta/` |
| Tooling | `tools/` |
| Shared assets | `assets/` |
| Examples (talks/blogs) | `examples/` |

This top-level responsibility map is **Repository Architecture v1.0**. Completing the migration backlog below does not reopen inventing new roots.

#### Repository Architecture Freeze

Repository Architecture v1.0 is considered stable.

Structural changes to top-level folders, ownership boundaries, or repository organization require a **new ADR** with documented rationale, alternatives considered, migration impact, and approval.

Routine additions of sessions, documentation, source code, tests, and assets are **not** architectural changes.

#### Complementary ADRs

| ADR | Role |
| --- | ---- |
| [ADR-001](./ADR-001-single-codebase.md) | **What** evolves — one application |
| [ADR-002](./ADR-002-git-tags.md) | **How** it evolves — Git tags as milestones |
| [ADR-008](./ADR-008-product-organization-publishing.md) | **How it is presented** — course as pedagogical projection; private → public publish |

These three complement each other; they do not compete.

```text
agentic-engineering-in-practice/
├── src/                 # Single evolving application (ADR-001)
├── docs/                # Global spine only (structure, master plan, ADRs, architecture, governance)
├── sessions/            # Course packages — no application copy
│   └── session-NN-*/
│       ├── README.md
│       ├── version.md   # Required: tag / previous / next binding
│       ├── docs/        # Session learning material (migrated gradually)
│       ├── presentation/
│       ├── exercises/
│       ├── solutions/
│       ├── assets/
│       └── release-notes.md
│       # NO src/ — application stays at repository root
├── examples/            # Reusable snippets for talks/blogs (optional; not a second app)
├── assets/              # Shared media (images, gifs, sample data) — replaces root images/
├── tools/
├── _meta/               # Publishing manifest, checklist, publish.py / publish.ps1
└── _internal/           # Never published
```

**Layout Freeze / Repository Architecture v1.0:** The top-level map above is frozen. After the migration backlog below completes, resist further top-level reorganization. New effort should go to session content, demos, and releases—not folder redesign. Structural exceptions require a new ADR.

### `_internal/`

Private notebook for maintainers. Never included in the public publish set. May contain discussions, prompts, research, spikes-in-progress, meeting notes, recordings pointers, drafts, backlog, and ideas. Binding curriculum and accepted ADRs remain under `docs/`.

### `_meta/`

Repository management for releases: publishing manifest, publish script or documented procedure, release checklist, and naming notes for the public artifact.

### `sessions/`

Course packaging only. Rules:

- A session package **must not** contain a second copy of `src/frontend`, `src/backend`, or `src/mcp-server`.
- A session package **must** declare the milestone Git tag (e.g. `v1.0-build-your-first-agent`) as the runnable application checkpoint ([ADR-002](./ADR-002-git-tags.md)).
- Every session package **must** include `version.md` using the standard template in `sessions/_templates/version.md` (tag, ADR baseline, entry point, run paths, objectives, previous/next, commit, release date).
- Session `README.md` **must** include: objectives, architecture, prerequisites, repository tag, how to checkout, how to run, walkthrough, exercises, further reading, next session.
- Prefer one cohesive package: README, `version.md`, presentation, session docs, exercises, solutions, assets, release notes.
- Reminder: `sessions/` is a pedagogical projection of the application — not an alternative application structure.

### Migration backlog (ordered; do not redesign beyond this)

| Priority | Change | Status |
| -------- | ------ | ------ |
| 1 | Move `presentation/demo-0N/` → `sessions/session-NN-*/presentation/` (update links + governance mirrors in the same change) | Pending |
| 2 | Gradually relocate session-specific topic guides (e.g. AI agents, SDK, MCP for Session 1) into `sessions/session-NN-*/docs/`; leave global spine under root `docs/` | Pending — gradual |
| 3 | Prefer shared media under `assets/` (e.g. `assets/images/`) instead of a root `images/` tree | Accepted — use `assets/` |
| 4 | Ensure `__pycache__/`, `*.pyc`, `.pytest_cache/` never enter version control (gitignore + purge if tracked) | Hygiene — verified clean |
| 5 | Scaffold `sessions/session-02` … `session-15` with placeholder `version.md` | Done |
| 6 | Implement `_meta/Publish-Release.ps1` and finalize publish manifest | Partial — script exists; `released_sessions` still commented until Session 1 tag + publish |
| — | Root `examples/` for talk/blog snippets | Allowed now; empty until needed |
| — | Move `src/*/tests` → root `tests/` | **Deferred / optional** — not required for Layout Freeze |

Until Priority 1 completes, `presentation/demo-0N/` remains the live presenter home and session packages link to it.

### Publishing pipeline

```text
Private Engineering Organization (source of truth)
        │
        ▼
Quality gates → _meta/release-checklist.md
        │
        ▼
_meta/Publish-Release.ps1  (manifest-driven projection)
        │
        ▼
Teaching Product: building-ai-agents-with-openai
```

Public `src/` is a **projection** of private `src/` at a tagged milestone. Do not develop the application in the public repository.

### Public repository projection (Teaching Product)

```text
building-ai-agents-with-openai/
├── README.md              # Learner landing page
├── LICENSE
├── CHANGELOG.md           # When public releases begin
├── src/                   # Projected from private (not edited in public)
├── sessions/              # Course packages
├── docs/                  # Curated global spine
├── presentation/          # Slides / demo scripts (projected)
├── assets/
├── examples/
├── tools/                 # Learner-safe tooling subset as allowed by manifest
└── .env.example / pyproject.toml / package manifests as needed
```

Community files (`CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, issue templates) belong primarily in the **public** product.

Publish **excludes**: `_internal/`, `_meta/`, private GitHub assets, spikes drafts, IDE folders, secrets, and generated caches listed in `_meta/publishing-manifest.yaml`.

### Relationship to existing ADRs

- [ADR-001](./ADR-001-single-codebase.md) remains the governing principle for application architecture.
- [ADR-002](./ADR-002-git-tags.md) remains the mechanism that binds a session package to runnable code.
- This ADR does not change Design Freeze session order or technology sequencing in [02-master-plan.md](../02-master-plan.md).

## Consequences

- Maintainers get a product-org shape (engineering + packaging + publish) without fifteen app trees.
- Learners get session-shaped discovery while still time-traveling via tags for the real codebase.
- Publishing becomes a curated projection, not a second development effort.
- Layout Freeze stops open-ended restructuring; remaining work is the ordered migration backlog, then course content.
- Presentation and session-doc moves must update structure docs, skills, agents, and CI path checks in the same change set.
- Future automation (`publish.py` / `publish.ps1`) lives under `_meta/` and follows the release checklist.

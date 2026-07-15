# Agent subagents

Bundled subagent definitions for Cursor and GitHub Copilot. Canonical copies: `.github/agents/`; mirror: `.cursor/agents/`.

## Available subagents

| File | Name | Purpose |
|------|------|---------|
| `agent-ci-verify.md` | agent-ci-verify | Run CI-aligned checks locally (Python, frontend ESLint/build, markdown) — mirrors `ci-python.yml`, `ci-frontend.yml`, `ci-documentation.yml` |
| `demo-roadmap-review.md` | demo-roadmap-review | Audit one session milestone — docs, sessions, presentation, and code parity |
| `docs-originality-review.md` | docs-originality-review | Spot-check `docs/`, `sessions/`, and `presentation/` for clarity and originality |

## When to use

- **agent-ci-verify** — after substantive edits to `src/` or governance markdown
- **demo-roadmap-review** — when completing or reviewing a session milestone (v1–v15)
- **docs-originality-review** — when adding or rewriting learning content under `docs/`, `sessions/`, or `presentation/`

## Parity

`.github/agents/*.md` and `.cursor/agents/*.md` must stay byte-identical. CI enforces this via `ci-agent-docs-guard.yml`.

## Related

- `docs/agent-skills.md` — SKILL.md playbooks
- `docs/agent-governance-recovery.md` — mirror drift recovery
- `AGENTS.md` — assistant index and conflict precedence
- `CLAUDE.md` — entry point

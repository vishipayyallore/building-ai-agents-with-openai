# Agent skills

Agentic Engineering in Practice uses the **SKILL.md** pattern for on-demand agent procedures.

## Layout

- **Canonical:** `.github/skills/<name>/SKILL.md`
- **Mirror:** `.cursor/skills/<name>/SKILL.md` (byte-identical)

## Bundled skills

| Skill | Purpose |
|-------|---------|
| `agentic-engineering` | Repo domain context — one app, 15 sessions, stack layout |
| `demo-companions` | Session milestone parity — docs, `sessions/session-NN-*/`, `presentation/demo-0N/`, and `src/` code |
| `ci-checks` | Local Ruff/pytest, frontend lint/build, markdownlint (+ optional Lychee) |
| `docs-verification` | Docs structure vs roadmap, folder naming, link checks |
| `workspace-review` | Comprehensive repo audit |
| `e2e-testing` | Smoke tests when backend/frontend/MCP stack is runnable |

## Progressive disclosure

Skills use YAML frontmatter (`name`, `description`) so agents match tasks without loading full playbooks upfront. Universal behaviour lives in `.github/copilot-instructions.md` and `.cursor/rules/`.

## Parity

Changes to either skills tree must update both in the same commit. `ci-skills-parity.yml` validates on push.

## Related

- `.cursor/skills.md` — quick index
- `docs/agent-subagents.md` — delegated subagents (`agent-ci-verify`, `demo-roadmap-review`, `docs-originality-review`)
- `docs/agent-governance-recovery.md` — mirror drift recovery
- `CLAUDE.md` — entry point table

# Agent skills

This folder contains repository-specific skills for `building-ai-agents-with-openai`.

## Scope

Skills here should target this workshop app and its real structure:

- `src/backend`
- `src/frontend`
- `src/mcp-server`
- `sessions/`
- `docs/`
- `config/`
- `tools/`
- `.github/`

## Included skills

| Folder | Purpose |
|--------|---------|
| `workshop-app-core` | Core repository context and architecture guidance |
| `ci-checks` | CI-aligned local checks for backend/frontend/docs |
| `docs-verification` | Validate docs, links, commands, and path accuracy |
| `e2e-testing` | Smoke path for backend + frontend + MCP behavior |
| `topic-companions` | Session companion consistency checks |
| `workspace-review` | Full workspace correctness audit |

When updating a skill, keep examples and commands aligned with current repository paths.
CI workflow `.github/workflows/ci-skills-parity.yml` validates skill frontmatter and README inventory (not a cross-tree mirror check).

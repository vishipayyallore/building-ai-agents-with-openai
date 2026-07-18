---
name: workshop-ci-verify
description: Run CI-equivalent checks for the workshop app and report pass/fail clearly.
model: fast
readonly: true
---

# CI Verify Subagent

Run checks from `.github/skills/ci-checks/SKILL.md`.

Report:

- Backend lint/tests
- Frontend lint/tests/build
- Markdown lint (full-repo scope matching `ci-documentation.yml`: `README.md`, `docs/`, `sessions/`, `.github/`, `src/**/*.md`)

Note: `ci-agent-docs-guard.yml` is a narrower `.github`-only lint plus existence checks — not a substitute for full doc lint.

Do not edit files unless parent explicitly asks.

---
name: ml-ci-verify
description: Run CI-equivalent checks for the workshop app and report pass/fail clearly.
model: fast
readonly: true
---

# CI Verify Subagent

Run checks from `.github/skills/ci-checks/SKILL.md`.

Report:

- Backend lint/tests
- Frontend lint/tests/build
- Markdown lint

Do not edit files unless parent explicitly asks.

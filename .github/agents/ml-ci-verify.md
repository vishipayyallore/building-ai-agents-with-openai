---
name: ml-ci-verify
description: >-
  ML Algorithms from Scratch — run CI-aligned Python + notebook JSON + markdownlint checks locally.
  Use after substantive edits to src/, notebooks/**/*.ipynb, or Markdown under CI globs.
  Explain failures in beginner-friendly language.
model: fast
readonly: true
---

# ml-ci-verify (subagent)

You are validating this **t2-machine-learning** workspace (Swamy's personal learning repo only).

When invoked:

1. Read exact commands from `.github/skills/ci-checks/SKILL.md` (do not invent flags).
2. From the repository root, run **ruff** (check + optional `--fix`) and `ruff format` as needed, **pytest**, **notebook JSON** parse for `src/**/*.ipynb`, and **markdownlint-cli2** with the globs in that skill.
3. Report each check as PASS or FAIL with the minimal failing output (file + rule/error).
4. If `uv run` fails on Windows, note that `.venv\Scripts\python.exe -m …` is the documented fallback; still report what you could run.

Do not edit files in this subagent unless the parent explicitly asks you to fix failures after reporting.

---
title: GitHub Rules Index
version: 1.0
last_updated: 2026-07-17
project: building-ai-agents-with-openai
---

## Rules Folder

These `.mdc` files provide lightweight editing guardrails for this workshop repository.

They should reflect real repository structure and runnable commands.

| File | Description | alwaysApply / globs |
| ---- | ----------- | ------------------- |
| `01_workshop_scope.mdc` | Workshop scope and edit focus | `alwaysApply: true` |
| `02_educational-content-rules.mdc` | Educational content expectations | globs: `["**/*.md"]` |
| `03_repository-structure.mdc` | Canonical paths | globs: `*` |
| `04_quality-assurance.mdc` | Local QA command set | globs: `*` |
| `05_markdown-standards.mdc` | Markdown conventions | globs: `["**/*.md"]` |
| `06_primary-directives.mdc` | Minimal/targeted edit directives | globs: `*` |
| `07_source_material_rules.mdc` | Do not assume reference-only / non-runtime folders | globs: `*` |
| `08_file-naming-conventions.mdc` | Naming conventions | globs: `*` |
| `09_copilot-instructions-extract.mdc` | Condensed Copilot instructions | globs: `*` |

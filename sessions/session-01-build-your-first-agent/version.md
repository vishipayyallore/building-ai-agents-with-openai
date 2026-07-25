# Session 01 – Build Your First Agent

```text
Session
-------
Session 01 – Build Your First Agent

Release
-------
v1.0-build-your-first-agent (intended; create when publishing)

ADR Baseline
------------
Not published in this lean public repo

Repository State
----------------
Single evolving application

Entry Point
-----------
src/

Prerequisites
-------------
Python 3.13
Node.js 20+ (see root README.md and docs/02-how-to-execute.md)

Run
---
src/backend
src/frontend
(MCP: spawned by backend via stdio — not a separate user process)

Learning Objectives
-------------------
- Understand AI Agents vs a plain LLM call
- Tool calling with the OpenAI Agent SDK
- MCP (calculator + weather)
- Decision Timeline on the Agent Dashboard

Previous Release
----------------
None

Next Release
------------
v2.0-stateful-agents

Commit
------
a1c7342f679a104e5e9573d5179dd7bffea163c0

Release Date
------------
2026-07-15
```

Tag naming follows curriculum milestones (`vN.0-<descriptor>`) — not a parallel `v0.x.y` scheme.

Until the release tag is published, use `main` (or your current clone branch):

```bash
git checkout main
```

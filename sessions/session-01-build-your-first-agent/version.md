# Session 01 – Build Your First Agent

```text
Session
-------
Session 01 – Build Your First Agent

Release
-------
v1.0-build-your-first-agent

ADR Baseline
------------
ADR-001
ADR-002
ADR-008
ADR-003
ADR-004
ADR-007

Repository State
----------------
Single evolving application

Entry Point
-----------
src/

Prerequisites
-------------
Python 3.13
Node.js (see docs/03-getting-started.md)

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
e2c09758cc8480cdcfb0b53cb1cbe93dd59cd4e4

Release Date
------------
2026-07-15
```

Tag naming follows curriculum milestones (`vN.0-<descriptor>`) — not a parallel `v0.x.y` scheme.

```bash
git checkout v1.0-build-your-first-agent
```

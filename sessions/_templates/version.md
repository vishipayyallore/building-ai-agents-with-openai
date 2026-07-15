# Session — version binding (standard template)

Copy this file to `sessions/session-NN-<descriptor>/version.md` and fill every field.
Do not invent a parallel tag scheme — use [ADR-002](../../docs/ADRs/ADR-002-git-tags.md) names only.

```text
Session
-------
Session NN – <Title>

Release
-------
vN.0-<descriptor>

ADR Baseline
------------
ADR-001
ADR-002
ADR-008
(+ session-specific ADRs if any)

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
src/mcp-server

Learning Objectives
-------------------
- <objective 1>
- <objective 2>

Previous Release
----------------
None | vN.0-<previous-descriptor>

Next Release
------------
vN.0-<next-descriptor>

Commit
------
_(SHA when the annotated tag is created)_

Release Date
------------
_(YYYY-MM-DD when the session ships)_
```

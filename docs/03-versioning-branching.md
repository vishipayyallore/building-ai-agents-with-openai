# Versioning & Branching — Building AI Agents with OpenAI

> **Purpose:** Explain how session milestones are tagged and how learners replay any released session in this workshop repository.
> **Audience:** Learners, instructors, and maintainers of the public Teaching Product.

This repository is the **public Teaching Product** for **Swamy's Tech Skills Academy**.
It ships one evolving application under `src/` plus **released** session packages under `sessions/`.

**How to run:** [02-how-to-execute.md](./02-how-to-execute.md)  
**Release commands:** [04-releases.md](./04-releases.md)  
**Session tracker:** root [README.md](../README.md) §2

---

## 1. Philosophy

| Principle | Rule |
|-----------|------|
| **One app, fifteen sessions** | Extend `src/frontend`, `src/backend`, `src/mcp-server` — no parallel `demoN/` folders |
| **Tags = milestones** | Annotated Git tags mark completed sessions so anyone can `git checkout <tag>` |
| **`main` is latest released** | Public `main` always carries the newest published teaching milestone |
| **Released sessions only** | Unreleased sessions appear in the README roadmap, not as empty folders |
| **Two tags per session (when published)** | Start baseline (`vN.0-sessionN-start`) + completed milestone (`vN.0-session-slug`) |
| **Optional public GitHub Release** | Same name as the milestone tag; useful for shareable notes |

Until a session's completion tag exists, use `main` (or your current clone branch).

---

## 2. Tag naming convention

```text
# Session 1
# Learners: clone main + follow docs/02-how-to-execute.md until the milestone tag ships
v1.0-build-your-first-agent      # Tag after Session 1 is published
# Optional: v1.0-session1-start for two-tag parity with later sessions

# Session 2
v2.0-session2-start
v2.0-stateful-agents

# Session 3
v3.0-session3-start
v3.0-multi-provider-agents

# Session 4
v4.0-session4-start
v4.0-context-engineering

# Session 5
v5.0-session5-start
v5.0-knowledge-driven-agents

# Session 6
v6.0-session6-start
v6.0-multi-agent-engineering

# Session 7
v7.0-session7-start
v7.0-production-foundations

# Session 8
v8.0-session8-start
v8.0-evaluation-guardrails

# Session 9
v9.0-session9-start
v9.0-local-capstone

# Phase II — Sessions 10–15 (continuous numbering)
v10.0-session10-start
v10.0-distributed-persistence
v11.0-session11-start
v11.0-event-driven-ai
v12.0-session12-start
v12.0-cloud-native-ai
v13.0-session13-start
v13.0-kubernetes-cloud
v14.0-session14-start
v14.0-enterprise-operations
v15.0-session15-start
v15.0-enterprise-capstone
```

**Format:** `v<session>.<patch>-<descriptor>`

- `<session>` = 1–15 (matches curriculum session number)
- `<patch>` = 0 for curriculum milestones; increment only for hotfixes to a frozen tag
- `<descriptor>` = `sessionN-start` (baseline) or session slug (milestone)

**All curriculum tags are annotated** (`git tag -a`) with a short session message.

Current Session 1 binding: [sessions/session-01-build-your-first-agent/version.md](../sessions/session-01-build-your-first-agent/version.md).

---

## 3. Branching model

```text
main ──────────────────────────────────────────────────► (always latest published session)
 │
 ├─► (optional) swamy/** or session-N  ──► PR merge ──► tag milestone ──► delete short-lived branch
 │
 └─► ...
```

| Practice | Rule |
|----------|------|
| **Default branch** | `main` — what learners clone |
| **Staging** | Short-lived `swamy/**` (or similar) branches for upcoming teachable changes |
| **No long-lived session branches** | Delete after merge + tag |
| **No `release/`, `hotfix/`, or `develop`** | Single `main` line for the Teaching Product |
| **Tags are immutable** | Do not force-move curriculum tags after learners may have fetched them |

---

## 4. What learners do

### 4.1 Latest workshop content

```bash
git clone https://github.com/vishipayyallore/building-ai-agents-with-openai.git
cd building-ai-agents-with-openai
git checkout main
```

Then follow [02-how-to-execute.md](./02-how-to-execute.md) or the root [README.md](../README.md).

### 4.2 Replay a published session

```bash
git fetch --tags
git checkout v1.0-build-your-first-agent
# Then follow sessions/session-01-build-your-first-agent/README.md
```

| Goal | Command |
|------|---------|
| Latest released work | `git checkout main` |
| Session 1 (after tag exists) | `git checkout v1.0-build-your-first-agent` |
| Session 3 completed | `git checkout v3.0-multi-provider-agents` |
| List curriculum tags | `git tag -l "v*.0-*"` |
| Return to latest | `git checkout main` |

If the Session 1 tag is not published yet, stay on `main` — that is the intended teaching baseline until the tag ships.

---

## 5. What instructors do

1. Teach from `main` or a published milestone tag for reproducibility.
2. Prefer short-lived feature branches; merge to `main` before tagging.
3. After a session ships on `main`, create the annotated milestone tag and (optionally) a GitHub Release — see [04-releases.md](./04-releases.md).
4. Keep session packages lightweight: guides and notes in `sessions/`, application code only under `src/`.

**Session script line (example for Session 1):**

> "Today we walk through Demo 1 on `main`. When we ship the milestone, the checkpoint is `v1.0-build-your-first-agent`. Next session starts from `v2.0-session2-start` and ends at `v2.0-stateful-agents`."

---

## 6. Live session safety (optional)

Before live coding in the room:

```bash
git tag -a session-N-live-start -m "Checkpoint before Session N live coding"
```

If the demo breaks:

```bash
git checkout session-N-live-start
# Restart backend + frontend (see docs/02-how-to-execute.md)
```

These are **lightweight recovery tags** — distinct from the official curriculum tags in §2. Delete after the session if desired.

---

## 7. What not to do

| Anti-pattern | Why it breaks the model |
|--------------|-------------------------|
| Create `demo1/`, `demo2/` folders | Violates single-app evolution; tag diffs become noise |
| Keep long-lived `session-1`, `session-2` branches | Learners cannot cleanly checkout a tag; history is noisy |
| Force-push or move curriculum tags | Destroys reproducibility across clones |
| Add empty folders for unreleased sessions | Advertises unfinished work; use the README roadmap instead |
| Put application code under `sessions/` | Session folders are learning packages only |
| Use bare `v1.0` / `v2.0` without a descriptor | Ambiguous; prefer `v1.0-build-your-first-agent` |

---

## 8. Quick reference

| Action | Command |
|--------|---------|
| Create session baseline (before session) | `git tag -a vN.0-sessionN-start -m "..." && git push origin vN.0-sessionN-start` |
| Create live checkpoint (morning of session) | `git tag -a session-N-live-start -m "Checkpoint before Session N live coding"` |
| Create milestone tag (after session) | `git tag -a vN.0-session-slug -m "Session N: Title" && git push origin vN.0-session-slug` |
| List curriculum tags | `git tag -l "v*.0-*"` |
| Diff between two sessions | `git diff v1.0-build-your-first-agent..v2.0-stateful-agents` |
| Show Session 1 pin details | Open `sessions/session-01-build-your-first-agent/version.md` |

---

## 9. Related docs

- **Release command track:** [04-releases.md](./04-releases.md)
- **How to run:** [02-how-to-execute.md](./02-how-to-execute.md)
- **Folder layout:** [01-folder-structure.md](./01-folder-structure.md)
- **Product homepage:** [README.md](../README.md)
- **Session 1 guide:** [sessions/session-01-build-your-first-agent/README.md](../sessions/session-01-build-your-first-agent/README.md)
- **Session 1 pin:** [sessions/session-01-build-your-first-agent/version.md](../sessions/session-01-build-your-first-agent/version.md)
- **Release notes:** `sessions/session-NN-*/release-notes.md`

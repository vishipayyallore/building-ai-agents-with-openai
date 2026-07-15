# Versioning & Branching — Agentic Engineering in Practice

> **Purpose:** Define how this single evolving application is tagged, branched, and released across 15 club sessions.
> **Audience:** Presenters, maintainers, and attendees who need to reproduce any session locally.

Use [presentation/README.md](../presentation/README.md) as the operational tracker for session status, start tags, completion tags, and GitHub Releases.

**Command track (copy-paste):** [16-releases.md](./16-releases.md)

**Scope of this doc:** tag and GitHub Release rules below apply to the **private** Engineering Organization (`agentic-engineering-in-practice`). The public Teaching Product is a projection — commit/push required after sync; mirroring the tag is optional. See [16-releases.md §1.1](./16-releases.md#11-private-vs-public-duties).

---

## 1. Philosophy

| Principle | Rule |
|-----------|------|
| **One app, 15 sessions** | Extend `src/frontend`, `src/backend`, `src/mcp-server` — no parallel `demoN/` folders |
| **Tags = milestones** | Git tags mark session start/end; attendees time-travel via `git checkout <tag>` |
| **`main` is always latest** | After each session, completed work lands on `main` (directly or via short-lived PR) |
| **No long-lived session branches** | Optional `session-N` branches for WIP only; delete after merge + tag |
| **Two tags per session** | Start baseline (`vN.0-sessionN-start`) + completed milestone (`vN.0-session-name`) |
| **Release per milestone** | Create a GitHub Release for each completed session so the milestone has notes, links, and a shareable checkpoint |

---

## 2. Tag Naming Convention

```text
# Session 1 (Demo 1 already on main)
# Attendees: clone main + follow docs/03-getting-started.md until milestone tag ships
v1.0-build-your-first-agent      # Tag after Session 1 ships
# Optional: v1.0-session1-start for historical two-tag parity with later sessions

# Session 2
v2.0-session2-start              # Attendees checkout this before Session 2
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

**All tags are annotated** (`git tag -a`) with a message describing the session.

---

## 3. Branching Model

```text
main ──────────────────────────────────────────────────► (always latest completed session)
 │
 ├─► (optional) session-1  ──► merge ──► tag v1.0-build-your-first-agent ──► delete session-1
 │
 ├─► (optional) session-2  ──► merge ──► tag v2.0-stateful-agents ──► delete session-2
 │
 └─► ...
```

- **No permanent session branches** — they exist only during active development of that session
- **No `release/`, `hotfix/`, or `develop` branches** — single `main` line
- **Attendees never force-push tags** — they are immutable teaching checkpoints

---

## 4. Per-Session Release Workflow

### 4.1 Before the session (presenter prep)

**Session 1 note:** Demo 1 code is already on `main`. Attendees clone `main` and follow
[docs/03-getting-started.md](./03-getting-started.md). There is no greenfield scaffold during the live session — presenters walk through the implemented app. Optional two-tag parity with later sessions is fine; it is not required for teaching Session 1.

```bash
# 1. Ensure main is clean and up to date
git checkout main
git pull origin main

# 2. (Optional) historical baseline tag for two-tag parity with Sessions 2+
# git tag -a v1.0-session1-start -m "Session 1 baseline: Demo 1 already on main"
# git push origin v1.0-session1-start

# 3. (Optional) Create a short-lived branch only if you need last-minute doc tweaks
git checkout -b session-1
# ... docs / presentation polish ...
git checkout main
git merge session-1
git branch -d session-1
```

### 4.2 During the session (live walkthrough)

```bash
# Presenter: create a safety checkpoint BEFORE going live (optional but useful)
git tag -a session-1-live-start -m "Checkpoint before Session 1 live walkthrough"
# If the environment breaks mid-session:
git checkout session-1-live-start
```

### 4.3 After the session (release)

```bash
# 1. Verify main has all session changes (merge session-N branch if used)
git checkout main
# git merge session-1   # if you used a branch

# 2. Run quality gates
uv run ruff check src/backend src/mcp-server
uv run ruff format --check src/backend src/mcp-server
uv run pytest -q
cd src/frontend && npm run lint && npm run build

# 3. Update docs & presentation assets
# - README.md session status row
# - presentation/demo-01/ (slides, scripts)
# - Any docs/NN-*.md touched by the session

# 3b. Draft release notes/changelog summary
# - learning objectives covered
# - features delivered
# - key architecture decisions introduced
# - links to presentation/demo-01/README.md and canonical docs
# - update presentation/demo-01/release-notes.md before publishing

# 4. Create the milestone tag (first formal Session 1 release)
git tag -a v1.0-build-your-first-agent -m "Session 1: Build Your First AI Agent — Agent Runtime, MCP calculator + weather, Decision Timeline"
git push origin v1.0-build-your-first-agent
# If you created v1.0-session1-start earlier: also push that tag

# 5. Create GitHub Release for visibility and shareable notes
gh release create v1.0-build-your-first-agent \
  --title "Session 1: Build Your First AI Agent" \
  --notes-file presentation/demo-01/release-notes.md
```

### 4.4 Session script line (say this in the room)

> "Today we walk through Demo 1 on `main`. When we ship the milestone, the checkpoint is `v1.0-build-your-first-agent`. Next session starts from `v2.0-session2-start` and ends at `v2.0-stateful-agents`."

From Session 2 onward, use the standard two-tag pattern (baseline start tag + completed milestone tag) in the examples below, swapping the session number and name.

---

## 5. Attendee Time Travel

```bash
# Replay Session 5 exactly as demonstrated
git clone https://github.com/.../agentic-engineering-in-practice.git
cd agentic-engineering-in-practice
git checkout v5.0-knowledge-driven-agents

# Return to latest work
git checkout main
```

| Goal | Command |
|------|---------|
| Session 1 baseline (current: use `main` until milestone tag ships) | `git checkout main` |
| Session 1 completed (after tag) | `git checkout v1.0-build-your-first-agent` |
| Session 3 completed | `git checkout v3.0-multi-provider-agents` |
| Latest work (after Session 7) | `git checkout main` |
| List all curriculum tags | `git tag -l "v*.0-*" \| sort -V` |
| Commits between two session milestones | `git log v3.0-multi-provider-agents..v5.0-knowledge-driven-agents --oneline` |

---

## 6. Live Session Safety (Presenter)

Before **any** live coding in the room:

```bash
git tag -a session-N-live-start -m "Checkpoint before Session N live coding"
```

If the demo breaks:

```bash
git checkout session-N-live-start
# Restart backend + frontend
```

These are **lightweight recovery tags** — distinct from the official curriculum tags in §2. Delete after session if desired, or keep for post-mortem.

---

## 7. What Not To Do

| Anti-pattern | Why It Breaks The Model |
|--------------|------------------------|
| Create `demo1/`, `demo2/` folders | Violates single-app evolution; tag diffs become noise |
| Keep long-lived `session-1`, `session-2` branches | Attendees can't cleanly `git checkout` a tag; history polluted |
| Force-push or move curriculum tags | Destroys reproducibility; attendees' local tags diverge |
| Skip the `-start` tag | Attendees have no stable baseline to clone |
| Release without docs/presentation update | Breaks demo-companion parity (CI skill `demo-companions`) |
| Use `v1.0`, `v2.0` without session qualifier | Ambiguous; `v1.0-session1-start` vs `v1.0-build-your-first-agent` are different commits |

---

## 8. Quick Reference

| Action | Command |
|--------|---------|
| Create session baseline (before session) | `git tag -a vN.0-sessionN-start -m "..." && git push origin vN.0-sessionN-start` |
| Create live checkpoint (morning of session) | `git tag -a session-N-live-start -m "Checkpoint before Session N live coding"` |
| Create milestone tag (after session) | `git tag -a vN.0-session-slug -m "Session N: Title" && git push origin vN.0-session-slug vN.0-sessionN-start` |
| List curriculum tags | `git tag -l "v*.0-*" \| sort -V` |
| Diff between two sessions | `git diff v3.0-multi-provider-agents..v5.0-knowledge-driven-agents` |
| Show what changed in Session 4 | `git log v3.0-multi-provider-agents..v4.0-context-engineering --oneline` |
| Compare session tag history | `git log v2.0-stateful-agents..v3.0-multi-provider-agents --oneline` |

---

## 9. Related Docs

- **Release command track:** [docs/16-releases.md](./16-releases.md) — copy-paste tags, `gh release`, ledger
- **Master Plan §12:** [docs/02-master-plan.md#12-versioning--branching](../docs/02-master-plan.md#12-versioning--branching)
- **Presentation Tracker:** [presentation/README.md](../presentation/README.md)
- **Session 1 Presentation:** [presentation/demo-01/README.md](../presentation/demo-01/README.md)
- **Release notes per session:** `presentation/demo-0N/release-notes.md` (draft before `gh release create`)
- **Demo Companion SOP:** [.github/skills/demo-companions/SKILL.md](../.github/skills/demo-companions/SKILL.md)
- **Repository Structure:** [docs/01-repository-structure.md](../docs/01-repository-structure.md)
- **Tag and file naming:** [.cursor/rules/08_file-naming-conventions.mdc](../.cursor/rules/08_file-naming-conventions.mdc)

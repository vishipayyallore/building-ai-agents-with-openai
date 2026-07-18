# Releases — Tag and GitHub Release (Teaching Product)

> **Purpose:** Copy-paste command track for publishing a session milestone in this public workshop repository.  
> **Policy (why):** [03-versioning-branching.md](./03-versioning-branching.md)  
> **Status tracker:** root [README.md](../README.md) §2  
> **How to run after checkout:** [02-how-to-execute.md](./02-how-to-execute.md)

Use this file when you are ready to **tag and (optionally) create a GitHub Release** for learners.
Use [03-versioning-branching.md](./03-versioning-branching.md) for philosophy, branching, and anti-patterns.

```text
main (clean) → quality gates → docs polish
            → annotated milestone tag
            → optional GitHub Release
            → learners: git checkout <tag>
```

**This repo is the Teaching Product.** Public `main` should always reflect the latest **released** workshop state. Do not leave unreleased session folders or half-finished demos on `main`.

---

## 1. Release model (quick)

| Item | Rule |
| ---- | ---- |
| Repository | Public `building-ai-agents-with-openai` |
| Application | One evolving app under `src/` |
| Milestone | Annotated Git tag on `main` (`vN.0-…`) |
| Course package | `sessions/session-NN-*/` (**no** nested `src/`) |
| GitHub Release | **Optional** — same name as the milestone tag; notes from `release-notes.md` |
| Where to tag | On `main` after session work is merged and gates pass |
| Learner checkout | `git fetch --tags && git checkout vN.0-…` |

### 1.1 Maintainer checklist

| Step | Required? |
| ---- | --------- |
| Quality gates (lint / tests / frontend build) | **Yes** — stop if any fail |
| Update README session status + session package docs | **Yes** |
| Annotated milestone tag on `main` | **Yes** for a reproducible checkpoint |
| Push tag to `origin` | **Yes** |
| GitHub Release (`gh release create`) | Optional but recommended |
| Update `sessions/session-NN-*/version.md` Commit + Release Date | **Yes** (docs follow-up; does not move the tag) |

**Session 1 completion tag:** `v1.0-build-your-first-agent`

---

## 2. Milestone tag matrix

| Session | Start tag | Completion tag / GitHub Release |
| ------- | --------- | ------------------------------- |
| 1 | `main` (optional: `v1.0-session1-start`) | `v1.0-build-your-first-agent` |
| 2 | `v2.0-session2-start` | `v2.0-stateful-agents` |
| 3 | `v3.0-session3-start` | `v3.0-multi-provider-agents` |
| 4 | `v4.0-session4-start` | `v4.0-context-engineering` |
| 5 | `v5.0-session5-start` | `v5.0-knowledge-driven-agents` |
| 6 | `v6.0-session6-start` | `v6.0-multi-agent-engineering` |
| 7 | `v7.0-session7-start` | `v7.0-production-foundations` |
| 8 | `v8.0-session8-start` | `v8.0-evaluation-guardrails` |
| 9 | `v9.0-session9-start` | `v9.0-local-capstone` |
| 10 | `v10.0-session10-start` | `v10.0-distributed-persistence` |
| 11 | `v11.0-session11-start` | `v11.0-event-driven-ai` |
| 12 | `v12.0-session12-start` | `v12.0-cloud-native-ai` |
| 13 | `v13.0-session13-start` | `v13.0-kubernetes-cloud` |
| 14 | `v14.0-session14-start` | `v14.0-enterprise-operations` |
| 15 | `v15.0-session15-start` | `v15.0-enterprise-capstone` |

Do **not** invent parallel schemes such as `v0.1.0` or renamed descriptors.

---

## 3. Session 1 — full command track

Copy in order. Prefer **PowerShell** on Windows.

### 3.1 Preconditions

```powershell
git status
# Working tree should be clean (or only intentional release-note edits)

git push -u origin HEAD
# Merge feature branch → main via PR (preferred) before tagging
```

### 3.2 Land on `main`

```powershell
git checkout main
git pull origin main
```

### 3.3 Quality gates

Minimum before any curriculum tag:

```powershell
uv run ruff check src/backend src/mcp-server
uv run ruff format --check src/backend src/mcp-server
uv run pytest -q

cd src/frontend
npm run lint
npm run build
cd ../..
```

If any gate fails → **stop**. Do not tag or release.

### 3.4 Docs polish (before the tag)

Update as needed, then commit on `main`:

- [ ] Root `README.md` Session 1 status → Available / tagged
- [ ] `sessions/session-01-build-your-first-agent/release-notes.md`
- [ ] Session package `README.md` still points at the milestone tag
- [ ] `sessions/session-01-build-your-first-agent/version.md` ready (Commit SHA filled after tag)

```powershell
git add -A
git commit -m "docs: prepare Session 1 release notes and status"
git push origin main
```

### 3.5 Optional Session 1 start tag (two-tag parity)

Usually **skipped** for Session 1:

```powershell
git tag -a v1.0-session1-start -m "Session 1 baseline: Demo 1 already on main"
git push origin v1.0-session1-start
```

### 3.6 Optional live-session safety checkpoint

```powershell
git tag -a session-1-live-start -m "Checkpoint before Session 1 live walkthrough"
# Recovery if the room breaks:
# git checkout session-1-live-start
```

### 3.7 Create and push the milestone tag

```powershell
git tag -a v1.0-build-your-first-agent -m "Session 1: Build Your First AI Agent — Agent Runtime, MCP calculator + weather, Decision Timeline"

git push origin v1.0-build-your-first-agent
```

Verify:

```powershell
git show v1.0-build-your-first-agent --no-patch
git rev-parse v1.0-build-your-first-agent
git rev-parse --short v1.0-build-your-first-agent
```

### 3.8 Create the GitHub Release (recommended)

```powershell
gh release create v1.0-build-your-first-agent `
  --title "Session 1: Build Your First AI Agent" `
  --notes-file sessions/session-01-build-your-first-agent/release-notes.md
```

bash:

```bash
gh release create v1.0-build-your-first-agent \
  --title "Session 1: Build Your First AI Agent" \
  --notes-file sessions/session-01-build-your-first-agent/release-notes.md
```

Open the release:

```powershell
gh release view v1.0-build-your-first-agent --web
```

### 3.9 Post-release binding (docs follow-up)

```powershell
git rev-parse v1.0-build-your-first-agent
# Paste into sessions/session-01-build-your-first-agent/version.md → Commit
# Set Release Date (YYYY-MM-DD)
# Mark the tag as published in the session README / root README if still "intended"
# Commit and push that docs follow-up on main (does not move the tag)
```

### 3.10 Learner replay

```powershell
git fetch --tags
git checkout v1.0-build-your-first-agent
# Then follow docs/02-how-to-execute.md
# Or sessions/session-01-build-your-first-agent/README.md
```

Until the tag exists, learners should use `main`.

---

## 4. Sessions 2–15 — generic command track

Replace `N`, titles, and slugs from §2. Keep the same order: gates → docs → tag → optional `gh release` → bind `version.md`.

### 4.1 Start tag (before the session)

```powershell
git checkout main
git pull origin main

git tag -a vN.0-sessionN-start -m "Session N baseline: start of <Title>"
git push origin vN.0-sessionN-start
```

### 4.2 Live safety (optional)

```powershell
git tag -a session-N-live-start -m "Checkpoint before Session N live coding"
```

### 4.3 After the session — gates, tag, release

```powershell
git checkout main
git pull origin main

uv run ruff check src/backend src/mcp-server
uv run ruff format --check src/backend src/mcp-server
uv run pytest -q
cd src/frontend; npm run lint; npm run build; cd ../..

git tag -a vN.0-<descriptor> -m "Session N: <Title> — <one-line summary>"
git push origin vN.0-<descriptor>

gh release create vN.0-<descriptor> `
  --title "Session N: <Title>" `
  --notes-file sessions/session-NN-*/release-notes.md
```

Example — Session 2:

```powershell
git tag -a v2.0-session2-start -m "Session 2 baseline: start of Stateful Agents"
git push origin v2.0-session2-start

# ... after Session 2 ships on main ...

git tag -a v2.0-stateful-agents -m "Session 2: Stateful Agents — conversation state, streaming"
git push origin v2.0-stateful-agents

gh release create v2.0-stateful-agents `
  --title "Session 2: Stateful Agents" `
  --notes-file sessions/session-02-stateful-agents/release-notes.md
```

Only add `sessions/session-02-…` (and later folders) when that session is **actually released** — never as empty placeholders.

---

## 5. Inspection and time travel

```powershell
# List curriculum tags
git tag -l "v*.0-*"

# Show a tag
git show v1.0-build-your-first-agent --no-patch

# Commits between two milestones
git log v1.0-build-your-first-agent..v2.0-stateful-agents --oneline

# Diff between two milestones
git diff v1.0-build-your-first-agent..v2.0-stateful-agents

# Return to latest
git checkout main
```

| Goal | Command |
| ---- | ------- |
| Session 1 until tag exists | `git checkout main` |
| Session 1 after release | `git checkout v1.0-build-your-first-agent` |
| List GitHub Releases | `gh release list` |
| Delete a **mistaken local** tag (before push) | `git tag -d v1.0-build-your-first-agent` |

**Do not** force-move or delete a curriculum tag after learners may have fetched it.

---

## 6. Release ledger (fill as you ship)

| Session | Tag | SHA (short) | Release URL | Publish date | Notes |
| ------- | --- | ----------- | ----------- | ------------ | ----- |
| 1 | `v1.0-build-your-first-agent` | | | | Intended; create when publishing |
| 2 | `v2.0-stateful-agents` | | | | |
| 3 | `v3.0-multi-provider-agents` | | | | |
| 4 | `v4.0-context-engineering` | | | | |
| 5 | `v5.0-knowledge-driven-agents` | | | | |
| 6 | `v6.0-multi-agent-engineering` | | | | |
| 7 | `v7.0-production-foundations` | | | | |
| 8 | `v8.0-evaluation-guardrails` | | | | |
| 9 | `v9.0-local-capstone` | | | | |
| 10 | `v10.0-distributed-persistence` | | | | |
| 11 | `v11.0-event-driven-ai` | | | | |
| 12 | `v12.0-cloud-native-ai` | | | | |
| 13 | `v13.0-kubernetes-cloud` | | | | |
| 14 | `v14.0-enterprise-operations` | | | | |
| 15 | `v15.0-enterprise-capstone` | | | | |

After each release:

```powershell
git rev-parse --short vN.0-<descriptor>
gh release view vN.0-<descriptor> --json url -q .url
```

Paste results into the ledger and into the matching `sessions/session-NN-*/version.md`.

---

## 7. Related docs

| Doc | Role |
| --- | ---- |
| [03-versioning-branching.md](./03-versioning-branching.md) | Philosophy, branching model, anti-patterns |
| [02-how-to-execute.md](./02-how-to-execute.md) | Run the app after checkout |
| [01-folder-structure.md](./01-folder-structure.md) | Repository layout |
| [README.md](../README.md) | Product homepage + session roadmap |
| [sessions/session-01-build-your-first-agent/README.md](../sessions/session-01-build-your-first-agent/README.md) | Session 1 learning package |
| [sessions/session-01-build-your-first-agent/version.md](../sessions/session-01-build-your-first-agent/version.md) | Tag / commit binding |
| [sessions/session-01-build-your-first-agent/release-notes.md](../sessions/session-01-build-your-first-agent/release-notes.md) | Notes for `gh release create` |

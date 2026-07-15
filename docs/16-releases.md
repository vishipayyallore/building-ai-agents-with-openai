# Releases — Tag, GitHub Release, and Teaching Product publish

> **Purpose:** Copy-paste command track for shipping each session milestone from the **Engineering Organization** to the **Teaching Product**.  
> **Policy (why):** [14-versioning-branching.md](./14-versioning-branching.md)  
> **Architecture:** [ADR-008](./ADRs/ADR-008-product-organization-publishing.md)  
> **Gates:** [_meta/release-checklist.md](../_meta/release-checklist.md)  
> **Status tracker:** [presentation/README.md](../presentation/README.md) · [sessions/README.md](../sessions/README.md)

Use this file when you are ready to **tag, release, and publish**. Use `14-versioning-branching.md` for philosophy and anti-patterns.

```text
Private (Engineering Organization)          Public (Teaching Product)
  main → gates → annotated tag                 Publish-Release.ps1 → review
       → GitHub Release                        → commit + push to main
       → bind version.md / manifest            → (optional) same milestone tag
       → Publish-Release.ps1  ───────────────► → (optional) public GitHub Release
```

**Source of truth:** curriculum tags and GitHub Releases live in the **private** repo. The public repo is a curated **projection** — sync and push are required; mirroring the tag is optional.

---

## 1. Release model (quick)

| Item | Rule |
| ---- | ---- |
| Engineering Organization | Private repo `agentic-engineering-in-practice` |
| Teaching Product | Public repo `building-ai-agents-with-openai` (projection only) |
| Application | One evolving app under `src/` ([ADR-001](./ADRs/ADR-001-single-codebase.md)) |
| Milestone | Annotated Git tag on **private** `main` ([ADR-002](./ADRs/ADR-002-git-tags.md)) |
| Course package | `sessions/session-NN-*/` + `version.md` (**no** nested `src/`) |
| Private GitHub Release | **Required** — same name as the milestone tag |
| Where to tag | On private `main` after session work is merged |
| Public sync | `_meta/Publish-Release.ps1` (dry-run by default; pass `-Execute`) |

### 1.1 Private vs public duties

| Step | Private (`agentic-engineering-in-practice`) | Public (`building-ai-agents-with-openai`) |
| ---- | ------------------------------------------ | ---------------------------------------- |
| Quality gates + demo | **Required** | Smoke after sync (run projected `src/`) |
| Annotated milestone tag (`vN.0-…`) | **Required** — curriculum contract | **Optional** — same name helps learners; not the source of truth |
| GitHub Release | **Required** | **Optional** — private Release notes are canonical |
| Bind `version.md` / `released_sessions` | **Required** (post-tag docs follow-up) | N/A (`_meta/` is never published) |
| `Publish-Release.ps1 -Execute` | Run from private | Writes files into public clone |
| Review diff → commit → push | N/A for projection | **Required** — sync alone does not publish |
| Edit `src/` application code | Only here | **Never** — fix private, re-publish |

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

Do **not** invent parallel schemes such as `v0.1.0` or renamed descriptors — [ADR-002](./ADRs/ADR-002-git-tags.md) wins.

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

Align with [_meta/release-checklist.md](../_meta/release-checklist.md). Minimum:

```powershell
uv run ruff check src/backend src/mcp-server
uv run ruff format --check src/backend src/mcp-server
uv run pytest -q

cd src/frontend
npm run lint
npm run build
cd ../..
```

If any required checklist box fails → **stop**. Do not tag or publish.

### 3.4 Docs polish (before the tag)

Update as needed, then commit on `main`:

- [x] Root `README.md` Session 1 status → tagged / released (after tag, or prepare wording)
- [x] `presentation/README.md` tracker row for Session 1
- [x] `presentation/demo-01/release-notes.md` (used by `gh release` below)
- [x] `sessions/session-01-build-your-first-agent/release-notes.md`
- [x] Session package `README.md` still points at the milestone tag

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

### 3.8 Create the private GitHub Release

```powershell
gh release create v1.0-build-your-first-agent `
  --title "Session 1: Build Your First AI Agent" `
  --notes-file presentation/demo-01/release-notes.md
```

bash:

```bash
gh release create v1.0-build-your-first-agent \
  --title "Session 1: Build Your First AI Agent" \
  --notes-file presentation/demo-01/release-notes.md
```

Optional alternate notes path once session notes are preferred:

```powershell
# --notes-file sessions/session-01-build-your-first-agent/release-notes.md
```

Open the release:

```powershell
gh release view v1.0-build-your-first-agent --web
```

### 3.9 Post-release binding (private docs)

```powershell
git rev-parse v1.0-build-your-first-agent
# Paste into sessions/session-01-build-your-first-agent/version.md → Commit
# Set Release Date (YYYY-MM-DD)
# Update _meta/publishing-manifest.yaml released_sessions for session-01
# Commit and push that docs follow-up on main (does not move the tag)
```

### 3.10 Publish to Teaching Product

Clone or confirm `../building-ai-agents-with-openai` exists first. Run from the **private** repo after the private tag and GitHub Release exist.

```powershell
# Dry-run (default) — prints sync/ignore plan
pwsh -File _meta/Publish-Release.ps1 -Tag v1.0-build-your-first-agent

# After checklist passes
pwsh -File _meta/Publish-Release.ps1 -Tag v1.0-build-your-first-agent -Execute
```

`-Execute` only **copies** files into the public clone. Finish the Teaching Product publish in the **public** repo:

```powershell
cd ../building-ai-agents-with-openai
git checkout main
git status   # review projection; remove anything that should stay ignored (e.g. sessions/_templates)

# Required
git add -A
git commit -m "Publish projection for v1.0-build-your-first-agent"
git push origin main

# Optional — same milestone name for learner checkout convenience
git tag -a v1.0-build-your-first-agent -m "Session 1 projection: Build Your First AI Agent"
git push origin v1.0-build-your-first-agent

# Optional — public GitHub Release (private notes remain canonical)
# gh release create v1.0-build-your-first-agent --title "Session 1: Build Your First AI Agent" --notes-file presentation/demo-01/release-notes.md
```

Then record the **public publish date** in the §6 ledger (private docs follow-up).

Do **not** edit application code in the Teaching Product; fix bugs in private `src/` and re-publish.

### 3.11 Attendee / learner replay

**Preferred:** private Engineering Organization (or any clone that has the curriculum tag):

```powershell
git fetch --tags
git checkout v1.0-build-your-first-agent
# Then follow docs/03-getting-started.md
# Or sessions/session-01-build-your-first-agent/README.md
```

**Public Teaching Product:** use `main` after the projection commit is pushed. If the optional public tag was created, the same `git checkout v1.0-build-your-first-agent` works there too.

---

## 4. Sessions 2–15 — generic command track

Replace `N`, titles, and slugs from §2. Keep the same order: gates → docs → private tag → private `gh release` → bind `version.md` → `Publish-Release.ps1` → public commit/push (optional public tag).

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

### 4.3 After the session — gates, tag, private release

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
  --notes-file presentation/demo-0N/release-notes.md
```

### 4.4 Publish projection

```powershell
pwsh -File _meta/Publish-Release.ps1 -Tag vN.0-<descriptor>
pwsh -File _meta/Publish-Release.ps1 -Tag vN.0-<descriptor> -Execute
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
  --notes-file presentation/demo-02/release-notes.md

pwsh -File _meta/Publish-Release.ps1 -Tag v2.0-stateful-agents -Execute
```

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
| List private GitHub Releases | `gh release list` |
| Delete a **mistaken local** tag (before push) | `git tag -d v1.0-build-your-first-agent` |

**Do not** force-move or delete a curriculum tag after learners may have fetched it.

---

## 6. Release ledger (fill as you ship)

| Session | Tag | SHA (short) | Private release URL | Public publish date | Notes |
| ------- | --- | ----------- | ------------------- | ------------------- | ----- |
| 1 | `v1.0-build-your-first-agent` | `e2c0975` | https://github.com/vishipayyallore/agentic-engineering-in-practice/releases/tag/v1.0-build-your-first-agent | *(pending publish)* | Private release 2026-07-15 |
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

After each private release:

```powershell
git rev-parse --short vN.0-<descriptor>
gh release view vN.0-<descriptor> --json url -q .url
```

Paste results into the ledger. Record public publish date after `Publish-Release.ps1 -Execute` succeeds.

---

## 7. Related docs

| Doc | Role |
| --- | ---- |
| [14-versioning-branching.md](./14-versioning-branching.md) | Philosophy, branching model, anti-patterns |
| [ADR-001](./ADRs/ADR-001-single-codebase.md) | One application |
| [ADR-002](./ADRs/ADR-002-git-tags.md) | Tags as milestones |
| [ADR-008](./ADRs/ADR-008-product-organization-publishing.md) | Two products + publishing |
| [sessions/README.md](../sessions/README.md) | Course learning path |
| [_meta/release-checklist.md](../_meta/release-checklist.md) | Quality gates (fail = no release) |
| [_meta/publishing-manifest.yaml](../_meta/publishing-manifest.yaml) | Sync / ignore contract |
| [_meta/Publish-Release.ps1](../_meta/Publish-Release.ps1) | Teaching Product projection |
| [_meta/product-backlog.md](../_meta/product-backlog.md) | Post-freeze delivery backlog |
| [_meta/versioning.md](../_meta/versioning.md) | Session package ↔ tag binding |
| [sessions/_templates/version.md](../sessions/_templates/version.md) | `version.md` template |
| [presentation/README.md](../presentation/README.md) | Presenter status tracker |

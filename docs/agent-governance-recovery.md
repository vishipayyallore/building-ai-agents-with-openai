# Agent governance recovery

Use this guide only when assistant governance files (`.cursor/rules/`, `.github/rules/`, skills mirrors, agents mirrors, `CLAUDE.md`, `AGENTS.md`, `.github/copilot-instructions.md`) are corrupted or out of sync.

## Primary prevention

1. Commit or stash before bulk AI edits to governance paths
2. Update `.github/skills/` and `.cursor/skills/` in the same commit
3. Update `.github/agents/` and `.cursor/agents/` in the same commit
4. Update `.github/rules/` and `.cursor/rules/` in the same commit when editing policy
5. Prefer small scoped diffs
6. Run local parity checks before push

## Local parity check

```powershell
# Rules
Get-ChildItem .cursor\rules -Filter *.mdc | ForEach-Object {
  $github = Join-Path .github\rules $_.Name
  if (-not (Test-Path $github)) { Write-Host "MISSING .github rule: $($_.Name)" }
  elseif ((Get-FileHash $_.FullName).Hash -ne (Get-FileHash $github).Hash) { Write-Host "RULE MISMATCH: $($_.Name)" }
}

# Skills
Get-ChildItem -Recurse .github\skills -Filter SKILL.md | ForEach-Object {
  $rel = $_.FullName.Replace((Resolve-Path .github\skills).Path + '\', '')
  $cursor = Join-Path .cursor\skills $rel
  if (-not (Test-Path $cursor)) { Write-Host "MISSING skill: $rel" }
  elseif ((Get-FileHash $_.FullName).Hash -ne (Get-FileHash $cursor).Hash) { Write-Host "SKILL MISMATCH: $rel" }
}

# Agents
Get-ChildItem .github\agents -Filter *.md | ForEach-Object {
  $cursor = Join-Path .cursor\agents $_.Name
  if (-not (Test-Path $cursor)) { Write-Host "MISSING agent: $($_.Name)" }
  elseif ((Get-FileHash $_.FullName).Hash -ne (Get-FileHash $cursor).Hash) { Write-Host "AGENT MISMATCH: $($_.Name)" }
}
```

## Git restore (secondary)

If files are damaged beyond manual repair:

```powershell
git checkout HEAD -- CLAUDE.md AGENTS.md .github/copilot-instructions.md
git checkout HEAD -- .cursor/rules/ .github/rules/ .github/skills/ .cursor/skills/ .github/agents/ .cursor/agents/
git checkout HEAD -- .cursor/skills.md
```

Adjust commit ref if restoring from a known-good tag (e.g. `v1.0-build-your-first-agent`) or branch.

## CI validation

Push triggers:

- `ci-skills-parity.yml` — skills mirror
- `ci-agent-docs-guard.yml` — required files, references, rules/agents mirrors, markdown lint

## Auxiliary trees

`.clinerules/` and `.opencode/` are **not** CI-enforced mirrors. After restoring canonical paths, resync from:

- Rules: `.cursor/rules/*.mdc` → `.clinerules/rules/*.md` and `.opencode/rules/*.md`
- Skills: `.github/skills/*/SKILL.md` → `.clinerules/skills/*.md` and `.opencode/skills/*/SKILL.md`
- Agents: `.github/agents/*.md` → `.clinerules/agents/` and `.opencode/agents/`

See `.clinerules/README.md` and `.opencode/README.md` for layout.

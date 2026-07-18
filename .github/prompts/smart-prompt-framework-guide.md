# Smart Prompt Guide (Workshop Edition)

Use concise, testable prompts.

## Recommended structure

1. Role
2. Objective
3. Scope (files/folders)
4. Constraints
5. Validation commands
6. Expected output format

## Example

Role: Senior full-stack engineer for workshop infrastructure.

Objective: Update session docs so run commands exactly match current backend/frontend startup flow.

Scope: `README.md`, `docs/*.md`, `sessions/session-01-build-your-first-agent/*.md`

Constraints:

- Do not change application runtime behavior.
- Keep edits minimal and objective.
- No broken links.

Validation:

- Confirm documented commands run from stated directories.
- Run markdown lint for changed docs:

```powershell
npx --yes markdownlint-cli2 "README.md" "docs/**/*.md" "sessions/**/*.md" ".github/**/*.md" "src/**/*.md"
```

(See `.github/skills/ci-checks/SKILL.md`.)

Output:

- List files changed
- Summarize why each change was needed

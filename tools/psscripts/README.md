# PowerShell scripts

**Location:** `tools/psscripts/`

## Shipped scripts

| File | Purpose |
| ---- | ------- |
| `RepoConfig.psd1` | Per-repo settings for future shared PowerShell helpers |
| `Export-FolderStructure.ps1` | Export a text tree of the repository layout |

### Export-FolderStructure.ps1

```powershell
.\tools\psscripts\Export-FolderStructure.ps1
```

## Not shipped (yet)

Older private-org toolchains (health checks, zero-copy verifiers, diagram export,
source-material converters) are **not** included in this lean public repo. Do not
document or link those script names until they are added here.

## Related documentation

- [docs/01-folder-structure.md](../../docs/01-folder-structure.md) — canonical workspace layout
- [docs/02-how-to-execute.md](../../docs/02-how-to-execute.md) — run the workshop app
- [`.github/copilot-instructions.md`](../../.github/copilot-instructions.md) — agent/CI command set

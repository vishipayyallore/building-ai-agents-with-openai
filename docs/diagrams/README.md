# Diagram exports

Optional **Mermaid source files** (`.mmd`) for PNG export via `tools/psscripts/Export-Diagrams.ps1`.

## When to use

- Reusable diagrams shared across `README.md`, `docs/`, and `presentation/`
- PNG assets destined for `assets/` (or `docs/images/` for doc-embedded placeholders) after export

Inline Mermaid in topic guides and `docs/architecture/` remains the default for Demo 1. Add `.mmd` files here when you need versioned diagram sources and consistent PNG export settings.

## Export

```powershell
.\tools\psscripts\Export-Diagrams.ps1 -DiagramsPath "docs\diagrams"
```

Requires `@mermaid-js/mermaid-cli` (`mmdc`) on PATH. Configuration: `mermaid-config.json` in this folder.

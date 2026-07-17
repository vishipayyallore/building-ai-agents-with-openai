# Python Tools

**Location**: `tools/pyscripts/`

Utilities for **staging raw imports** and supporting the Agentic Engineering in Practice learning workflow. Run inside the repo virtual environment (`uv sync --all-groups` from the repository root).

## Agentic Engineering workflow

1. Drop raw club slides, handouts, or notes in `source-material/` (local, gitignored — workflow below).
2. Convert to Markdown with the scripts below or `tools/psscripts/Convert-SourceMaterialToMarkdown.ps1`.
3. **Synthesize** into `docs/`, `sessions/session-NN-*/`, and `sessions/session-NN-*/speaker-notes.md` — original prose, not verbatim copy ([07-reference-docs-rules](../../.cursor/rules/07_reference-docs-rules.mdc)).
4. Verify with `tools/psscripts/Verify-ZeroCopy.ps1` when source `.md` files exist locally.

**Migration status (July 2026):** Educational content lives in `docs/`, `sessions/` (incl. `speaker-notes.md`), and runnable `src/` code. On this workspace, `source-material/` is **not present** (optional local staging only; gitignored). There is no pending raw import to migrate until maintainers drop assets into `source-material/`. Converted staging Markdown must be **synthesized** into educational paths — never committed under `source-material/`.

### Migration target map

| Source topic (typical) | Educational destination |
| ---------------------- | ----------------------- |
| Attendee setup | `docs/03-getting-started.md` |
| Series overview, philosophy | `docs/04-introduction.md` |
| Agent concepts | `docs/05-ai-agents.md` |
| OpenAI Agent SDK notes | `docs/06-openai-agent-sdk.md` |
| MCP / tools | `docs/07-mcp.md`, `docs/08-tool-calling.md` |
| Context engineering | `docs/09-context-engineering.md` |
| RAG / knowledge | `docs/10-rag.md` |
| Multi-agent orchestration | `docs/11-multi-agent.md` |
| Production foundations | `docs/12-production.md` |
| Observability / dashboard | `docs/13-observability-dashboard.md` |
| Versioning / Git tags | `docs/14-versioning-branching.md` |
| Evaluation / guardrails | `docs/15-evaluation-guardrails.md` |
| Releases / tagging runbook | `docs/16-releases.md` |
| Session scripts (live) | `sessions/session-NN-*/speaker-notes.md` |
| Session course packages | `sessions/session-NN-*/` |
| Architecture diagrams | `docs/architecture/`, exported PNGs in `docs/images/` |

## Shared module

### `_common.py`

Path helpers (for example `is_within`). Import from sibling scripts when useful.

### `task_check.py`

Repository-health summary: duplicate Markdown, unexpected `.ipynb` validation, `source-material/` extension counts, and public references to `source-material/`.

```powershell
uv run python tools/pyscripts/task_check.py --json
```

## Conversion tools (staging → Markdown)

All converters write **staging artifacts**. Promote content into `docs/`, `sessions/session-NN-*/`, or `sessions/session-NN-*/speaker-notes.md` manually after synthesis.

### `pdf_to_md.py` / `pdf_to_markdown.py`

PDF → Markdown. Use `--ocr` or `--ocr-when-empty` for scanned PDFs (requires [Tesseract](https://github.com/tesseract-ocr/tesseract)).

```powershell
uv run python tools/pyscripts/pdf_to_md.py --input source-material --recursive --output-same-folder --ocr-when-empty
uv run python tools/pyscripts/pdf_to_markdown.py "source-material/handout.pdf"
```

### `html_to_md.py`

HTML slide deck → Markdown.

```powershell
uv run python tools/pyscripts/html_to_md.py --input source-material --recursive --output-same-folder
```

### `pptx_to_md.py`

PPTX → Markdown (optional image extraction).

```powershell
uv run python tools/pyscripts/pptx_to_md.py --input source-material --recursive --output-same-folder --allow-source-material-output
```

### `docx_to_md.py`

DOCX/DOC → Markdown (pandoc; legacy `.doc` may use Word COM on Windows).

```powershell
uv run python tools/pyscripts/docx_to_md.py --input source-material --recursive --output-same-folder --allow-source-material-output
```

### Batch conversion (PowerShell)

```powershell
.\tools\psscripts\Convert-SourceMaterialToMarkdown.ps1
```

### `video_to_transcript.py`

Video/audio → transcript (Whisper). Requires `ffmpeg` on PATH.

```powershell
uv run python tools/pyscripts/video_to_transcript.py --input source-material --recursive
```

## Other utilities

### `md_to_pdf_reportlab.py`

Markdown subset → PDF via ReportLab.

```powershell
uv run python tools/pyscripts/md_to_pdf_reportlab.py --input path/to/report.md --output path/to/out.pdf --title "Title"
```

### `sync_clinerules_skills.py`

Regenerate `.clinerules/skills/*.md` from `.github/skills/*/SKILL.md` after canonical skill updates.

```powershell
uv run python tools/pyscripts/sync_clinerules_skills.py
```

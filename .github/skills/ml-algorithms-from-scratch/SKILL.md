---
name: t2-machine-learning
description: Work on t2-machine-learning — week folders under src/, four-layer companions (01-notes, 02-quizzes, 03-notebooks, 04-discussions), from-scratch implementations, zero-copy, beginner-friendly explanations, and realistic business use cases.
---

# Machine Learning Algorithms from Scratch

**Scope:** Swamy PKV's personal learning only. See `README.md` and `.cursor/rules/01_swamy_personal_learning_only.mdc`.

## Layout

Content is organized by **week** under `src/weekN/`. Each week has four companion subfolders:

| Layer | Path |
|-------|------|
| Notes | `src/weekN/01-notes/` |
| Quizzes | `src/weekN/02-quizzes/` |
| Notebooks | `src/weekN/03-notebooks/` |
| Discussions | `src/weekN/04-discussions/` |

Shared reusable logic lives in `src/` alongside the week folders.

## Topic-block numbering

- **Term map:** `src/course-roadmap-and-module-overview.md` — no `NN-` prefix.
- **`01-notes/`:** continuous `01`–`NN` in read order; `01-` = week introduction.
- **`02-quizzes/`:** `01`–`NN` by curriculum topic index.
- **`03-notebooks/` / `04-discussions/`:** continuous `01`–`NN` within each layer.
- **Cross-layer map:** topic index in each week's `01-introduction-*.md` note.
- **Never** `00-` / `00_` on learning files. Full rules: `.cursor/rules/08_file-naming-conventions.mdc`.

## Topic theme

Machine learning fundamentals from first principles: workflow and KDD/CRISP-DM; supervised and unsupervised paradigms; data preprocessing; classification and evaluation; overfitting and underfitting. Core algorithm logic is implemented from scratch in notebooks; scikit-learn is allowed only for dataset loading, baselines, or workflow foundations where the learning goal is not the core learning rule.

## Teaching quality

- Explain concepts in beginner-friendly language before using formal ML terms.
- Add layman explanations for important ideas, formulas, and workflow choices.
- Use realistic business use cases whenever practical so the concept is tied to a real application.
- Pair display equations with plain-English intuition and a numeric walkthrough when the topic is quantitative.
- Include a Mermaid diagram with an ASCII fallback wherever a process, flow, relationship, or architecture is easier to understand visually.

## Related

- **Topic SOP:** `.github/skills/topic-companions/SKILL.md`
- **CI commands:** `.github/skills/ci-checks/SKILL.md`
- **Subagent:** `.cursor/agents/ml-topic-bundle-review.md`

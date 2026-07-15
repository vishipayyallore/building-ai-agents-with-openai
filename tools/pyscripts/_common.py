"""Shared helpers for tools/pyscripts/ scripts."""

from __future__ import annotations

from pathlib import Path


def is_within(child: Path, parent: Path) -> bool:
    """Return True if *child* is inside *parent* (best-effort for Windows paths)."""
    try:
        child.resolve().relative_to(parent.resolve())
        return True
    except Exception:
        return False

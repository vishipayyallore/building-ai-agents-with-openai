# ADR-002: Use Git Tags for Session Milestones

## Status

Accepted

## Context

Learners need a reliable way to revisit the exact state of the repository after each session. Long-lived branches can drift and create competing versions of the same application.

## Decision

Use annotated Git tags instead of long-lived branches to represent session milestones.

## Consequences

- Each completed session has an immutable checkpoint.
- `main` can remain the latest completed state.
- Late joiners can check out any previous session without navigating parallel code trees.
- Session branches may still be used briefly during development, but they are not the teaching artifact.

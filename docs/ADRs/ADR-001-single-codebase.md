# ADR-001: Use a Single Evolving Application

## Status

Accepted

## Context

The series teaches Agentic Engineering as an evolving software architecture discipline. Separate demo applications would make each session easier to isolate, but they would hide how real systems grow over time.

## Decision

Use one evolving application instead of multiple demo applications or separate repositories.

## Consequences

- Attendees see how each capability builds on previous work.
- Git history and tags become the mechanism for replaying each session.
- The codebase stays closer to real product development.
- Each session must preserve prior functionality while adding the next capability.
- Course packaging and the public publish projection are separate concerns — see [ADR-008](./ADR-008-product-organization-publishing.md).

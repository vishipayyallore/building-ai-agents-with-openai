# ADR-003: Use an Agent Dashboard

## Status

Accepted

## Context

A traditional chatbot UI hides the engineering behavior that this repository is trying to teach. Learners need to see prompts, decisions, tool selection, execution, and final responses as separate concerns.

## Decision

Use an Agent Dashboard instead of a traditional chatbot interface.

## Consequences

- The UI reinforces the system architecture instead of only showing conversation text.
- Tool calling and execution state become observable during demos.
- Future sessions can add panels for memory, retrieval, agent registry, health, tracing, and evaluation without replacing the core interface.

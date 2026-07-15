# ADR-004: Expose a Decision Timeline Event Contract

## Status

Accepted

## Context

The application needs to show what the agent did without exposing raw model reasoning. The same execution data should support the dashboard in early sessions and observability, tracing, metrics, and evaluation in later sessions.

## Decision

Expose structured Decision Timeline events instead of model reasoning.

## Consequences

- The frontend can render a stable event stream from Session 1.
- Session 7 observability can index the same event shape without redesign.
- The repository teaches traceable agent execution while avoiding chain-of-thought exposure.
- Event names and payload fields become a backend-to-frontend contract and should change carefully.

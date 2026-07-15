# ADR-006: Include .NET Aspire for Microsoft-Centric Orchestration

## Status

Accepted

## Context

Phase II introduces AI Platform Engineering. The repository uses a Python/FastAPI backend, a React frontend, and an MCP server, but the curriculum also represents a software architecture portfolio and should demonstrate cloud-native orchestration patterns relevant to Microsoft-centric teams.

Docker Compose remains broadly useful and familiar for local multi-service development. .NET Aspire adds a useful architectural lens for service discovery, configuration, local orchestration, and OpenTelemetry-oriented distributed application development.

## Decision

Include .NET Aspire in Phase II as a demonstration of distributed application orchestration patterns for teams working in Microsoft-centric environments. It is not presented as the only or preferred orchestration technology.

## Consequences

- Learners see both general container composition and Microsoft-oriented orchestration patterns.
- Aspire is introduced only after the application has enough services to make orchestration meaningful.
- The repository can demonstrate service discovery, configuration, and telemetry concepts without moving those concerns into Session 1.
- Documentation must be clear that Aspire complements, rather than replaces, Docker Compose or cloud-native deployment options.

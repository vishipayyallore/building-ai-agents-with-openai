# Evaluation & Guardrails

> **Status:** 📅 Planned — Session 8 (`v8.0-evaluation-guardrails`)  
> **Prerequisite:** Session 7 Production Foundations ([12-production.md](./12-production.md))

Session 8 teaches how to measure and constrain agent behavior before changes reach users. The session asks: **How do we know our agent is correct and safe?**

## Plain English

An agent can pass a smoke test and still answer poorly. **Evaluation** checks output quality against examples, rubrics, or expected behaviors. **Guardrails** block or shape unsafe behavior before it becomes a user-facing response.

**Business scenario:** An internal policy assistant should answer from approved documents, refuse prompt-injection attempts, and keep working after a prompt or model change.

## Planned capabilities

| Capability | Purpose |
| ---------- | ------- |
| **Golden prompts** | Regression cases for common user tasks |
| **Eval runner** | Repeatable command that scores agent responses |
| **Guardrails** | Input and output checks for unsafe or unsupported requests |
| **Prompt-injection tests** | Cases that try to override system instructions or ignore retrieved context |
| **Quality gate** | CI signal that fails when behavior regresses |

## Planned code additions

```text
src/backend/app/evals/
    datasets.py
    runner.py
    graders.py
src/backend/app/guardrails/
    input_checks.py
    output_checks.py
tests/evals/
    test_golden_prompts.py
    test_prompt_injection.py
```

## Decision Timeline evolution

Session 8 keeps the same `DecisionEvent` contract and adds evaluation-oriented visibility rather than a separate debugging surface.

Planned dashboard additions:

- Evaluation Results
- Guardrail Status
- Security Events

## Evaluation vs smoke testing

| | Smoke tests | Evaluations |
| - | ----------- | ----------- |
| Session | 7 | 8 |
| Question | Does the app run? | Is the agent behavior good enough? |
| Example | Health endpoint and chat round-trip | Golden prompt scored against expected behavior |
| Failure meaning | Service is broken | Behavior regressed or violated a safety rule |

## Killer demo (planned)

1. Run a passing eval set for calculator, weather, and RAG questions.
2. Intentionally weaken agent instructions or remove a guardrail.
3. Rerun evals and show the quality gate fail.
4. Restore the instruction or guardrail and show the gate pass again.

## Related

- [12-production.md](./12-production.md) — production workflow before quality gates
- [13-observability-dashboard.md](./13-observability-dashboard.md) — dashboard panels and event contract
- [presentation/demo-08/README.md](../presentation/demo-08/README.md)
- [02-master-plan.md § Curriculum roadmap](./02-master-plan.md#10-curriculum-roadmap)

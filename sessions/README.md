# Sessions — the course (Teaching Product packaging)

Sessions **teach** the application. They do **not own** the application.

Private Engineering Organization builds these packages. Public Teaching Product (`building-ai-agents-with-openai`) receives them via `_meta/Publish-Release.ps1` ([ADR-008](../docs/ADRs/ADR-008-product-organization-publishing.md)).

## Learning path

| # | Package | Tag | Status |
| - | ------- | --- | ------ |
| 1 | [session-01-build-your-first-agent](./session-01-build-your-first-agent/) | `v1.0-build-your-first-agent` | Released |
| 2 | [session-02-stateful-agents](./session-02-stateful-agents/) | `v2.0-stateful-agents` | Planned |
| 3 | [session-03-multi-provider-agents](./session-03-multi-provider-agents/) | `v3.0-multi-provider-agents` | Planned |
| 4 | [session-04-context-engineering](./session-04-context-engineering/) | `v4.0-context-engineering` | Planned |
| 5 | [session-05-knowledge-driven-agents](./session-05-knowledge-driven-agents/) | `v5.0-knowledge-driven-agents` | Planned |
| 6 | [session-06-multi-agent-engineering](./session-06-multi-agent-engineering/) | `v6.0-multi-agent-engineering` | Planned |
| 7 | [session-07-production-foundations](./session-07-production-foundations/) | `v7.0-production-foundations` | Planned |
| 8 | [session-08-evaluation-guardrails](./session-08-evaluation-guardrails/) | `v8.0-evaluation-guardrails` | Planned |
| 9 | [session-09-local-capstone](./session-09-local-capstone/) | `v9.0-local-capstone` | Planned |
| 10 | [session-10-distributed-persistence](./session-10-distributed-persistence/) | `v10.0-distributed-persistence` | Planned |
| 11 | [session-11-event-driven-ai](./session-11-event-driven-ai/) | `v11.0-event-driven-ai` | Planned |
| 12 | [session-12-cloud-native-ai](./session-12-cloud-native-ai/) | `v12.0-cloud-native-ai` | Planned |
| 13 | [session-13-kubernetes-cloud](./session-13-kubernetes-cloud/) | `v13.0-kubernetes-cloud` | Planned |
| 14 | [session-14-enterprise-operations](./session-14-enterprise-operations/) | `v14.0-enterprise-operations` | Planned |
| 15 | [session-15-enterprise-capstone](./session-15-enterprise-capstone/) | `v15.0-enterprise-capstone` | Planned |

```text
Session N  →  explains  →  src/ at tag vN.0-…
```

**Never** add `src/` under a session folder.

`version.md` template: [_templates/version.md](./_templates/version.md).

Governance: [ADR-002](../docs/ADRs/ADR-002-git-tags.md) · [ADR-008](../docs/ADRs/ADR-008-product-organization-publishing.md) · **Repository Architecture v1.0** (frozen).

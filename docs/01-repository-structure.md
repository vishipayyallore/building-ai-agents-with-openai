# Repository Structure

```text
agentic-engineering-in-practice/
│
├── .github/
│   ├── agents/                    # Subagent definitions (canonical)
│   ├── prompts/                   # Repo-specific task prompts
│   ├── rules/                     # Governance rules (canonical)
│   ├── skills/                    # Bundled skill definitions (canonical)
│   └── workflows/                 # CI/CD pipelines
│
├── _internal/                     # Never published (maintainer notebook)
├── _meta/                         # Publishing manifest + release checklist
├── examples/                      # Optional talk/blog snippets (not a second app)
├── assets/                        # Shared media (Layout Freeze)
├── tools/                         # Repo tooling (pyscripts, psscripts, …)
├── sessions/                      # Course packages (bind to Git tags; no src/ copy)
│   └── session-01-build-your-first-agent/
│       # presentation/ migrates here from presentation/demo-01 (ADR-008 backlog)
│
├── docs/
│   ├── ADRs/
│   │   ├── ADR-001-single-codebase.md
│   │   ├── ADR-002-git-tags.md
│   │   ├── ADR-003-dashboard.md
│   │   ├── ADR-004-event-contract.md
│   │   ├── ADR-005-provider-before-gateway.md
│   │   ├── ADR-006-aspire-for-microsoft-orchestration.md
│   │   ├── ADR-007-demo-routing-level1-level2.md
│   │   └── ADR-008-product-organization-publishing.md
│   │
│   ├── spikes/
│   │   ├── SPIKE-001-provider-sdk-compatibility.md
│   │   ├── SPIKE-002-personal-deploy-after-session.md
│   │   └── assets/
│   │       └── session-1-ec2/
│   │           ├── nginx-agentic.conf
│   │           └── agentic-api.service
│   │
│   ├── co-architect-operating-guidance.md
│   ├── 01-repository-structure.md
│   ├── 02-master-plan.md
│   ├── 03-getting-started.md
│   ├── 04-introduction.md
│   ├── 05-ai-agents.md
│   ├── 06-openai-agent-sdk.md
│   ├── 07-mcp.md
│   ├── 08-tool-calling.md
│   ├── 09-context-engineering.md
│   ├── 10-rag.md
│   ├── 11-multi-agent.md
│   ├── 12-production.md
│   ├── 13-observability-dashboard.md
│   ├── 14-versioning-branching.md
│   ├── 15-evaluation-guardrails.md
│   ├── 16-releases.md             # Tag + GitHub Release command track
│   ├── agent-subagents.md
│   ├── agent-skills.md
│   ├── agent-governance-recovery.md
│   ├── diagrams/               # Optional .mmd sources + mermaid-config.json for PNG export
│   ├── images/                 # Doc-embedded images (optional placeholder)
│   └── architecture/
│       ├── 01-context.md
│       ├── 02-container.md
│       ├── 03-components.md
│       ├── 04-sequence.md
│       ├── 05-deployment.md
│       └── demo-1-stack.md
│
├── source-material/          # Optional local staging (entire folder gitignored)
│
├── presentation/             # Transitional presenter home (ADR-008 Priority-1 → sessions/)
│   ├── demo-01/
│   ├── demo-02/
│   ├── demo-03/
│   ├── demo-04/
│   ├── demo-05/
│   ├── ...
│   └── demo-15/
│
├── src/
│   │
│   ├── frontend/
│   │   ├── public/
│   │   └── src/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── pages/
│   │       ├── services/
│   │       ├── types/
│   │       ├── test/
│   │       │   └── setup.ts          # Vitest setup
│   │       ├── App.tsx
│   │       └── main.tsx
│   │
│   ├── backend/
│   │   ├── README.md
│   │   ├── app/
│   │   │   ├── __init__.py
│   │   │   ├── agent_runtime/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── agent.py
│   │   │   │   ├── direct_llm.py
│   │   │   │   ├── instructions.py
│   │   │   │   ├── models.py       # AgentMaturityLevel, DecisionEvent, response models
│   │   │   │   └── event_bus.py
│   │   │   │   # Session 3+ (planned, not on disk yet): agent_runtime/llm/
│   │   │   │   #   provider.py, openai_provider.py, bedrock_provider.py,
│   │   │   │   #   azure_openai_provider.py (optional extension)
│   │   │   │
│   │   │   ├── api/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── chat.py
│   │   │   │   └── llm.py
│   │   │   │
│   │   │   # Session 3+ (planned, not on disk yet): app/services/
│   │   │   │
│   │   │   ├── config.py
│   │   │   └── main.py
│   │   │
│   │   ├── tests/
│   │
│   └── mcp-server/
│       ├── README.md
│       ├── server.py
│       ├── tools/
│       │   ├── calculator.py
│       │   ├── weather.py
│       │   └── __init__.py
│       └── tests/
│
├── .env.example
├── .gitignore
├── pyproject.toml
├── uv.lock
├── LICENSE
└── README.md
```

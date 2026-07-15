# Retrieval-Augmented Generation (RAG)

> **Status:** 📅 Planned — Session 5 (`v5.0-knowledge-driven-agents`)  
> **Prerequisite:** Session 4 Context Engineering ([09-context-engineering.md](./09-context-engineering.md))

Session 5 grounds the agent in **your documents** — policies, runbooks, product specs — so answers cite retrieved content instead of model guesswork. This session asks: **How does an Agent know things it was never trained on?**

## Plain English

**RAG** = **R**etrieve relevant chunks from a knowledge base, **A**ugment the model prompt with them, **G**enerate an answer grounded in that context.

**Business scenario:** An internal HR policy bot must answer *"How many remote days per month?"* from the employee handbook — not from generic internet training data.

## Planned capabilities

| Capability | Purpose |
| ---------- | ------- |
| **Embeddings** | Turn document chunks into vectors |
| **Vector store** | Similarity search over corpus |
| **Knowledge tool** | MCP `search_docs` (or equivalent) |
| **UI: Retrieved Documents** | Show what the agent read |

## Planned code additions

```text
src/backend/app/rag/
    embedding.py
    vector_store.py
    retriever.py
src/mcp-server/tools/
    + knowledge.py
src/frontend/src/components/
    + RetrievedDocuments.tsx
data/corpus/              # local docs for demo
```

`data/corpus/` is a planned Session 5 folder, not part of the current Demo 1 scaffold. Add it to [01-repository-structure.md](./01-repository-structure.md) when the RAG implementation lands.

## Killer demo (planned)

**Prompt:** `What is our refund policy for enterprise customers?`

**Expected flow:**

1. Agent selects knowledge search tool
2. Retriever returns top document chunks
3. Retrieved Documents panel lists sources
4. Final answer summarizes policy with traceable context

## Architecture addition

```text
User prompt
    → Agent selects search_docs
    → MCP knowledge tool
    → Vector store query
    → Chunks returned to model
    → Grounded answer + citations in UI
```

## Design principles (from master plan)

- Local corpus under `data/corpus/` for reproducible demos
- Same Decision Timeline contract — new events for retrieval, not a new UI paradigm
- Enterprise pattern: swap local store for managed vector DB later without changing MCP tool shape

## Related

- [07-mcp.md](./07-mcp.md) — adding `knowledge.py` tool
- [presentation/demo-05/README.md](../presentation/demo-05/README.md)
- [02-master-plan.md § Curriculum roadmap](./02-master-plan.md#10-curriculum-roadmap)

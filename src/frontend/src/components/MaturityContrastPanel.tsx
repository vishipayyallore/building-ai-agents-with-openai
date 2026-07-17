import { Link } from "react-router-dom";

const LEVEL_1_FLOW = `User
   │
   ▼
Raw LLM Prompt
   │
   ▼
LLM Response`;

const LEVEL_2_FLOW = `User
   │
   ▼
Agent Runtime
   │
   ├── Instructions
   ├── Tool Selection
   ├── MCP
   └── Decision Timeline`;

export function MaturityContrastPanel() {
  return (
    <details
      data-testid="maturity-contrast-panel"
      open
      className="group card-in rounded-xl border border-slate-200 bg-white shadow-card"
    >
      <summary className="cursor-pointer list-none px-5 py-4 [&::-webkit-details-marker]:hidden">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              <i className="fa-solid fa-layer-group text-slate-400" />
              Direct LLM vs Agentic
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Level 1 is the baseline most chat UIs use.{" "}
              <span className="font-medium text-slate-800">
                This dashboard runs Level 2
              </span>{" "}
              — an Agent Runtime with tools and a visible decision path.
            </p>
          </div>
          <span className="mt-0.5 shrink-0 text-slate-400 transition-transform group-open:rotate-180">
            <i className="fa-solid fa-chevron-down text-xs" aria-hidden="true" />
          </span>
        </div>
      </summary>

      <div className="border-t border-slate-100 px-5 pb-5 pt-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full border border-slate-300 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Level 1
              </span>
              <span className="text-sm font-semibold text-slate-700">
                Direct LLM Interaction
              </span>
            </div>
            <pre className="overflow-x-auto rounded-md border border-slate-200 bg-white p-3 font-mono text-[11px] leading-relaxed text-slate-700">
              {LEVEL_1_FLOW}
            </pre>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
              <li>
                <i className="fa-solid fa-minus mr-1.5 text-slate-400" />
                Stateless — no runtime boundary
              </li>
              <li>
                <i className="fa-solid fa-minus mr-1.5 text-slate-400" />
                No tools, timeline, or audit trail
              </li>
              <li>
                <i className="fa-solid fa-minus mr-1.5 text-slate-400" />
                Typical chatbot / raw API call
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50/40 p-4 ring-1 ring-emerald-100">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full border border-emerald-300 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-800">
                Level 2
              </span>
              <span className="text-sm font-semibold text-slate-900">
                Proxy Agent — this app
              </span>
            </div>
            <pre className="overflow-x-auto rounded-md border border-emerald-100 bg-white p-3 font-mono text-[11px] leading-relaxed text-slate-800">
              {LEVEL_2_FLOW}
            </pre>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-700">
              <li>
                <i className="fa-solid fa-check mr-1.5 text-emerald-600" />
                Instruction-based tool calling via MCP
              </li>
              <li>
                <i className="fa-solid fa-check mr-1.5 text-emerald-600" />
                Decision Timeline + Tool Registry below
              </li>
              <li>
                <i className="fa-solid fa-check mr-1.5 text-emerald-600" />
                Prompt-scoped context (session memory in Demo 2)
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-slate-500">
          Maturity levels are a conceptual ladder, not a certification model.
          Canonical definition for this repo: the{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px] text-slate-700">
            AgentMaturityLevel
          </code>{" "}
          enum in the backend. Collapse this panel once the room has seen the
          contrast. Try{" "}
          <Link
            to="/demo/level-1"
            className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-2 hover:text-slate-900"
          >
            Direct LLM demo
          </Link>
          .
        </p>
      </div>
    </details>
  );
}

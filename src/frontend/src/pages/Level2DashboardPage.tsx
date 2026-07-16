import { Link } from "react-router-dom";
import { DecisionTimeline } from "../components/DecisionTimeline";
import { FinalResponse } from "../components/FinalResponse";
import { MaturityContrastPanel } from "../components/MaturityContrastPanel";
import { PromptPanel } from "../components/PromptPanel";
import { ToolExecution } from "../components/ToolExecution";
import { ToolRegistry } from "../components/ToolRegistry";
import { useChat } from "../hooks/useChat";

export function Level2DashboardPage() {
  const { events, response, loading, error, submit } = useChat();

  return (
    <main id="dashboard" data-testid="level-2-page" className="flex-1 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-8 border-b border-slate-200 pb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Level 2 · Proxy Agent
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Agent Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            React | FastAPI | OpenAI Agent SDK | MCP{" "}
            <span className="text-slate-400">(calculator + weather)</span>
          </p>
          <p className="mt-3 inline-flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-800">
              Session 1 deliverable
            </span>
            <span className="text-xs text-slate-500">
              Instruction-based tool calling · prompt-scoped context · Decision Timeline
            </span>
            <Link
              to="/demo/level-1"
              className="text-xs font-medium text-slate-700 underline decoration-slate-300 underline-offset-2 hover:text-slate-900"
            >
              Compare with Direct LLM
            </Link>
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <MaturityContrastPanel />
          <PromptPanel onSubmit={submit} loading={loading} />
          <DecisionTimeline events={events} />
          <div className="grid gap-5 md:grid-cols-2">
            <ToolRegistry events={events} />
            <ToolExecution events={events} />
          </div>
          <FinalResponse response={response} error={error} />
        </div>
      </div>
    </main>
  );
}

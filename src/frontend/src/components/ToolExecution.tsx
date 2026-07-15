import type { DecisionEvent } from "../types/decision-event";

interface ToolExecutionProps {
  events: DecisionEvent[];
}

const EXEC_META: Record<string, { icon: string; badge: string }> = {
  ToolInvoked: {
    icon: "fa-solid fa-play",
    badge: "bg-slate-900 text-white",
  },
  ToolCompleted: {
    icon: "fa-solid fa-check",
    badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  },
  ToolFailedHandled: {
    icon: "fa-solid fa-triangle-exclamation",
    badge: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  },
  ToolFailedUnhandled: {
    icon: "fa-solid fa-circle-xmark",
    badge: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
  },
};

export function ToolExecution({ events }: ToolExecutionProps) {
  const executions = events.filter((e) =>
    ["ToolInvoked", "ToolCompleted", "ToolFailedHandled", "ToolFailedUnhandled"].includes(
      e.event,
    ),
  );

  return (
    <section
      data-testid="tool-execution"
      className="card-in rounded-xl border border-slate-200 bg-white p-5 shadow-card"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          <i className="fa-solid fa-terminal text-slate-400" />
        Tool Execution
        </h2>
        {executions.length > 0 && (
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
            {executions.length} call{executions.length === 1 ? "" : "s"}
          </span>
        )}
      </div>
      {executions.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center">
          <i className="fa-solid fa-code mb-2 text-2xl text-slate-300" />
          <p className="text-sm text-slate-500">No tool calls yet.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {executions.map((ev) => {
            const meta = EXEC_META[ev.event] ?? {
              icon: "fa-solid fa-circle-dot",
              badge: "bg-slate-100 text-slate-700",
            };
            return (
              <li
                key={`${ev.requestId}-${ev.sequence}`}
                data-testid={`exec-${ev.event}-${ev.sequence}`}
                className="card-in rounded-lg border border-slate-200 bg-slate-50/60 p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${meta.badge}`}
                  >
                    <i className={meta.icon} />
                    {ev.event}
                  </span>
                  {ev.tool && (
                    <span className="font-mono text-xs text-slate-600">
                      <i className="fa-solid fa-arrow-right mx-1 text-slate-400" />
                      {ev.tool}
                    </span>
                  )}
                </div>

                {ev.params && (
                  <div className="mt-2">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      Params
                    </p>
                    <pre className="overflow-x-auto rounded bg-slate-900 px-3 py-2 font-mono text-[11px] leading-relaxed text-slate-100">
                      {JSON.stringify(ev.params, null, 2)}
                    </pre>
                  </div>
                )}

                {ev.result !== undefined && ev.result !== null && (
                  <div className="mt-2">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      Result
                    </p>
                    <pre className="overflow-x-auto rounded border border-slate-200 bg-white px-3 py-2 font-mono text-[11px] leading-relaxed text-slate-800">
                      {typeof ev.result === "string"
                        ? ev.result
                        : JSON.stringify(ev.result, null, 2)}
                    </pre>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

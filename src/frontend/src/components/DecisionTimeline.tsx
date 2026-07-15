import type { DecisionEvent } from "../types/decision-event";

interface DecisionTimelineProps {
  events: DecisionEvent[];
}

const EVENT_META: Record<string, { icon: string; tone: string }> = {
  PromptReceived: { icon: "fa-solid fa-inbox", tone: "text-slate-700 bg-slate-100" },
  ToolSelected: { icon: "fa-solid fa-bullseye", tone: "text-slate-700 bg-slate-100" },
  ToolInvoked: { icon: "fa-solid fa-play", tone: "text-slate-800 bg-slate-200" },
  ToolCompleted: { icon: "fa-solid fa-check", tone: "text-emerald-700 bg-emerald-50" },
  ToolFailedHandled: { icon: "fa-solid fa-triangle-exclamation", tone: "text-amber-700 bg-amber-50" },
  ToolFailedUnhandled: { icon: "fa-solid fa-circle-xmark", tone: "text-rose-700 bg-rose-50" },
  ResponseSynthesized: { icon: "fa-solid fa-flag-checkered", tone: "text-slate-900 bg-slate-200" },
  ResponseDelivered: { icon: "fa-solid fa-flag-checkered", tone: "text-slate-900 bg-slate-200" },
};

export function DecisionTimeline({ events }: DecisionTimelineProps) {
  return (
    <section
      data-testid="decision-timeline"
      className="card-in rounded-xl border border-slate-200 bg-white p-5 shadow-card"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          <i className="fa-solid fa-timeline text-slate-400" />
        Decision Timeline
        </h2>
        {events.length > 0 && (
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
            {events.length} event{events.length === 1 ? "" : "s"}
          </span>
        )}
      </div>
      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center">
          <i className="fa-solid fa-hourglass-half mb-2 text-2xl text-slate-300" />
          <p className="text-sm text-slate-500">Events appear here after you send a prompt.</p>
        </div>
      ) : (
        <ol className="relative space-y-3 border-l border-slate-200 pl-5">
          {events.map((ev) => {
            const meta = EVENT_META[ev.event] ?? {
              icon: "fa-solid fa-circle-dot",
              tone: "text-slate-700 bg-slate-100",
            };
            return (
              <li key={`${ev.requestId}-${ev.sequence}`} className="relative card-in">
                <span
                  className={`absolute -left-[27px] grid h-5 w-5 place-items-center rounded-full ring-4 ring-white ${meta.tone}`}
                >
                  <i className={`${meta.icon} text-[10px]`} />
                </span>
                <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 transition-colors hover:border-slate-300 hover:bg-slate-50">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-sm font-medium text-slate-900">
                      {ev.event}
                    </span>
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">
                      #{ev.sequence}
                    </span>
                  </div>
                  {ev.tool && (
                    <p className="mt-1 inline-flex items-center gap-1 text-xs text-slate-500">
                      <i className="fa-solid fa-screwdriver-wrench text-[10px]" />
                      tool: <span className="font-mono text-slate-700">{ev.tool}</span>
                    </p>
                  )}
                  {ev.error && (
                    <p className="mt-1 rounded bg-amber-50 px-2 py-1 text-xs text-amber-700">
                      <i className="fa-solid fa-triangle-exclamation mr-1" />
                      {ev.error.code}: {ev.error.message}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}

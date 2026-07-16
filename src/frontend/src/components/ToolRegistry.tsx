import type { DecisionEvent, ToolState } from "../types/decision-event";
import { DEMO_TOOLS } from "../types/decision-event";

interface ToolRegistryProps {
  events: DecisionEvent[];
}

function toolState(tool: string, events: DecisionEvent[]): ToolState {
  const relevant = events.filter((e) => e.tool === tool);
  if (relevant.some((e) => e.event === "ToolFailedUnhandled")) return "failed";
  if (relevant.some((e) => e.event === "ToolFailedHandled")) return "handled_failure";
  if (relevant.some((e) => e.event === "ToolCompleted")) return "success";
  if (relevant.some((e) => e.event === "ToolInvoked")) return "running";
  if (relevant.some((e) => e.event === "ToolSelected")) return "selected";
  return "available";
}

const STATE_UI: Record<ToolState, { icon: string; label: string; className: string }> = {
  available: {
    icon: "fa-solid fa-circle",
    label: "Available",
    className: "border-slate-200 bg-slate-50 text-slate-600",
  },
  selected: {
    icon: "fa-solid fa-crosshairs",
    label: "Selected",
    className: "border-slate-300 bg-slate-100 text-slate-800",
  },
  running: {
    icon: "fa-solid fa-spinner fa-spin",
    label: "Running",
    className: "border-slate-900 bg-slate-900 text-white",
  },
  success: {
    icon: "fa-solid fa-circle-check",
    label: "Success",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  handled_failure: {
    icon: "fa-solid fa-triangle-exclamation",
    label: "Handled",
    className: "border-amber-200 bg-amber-50 text-amber-700",
  },
  failed: {
    icon: "fa-solid fa-circle-xmark",
    label: "Failed",
    className: "border-rose-200 bg-rose-50 text-rose-700",
  },
};

const TOOL_META: Record<string, { description: string; icon: string }> = {
  calculate: { description: "Arithmetic & math", icon: "fa-solid fa-calculator" },
  get_weather: { description: "Current weather", icon: "fa-solid fa-cloud-sun" },
};

export function ToolRegistry({ events }: ToolRegistryProps) {
  return (
    <section
      data-testid="tool-registry"
      className="card-in rounded-xl border border-slate-200 bg-white p-5 shadow-card"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          <i className="fa-solid fa-toolbox text-slate-400" />
          Tool Registry
        </h2>
        <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
          {DEMO_TOOLS.length} tools
        </span>
      </div>
      <ul className="space-y-2">
        {DEMO_TOOLS.map((tool) => {
          const state = toolState(tool, events);
          const ui = STATE_UI[state];
          const meta = TOOL_META[tool];
          return (
            <li
              key={tool}
              data-testid={`tool-row-${tool}`}
              className="group flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5 transition-all hover:border-slate-300 hover:bg-slate-50"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-slate-100 text-slate-700 ring-1 ring-slate-200 group-hover:bg-white">
                  <i className={meta.icon} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-mono text-sm font-medium text-slate-900">{tool}</p>
                  <p className="truncate text-xs text-slate-500">{meta.description}</p>
                </div>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${ui.className}`}
              >
                <i className={ui.icon} aria-hidden="true" />
                {ui.label}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

import type { FormEvent } from "react";

interface PromptPanelProps {
  onSubmit: (message: string) => void;
  loading: boolean;
}

const SUGGESTIONS = [
  { text: "What is 15 * 23?", icon: "fa-solid fa-calculator" },
  { text: "What's the weather in Seattle?", icon: "fa-solid fa-cloud-sun" },
];

export function PromptPanel({ onSubmit, loading }: PromptPanelProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("prompt") as HTMLInputElement;
    const value = input.value.trim();
    if (!value) return;
    onSubmit(value);
    input.value = "";
  };

  return (
    <section
      data-testid="prompt-panel"
      className="card-in rounded-xl border border-slate-200 bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          <i className="fa-solid fa-message text-slate-400" />
          Prompt
        </h2>
        <span className="hidden text-[11px] text-slate-400 sm:inline">
          <i className="fa-solid fa-keyboard mr-1" />
          Press Enter to send
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <i className="fa-solid fa-wand-magic-sparkles pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            name="prompt"
            type="text"
            data-testid="prompt-input"
            placeholder="Ask the agent…"
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 disabled:opacity-50"
            disabled={loading}
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          data-testid="prompt-submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-black hover:shadow-md active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <i className="fa-solid fa-spinner fa-spin" />
              Running
            </>
          ) : (
            <>
              <i className="fa-solid fa-paper-plane" />
              Send
            </>
          )}
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Try:
        </span>
        {SUGGESTIONS.map((s) => (
          <button
            key={s.text}
            type="button"
            data-testid={`suggestion-${s.text.slice(0, 12).replace(/\W+/g, "-")}`}
            onClick={() => onSubmit(s.text)}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 transition-all hover:border-slate-900 hover:bg-slate-900 hover:text-white disabled:opacity-50"
          >
            <i className={`${s.icon} text-[11px]`} />
            {s.text}
          </button>
        ))}
      </div>
    </section>
  );
}

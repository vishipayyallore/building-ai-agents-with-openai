import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { useDirectLlm } from "../hooks/useDirectLlm";

const SUGGESTIONS = ["What is 15 * 23?", "What's the weather in Seattle?", "What is SOLID?"];

export function Level1DemoPage() {
  const { response, loading, error, submit } = useDirectLlm();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("prompt") as HTMLInputElement;
    const value = input.value.trim();
    if (!value) return;
    submit(value);
    input.value = "";
  };

  return (
    <main data-testid="level-1-page" className="flex-1 bg-white">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-8 border-b border-slate-200 pb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Level 1 · Direct LLM Interaction
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
            Raw LLM Demo
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Prompt in, text out. No Agent Runtime, no MCP tools, no Decision Timeline.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-[11px] leading-relaxed text-slate-700">
            {`User → Raw LLM Prompt → LLM Response`}
          </pre>
        </div>

        <section className="card-in rounded-xl border border-slate-200 bg-white p-5 shadow-card">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
            <input
              name="prompt"
              type="text"
              data-testid="level-1-prompt-input"
              placeholder="Ask the model…"
              disabled={loading}
              autoComplete="off"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 disabled:opacity-50"
            />
            <button
              type="submit"
              data-testid="level-1-submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin" />
                  Running
                </>
              ) : (
                "Send"
              )}
            </button>
          </form>

          <div className="mt-4 flex flex-wrap gap-2">
            {SUGGESTIONS.map((text) => (
              <button
                key={text}
                type="button"
                disabled={loading}
                onClick={() => submit(text)}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 hover:border-slate-900 hover:bg-slate-900 hover:text-white disabled:opacity-50"
              >
                {text}
              </button>
            ))}
          </div>
        </section>

        <section
          data-testid="level-1-response"
          className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-card"
        >
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Response
          </h2>
          {error && (
            <p className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </p>
          )}
          <div className="mt-3 min-h-[5rem] rounded-lg border border-slate-200 bg-gradient-to-br from-slate-50 to-white px-4 py-3 text-sm leading-relaxed text-slate-800">
            {response ? (
              <p className="whitespace-pre-wrap">{response}</p>
            ) : (
              <span className="text-slate-400">The model answer appears here — text only.</span>
            )}
          </div>
          <p className="mt-3 text-xs text-slate-500">
            No tool registry. No execution events. Compare the same prompt on{" "}
            <Link to="/demo/level-2" className="font-medium text-slate-800 underline">
              Agent Dashboard
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}

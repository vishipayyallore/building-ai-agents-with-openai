import { useState } from "react";

interface FinalResponseProps {
  response: string;
  error: string | null;
}

export function FinalResponse({ response, error }: FinalResponseProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!response) return;
    try {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // no-op
    }
  };

  return (
    <section
      data-testid="final-response"
      className="card-in rounded-xl border border-slate-200 bg-white p-5 shadow-card"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          <i className="fa-solid fa-comment-dots text-slate-400" />
        Final Response
        </h2>
        {response && (
          <button
            type="button"
            data-testid="copy-response-btn"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-900 hover:text-white"
          >
            <i className={`fa-solid ${copied ? "fa-check" : "fa-copy"}`} />
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>
      {error && (
        <p
          data-testid="response-error"
          className="mb-3 flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
        >
          <i className="fa-solid fa-circle-exclamation mt-0.5" />
          <span>{error}</span>
        </p>
      )}

      <div
        data-testid="response-body"
        className="min-h-[5rem] rounded-lg border border-slate-200 bg-gradient-to-br from-slate-50 to-white px-4 py-3 text-sm leading-relaxed text-slate-800"
      >
        {response ? (
          <p className="whitespace-pre-wrap">{response}</p>
        ) : (
          <span className="inline-flex items-center gap-2 text-slate-400">
            <i className="fa-solid fa-robot" />
            The agent&apos;s answer appears here.
          </span>
        )}
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import { AgentMaturityLevelName } from "../types/decision-event";

const MATURITY_CARDS = [
  {
    level: 1 as const,
    title: "Direct LLM Interaction",
    summary: "Stateless prompt → model → text. No tools or audit trail.",
    demoPath: "/demo/level-1",
    available: true,
  },
  {
    level: 2 as const,
    title: "Proxy Agent",
    summary: "Agent Runtime, MCP tools, and a visible Decision Timeline.",
    demoPath: "/demo/level-2",
    available: true,
  },
  {
    level: 3 as const,
    title: "Assistant System",
    summary: "Session-based conversation and multi-provider support.",
    demoPath: null,
    available: false,
  },
  {
    level: 4 as const,
    title: "Autonomous Agent",
    summary: "Working memory, context assembly, and knowledge retrieval.",
    demoPath: null,
    available: false,
  },
  {
    level: 5 as const,
    title: "Multi-Agent System",
    summary: "Specialist coordination plus production and enterprise depth.",
    demoPath: null,
    available: false,
  },
];

export function HomePage() {
  return (
    <main data-testid="home-page" className="flex-1 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <section className="border-b border-slate-200 pb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            <i className="fa-solid fa-bolt mr-1.5 text-slate-400" />
            Swamy's Tech Skills Academy · Agentic Engineering in Practice
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            From Direct LLM to Agentic Engineering
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            One application, increasing maturity. Start with a raw language-model call, then
            compare it with a Level 2 Agent Runtime that owns tools, events, and observability.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/demo/level-1"
              data-testid="cta-level-1"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-slate-900 hover:bg-slate-900 hover:text-white"
            >
              <i className="fa-solid fa-comment" />
              Try Direct LLM
            </Link>
            <Link
              to="/demo/level-2"
              data-testid="cta-level-2"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-black"
            >
              <i className="fa-solid fa-gauge-high" />
              Open Agent Dashboard
            </Link>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Agent Maturity Levels
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Conceptual ladder from{" "}
            <code className="rounded bg-slate-100 px-1 text-xs">docs/02-master-plan.md §4.1</code>.
            Demo 1 covers Levels 1 and 2; later sessions climb the rest.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MATURITY_CARDS.map((card) => (
              <article
                key={card.level}
                data-testid={`maturity-card-${card.level}`}
                className={[
                  "rounded-xl border p-5 shadow-card transition-shadow",
                  card.available
                    ? "border-slate-200 bg-white hover:shadow-card-hover"
                    : "border-dashed border-slate-200 bg-slate-50",
                ].join(" ")}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={[
                      "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                      card.available
                        ? "border border-slate-300 bg-slate-100 text-slate-700"
                        : "border border-slate-200 bg-white text-slate-400",
                    ].join(" ")}
                  >
                    Level {card.level}
                  </span>
                  {!card.available && (
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      Coming later
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-sm font-semibold text-slate-900">
                  {AgentMaturityLevelName[card.level]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.summary}</p>
                {card.demoPath && (
                  <Link
                    to={card.demoPath}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-900 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-900"
                  >
                    Open demo
                    <i className="fa-solid fa-arrow-right text-xs" />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-sm font-semibold text-slate-900">Suggested compare flow</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-600">
            <li>
              Ask <code className="rounded bg-white px-1">What is 15 * 23?</code> on{" "}
              <Link to="/demo/level-1" className="font-medium text-slate-900 underline">
                Level 1
              </Link>{" "}
              — answer only, no tool trace.
            </li>
            <li>
              Ask the same on{" "}
              <Link to="/demo/level-2" className="font-medium text-slate-900 underline">
                Level 2
              </Link>{" "}
              — watch <code className="rounded bg-white px-1">calculate</code> in the Decision
              Timeline.
            </li>
          </ol>
        </section>
      </div>
    </main>
  );
}

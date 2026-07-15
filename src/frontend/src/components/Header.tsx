import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchHealth } from "../services/api";
import { UserMenu } from "./UserMenu";

const NAV = [
  { label: "Home", to: "/", icon: "fa-solid fa-house", end: true, testId: "nav-home" },
  {
    label: "Direct LLM",
    to: "/demo/level-1",
    icon: "fa-solid fa-comment",
    end: false,
    testId: "nav-direct-llm",
  },
  {
    label: "Agent Dashboard",
    to: "/demo/level-2",
    icon: "fa-solid fa-gauge-high",
    end: false,
    testId: "nav-agent-dashboard",
  },
];

function navClass({ isActive }: { isActive: boolean }) {
  return [
    "group inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-white/10 text-white"
      : "text-slate-300 hover:bg-white/5 hover:text-white",
  ].join(" ");
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [apiOnline, setApiOnline] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchHealth()
      .then(() => {
        if (!cancelled) setApiOnline(true);
      })
      .catch(() => {
        if (!cancelled) setApiOnline(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      data-testid="site-header"
      className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-900 text-slate-100 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]"
    >
      <div className="bg-grid-slate">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/"
            data-testid="header-brand"
            className="group flex items-center gap-3"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-slate-200 to-slate-400 text-slate-900 shadow-inner ring-1 ring-white/10">
              <i className="fa-solid fa-bolt text-[15px]" aria-hidden="true" />
            </span>
            <span className="text-base font-bold tracking-tight text-white group-hover:text-slate-100">
              Agentic Engineering
            </span>
          </Link>

          <nav data-testid="header-nav" className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                data-testid={item.testId}
                className={navClass}
              >
                <i className={`${item.icon} text-[13px] text-slate-400 group-[.bg-white\\/10]:text-white`} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span
              data-testid="api-status"
              className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 sm:inline-flex"
            >
              <span
                className={`status-dot-pulse h-2 w-2 rounded-full ${
                  apiOnline ? "bg-emerald-400" : "bg-rose-400"
                }`}
              />
              {apiOnline ? "API Online" : "API Offline"}
            </span>

            <UserMenu />

            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              data-testid="mobile-menu-toggle"
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 md:hidden"
            >
              <i className={`fa-solid ${open ? "fa-xmark" : "fa-bars"}`} />
            </button>
          </div>
        </div>

        {open && (
          <div
            data-testid="mobile-menu"
            className="border-t border-white/10 bg-slate-900/95 md:hidden"
          >
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    [
                      "inline-flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-slate-200 hover:bg-white/5 hover:text-white",
                    ].join(" ")
                  }
                >
                  <i className={`${item.icon} w-4 text-slate-400`} />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

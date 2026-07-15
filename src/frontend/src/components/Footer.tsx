const COLS: Array<{
  title: string;
  links: { label: string; href: string; icon?: string }[];
}> = [
  {
    title: "Product",
    links: [
      { label: "Dashboard", href: "#dashboard", icon: "fa-solid fa-gauge-high" },
      { label: "Tools", href: "#tools", icon: "fa-solid fa-screwdriver-wrench" },
      { label: "Changelog", href: "#changelog", icon: "fa-solid fa-clock-rotate-left" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#docs", icon: "fa-solid fa-book-open" },
      { label: "API Reference", href: "#api", icon: "fa-solid fa-code" },
      { label: "Tutorials", href: "#tutorials", icon: "fa-solid fa-graduation-cap" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about", icon: "fa-solid fa-circle-info" },
      { label: "Privacy", href: "#privacy", icon: "fa-solid fa-shield-halved" },
      { label: "Contact", href: "#contact", icon: "fa-solid fa-envelope" },
    ],
  },
];

const SOCIAL = [
  { label: "GitHub", href: "https://github.com", icon: "fa-brands fa-github" },
  { label: "X / Twitter", href: "https://x.com", icon: "fa-brands fa-x-twitter" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "fa-brands fa-linkedin-in" },
  { label: "Discord", href: "https://discord.com", icon: "fa-brands fa-discord" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      data-testid="site-footer"
      className="mt-12 border-t border-slate-800/60 bg-slate-900 text-slate-300"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-slate-200 to-slate-400 text-slate-900 ring-1 ring-white/10">
                <i className="fa-solid fa-bolt text-[13px]" />
              </span>
              <span className="text-sm font-bold tracking-tight text-white">
                Agentic Engineering
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
              A reference dashboard for inspecting agent decisions, tool registry state, and final
              responses - in real time.
            </p>
            <div className="mt-4 flex items-center gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  data-testid={`social-${s.label.toLowerCase().replace(/[^a-z]/g, "")}`}
                  className="grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {col.title}
              </h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white"
                    >
                      {link.icon && (
                        <i
                          className={`${link.icon} w-4 text-slate-500 group-hover:text-slate-200`}
                        />
                      )}
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-400">
            (c) {year} Swamy's Tech Skills Academy. Built with React | FastAPI | OpenAI Agent SDK |
            MCP.
          </p>
          <p className="inline-flex items-center gap-1.5 text-xs text-slate-500">
            <i className="fa-solid fa-code text-slate-400" />
            Crafted with care
          </p>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useRef, useState } from "react";

const MENU_ITEMS = [
  { label: "Profile", icon: "fa-solid fa-user", testId: "user-menu-profile" },
  { label: "Settings", icon: "fa-solid fa-gear", testId: "user-menu-settings" },
  { label: "Logout", icon: "fa-solid fa-right-from-bracket", testId: "user-menu-logout" },
] as const;

/** Session 1 placeholder — auth wiring arrives in a later session. */
const LOGGED_IN_USER = {
  name: "Srivaru",
};

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative" data-testid="user-menu">
      <button
        type="button"
        aria-label="User menu"
        aria-haspopup="menu"
        aria-expanded={open}
        data-testid="user-menu-trigger"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1 pl-1 pr-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10 hover:text-white sm:pr-3"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-slate-200 to-slate-400 text-slate-900 ring-1 ring-white/10">
          <i className="fa-solid fa-user text-[13px]" aria-hidden="true" />
        </span>
        <span className="hidden max-w-[8rem] truncate sm:inline">{LOGGED_IN_USER.name}</span>
        <i
          className={`fa-solid fa-chevron-down text-[10px] text-slate-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="User account"
          data-testid="user-menu-dropdown"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[11rem] overflow-hidden rounded-lg border border-white/10 bg-slate-900 py-1 shadow-xl ring-1 ring-black/20"
        >
          <div className="border-b border-white/10 px-3 py-2.5">
            <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
              Signed in as
            </p>
            <p className="mt-0.5 truncate text-sm font-semibold text-white">
              {LOGGED_IN_USER.name}
            </p>
          </div>

          {MENU_ITEMS.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              data-testid={item.testId}
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
            >
              <i className={`${item.icon} w-4 text-slate-400`} aria-hidden="true" />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

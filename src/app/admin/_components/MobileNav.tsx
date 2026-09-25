"use client";

import { useEffect, useRef, useState } from "react";
import { ADMIN_SECTIONS, type SectionId } from "./sections";
import { useTabs } from "./tabs";

/** Seletor de aba em menu suspenso — usado em telas estreitas. */
export default function MobileNav() {
  const { active, select, dirty } = useTabs();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fecha ao clicar fora.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const go = (id: SectionId) => {
    setOpen(false);
    select(id);
  };

  const activeLabel =
    ADMIN_SECTIONS.find((s) => s.id === active)?.label ?? "Seções";

  return (
    <div className="admin-nav-mobile" ref={ref}>
      <button
        type="button"
        className="admin-nav-toggle"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="admin-nav-toggle-label">
          <span className="af-eyebrow">Seção</span>
          {activeLabel}
        </span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open ? (
        <ul className="admin-nav-menu">
          {ADMIN_SECTIONS.map((section) => (
            <li key={section.id}>
              <button
                type="button"
                className={active === section.id ? "active" : ""}
                onClick={() => go(section.id)}
              >
                {section.label}
                {dirty.has(section.id) ? (
                  <span className="admin-dirty" title="Alterações não salvas" aria-label="alterações não salvas" />
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

"use client";

import { ADMIN_SECTIONS } from "./sections";
import { useTabs } from "./tabs";

/** Abas do painel (telas largas): escolher uma troca a seção exibida. */
export default function Sidebar() {
  const { active, select, dirty } = useTabs();

  return (
    <aside className="admin-sidebar">
      <nav aria-label="Seções do painel">
        <span className="af-eyebrow">Seções</span>
        <ul>
          {ADMIN_SECTIONS.map((section) => (
            <li key={section.id}>
              <button
                type="button"
                className={active === section.id ? "active" : ""}
                aria-current={active === section.id ? "page" : undefined}
                onClick={() => select(section.id)}
              >
                {section.label}
                {dirty.has(section.id) ? (
                  <span className="admin-dirty" title="Alterações não salvas" aria-label="alterações não salvas" />
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

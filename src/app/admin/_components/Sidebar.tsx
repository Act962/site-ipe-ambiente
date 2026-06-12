"use client";

import { ADMIN_SECTIONS } from "./sections";
import { useActiveSection } from "./useActiveSection";

export default function Sidebar() {
  const active = useActiveSection();

  return (
    <aside className="admin-sidebar">
      <nav aria-label="Seções do painel">
        <span className="af-eyebrow">Seções</span>
        <ul>
          {ADMIN_SECTIONS.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={active === section.id ? "active" : ""}
                aria-current={active === section.id ? "true" : undefined}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

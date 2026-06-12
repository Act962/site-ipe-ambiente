"use client";

import { useEffect, useState } from "react";
import { ADMIN_SECTIONS } from "./sections";

/** Observa as seções e devolve o id da que está visível (scroll-spy). */
export function useActiveSection() {
  const [active, setActive] = useState<string>(ADMIN_SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 },
    );
    for (const section of ADMIN_SECTIONS) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return active;
}

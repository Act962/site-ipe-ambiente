"use client";

import { useEffect } from "react";

/**
 * Observa os elementos `.reveal` e adiciona a classe `.in` quando entram
 * na viewport, disparando a animação de entrada (definida em globals.css).
 * Componente sem marcação — apenas o efeito colateral no cliente.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".reveal:not(.in)");
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}

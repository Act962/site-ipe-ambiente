"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "@/styles/nav.css";

const NAV_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#atuacao", label: "Atuação" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#esg", label: "ESG" },
  { href: "#galeria", label: "Experiências" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <nav
      className={`nav${scrolled ? " scrolled" : ""}${open ? " open" : ""}`}
      id="nav"
    >
      <div className="wrap row">
        <a href="#top" className="brand" onClick={close}>
          <Image
            className="logo-img"
            src="/assets/logo-ipe.png"
            alt="IPÊ Educação Ambiental"
            width={500}
            height={500}
            priority
          />
        </a>

        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        <a href="#contato" className="nav-cta">
          Fale conosco
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>

        <button
          className="menu-btn"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      <div className="mobile-menu">
        <div className="wrap">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={close}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contato" className="menu-cta" onClick={close}>
                Fale conosco
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

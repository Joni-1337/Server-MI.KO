"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { SmoothScrollLink } from "@/components/ui/SmoothScrollLink";
const navLinks = [
  { href: "#cases", label: "Кейсы" },
  { href: "#stack", label: "Стек" },
  { href: "#about", label: "О себе" },
  { href: "#calculator", label: "Калькулятор" },
  { href: "#faq", label: "FAQ" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[#21262d] bg-[#0d1117]/95"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-12 lg:px-20">
        <SmoothScrollLink
          href="#hero"
          className="logo-glow font-mono text-base tracking-widest text-[#89c8ff] uppercase"
        >
          MI<span className="text-[#f2d27a]">.</span>KO
        </SmoothScrollLink>
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <SmoothScrollLink
                href={link.href}
                className="nav-link-glow font-mono text-sm tracking-wider text-[#8b949e] uppercase"
              >
                {link.label}
              </SmoothScrollLink>            </li>
          ))}
        </ul>

        <SmoothScrollLink
          href="#calculator"
          className="glow-btn-cyan hidden border border-[#89c8ff]/30 bg-[#89c8ff]/5 px-4 py-2 font-mono text-sm tracking-wider text-[#89c8ff] uppercase md:inline-block"
        >
          Связаться
        </SmoothScrollLink>
        <button
          type="button"
          className="text-[#89c8ff] md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-b border-[#21262d] bg-[#0d1117] md:hidden">
          <ul className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <SmoothScrollLink
                  href={link.href}
                  className="nav-link-glow font-mono text-base tracking-wider text-[#8b949e] uppercase"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </SmoothScrollLink>              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

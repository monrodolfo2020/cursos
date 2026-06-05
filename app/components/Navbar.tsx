"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [{ href: "/cursos", label: "Cursos" }];

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{ background: "var(--bg-sidebar)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center gap-4 px-4 h-14 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-base sm:text-lg tracking-tight shrink-0"
          onClick={() => setMenuOpen(false)}
        >
          <span
            className="w-7 h-7 rounded flex items-center justify-center text-xs font-black shrink-0"
            style={{ background: "var(--green)", color: "#000" }}
          >
            IA
          </span>
          <span className="hidden sm:block">Instrumex Academy</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-4 text-sm ml-2" style={{ color: "var(--text-secondary)" }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`hover:text-white transition-colors ${path === l.href ? "text-white font-medium" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <span
            className="hidden sm:block text-xs px-3 py-1 rounded-full font-medium"
            style={{ background: "var(--bg-card)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
          >
            MVP v0.1
          </span>

          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menú"
          >
            <span
              className="block h-0.5 w-5 rounded transition-all duration-200"
              style={{
                background: "var(--text)",
                transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
              }}
            />
            <span
              className="block h-0.5 w-5 rounded transition-all duration-200"
              style={{
                background: "var(--text)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-0.5 w-5 rounded transition-all duration-200"
              style={{
                background: "var(--text)",
                transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-4 py-3 flex flex-col gap-1"
          style={{ borderColor: "var(--border)", background: "var(--bg-sidebar)" }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="py-2.5 text-sm font-medium rounded-lg px-3 transition-colors"
              style={{
                color: path === l.href ? "var(--green)" : "var(--text)",
                background: path === l.href ? "rgba(0,209,102,0.08)" : "transparent",
              }}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div
            className="mt-2 text-xs px-3 py-1 rounded-full font-medium self-start"
            style={{ background: "var(--bg-card)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
          >
            MVP v0.1
          </div>
        </div>
      )}
    </nav>
  );
}

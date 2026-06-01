"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();
  const isLesson = path?.includes("/leccion/");

  return (
    <nav
      className="flex items-center gap-6 px-6 h-14 border-b sticky top-0 z-50"
      style={{ background: "var(--bg-sidebar)", borderColor: "var(--border)" }}
    >
      <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
        <span
          className="w-7 h-7 rounded flex items-center justify-center text-xs font-black"
          style={{ background: "var(--green)", color: "#000" }}
        >
          IA
        </span>
        <span className="hidden sm:block">Instrumex Academy</span>
      </Link>

      <div className="flex items-center gap-4 ml-2 text-sm" style={{ color: "var(--text-secondary)" }}>
        <Link href="/cursos" className={`hover:text-white transition-colors ${path === "/cursos" ? "text-white font-medium" : ""}`}>
          Cursos
        </Link>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <span
          className="text-xs px-3 py-1 rounded-full font-medium"
          style={{ background: "var(--bg-card)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
        >
          MVP v0.1
        </span>
      </div>
    </nav>
  );
}

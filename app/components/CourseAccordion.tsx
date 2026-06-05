"use client";
import Link from "next/link";
import { useState } from "react";

type Lesson = { id: number; order: number; title: string; durationSec: number; videoPath: string };

const MODULE_META: Record<string, { label: string; icon: string }> = {
  "modulo-0-bienvenida":      { label: "Módulo 0 — Bienvenida",              icon: "🎯" },
  "modulo-1-fundamentos":     { label: "Módulo 1 — Fundamentos",             icon: "⚡" },
  "modulo-2-instrumentacion": { label: "Módulo 2 — Instrumentación",         icon: "📐" },
  "modulo-3-sensores":        { label: "Módulo 3 — Sensores",                icon: "📡" },
  "modulo-4-actuadores":      { label: "Módulo 4 — Actuadores",              icon: "🔧" },
  "modulo-5-control":         { label: "Módulo 5 — Control de Proceso",      icon: "🎛️" },
  "modulo-6-plc":             { label: "Módulo 6 — PLCs Siemens",            icon: "🖥️" },
  "modulo-7":                 { label: "Módulo 7 — Redes Industriales",      icon: "🌐" },
  "modulo-8":                 { label: "Módulo 8 — SCADA e IIoT",            icon: "📊" },
  "modulo-9":                 { label: "Módulo 9 — Seguridad Industrial",    icon: "🦺" },
  "modulo-10":                { label: "Módulo 10 — Tecnologías Avanzadas",  icon: "🚀" },
  "modulo-11":                { label: "Módulo 11 — Proyecto Capstone",      icon: "🏆" },
};

function getModuleKey(videoPath: string): string {
  const match = videoPath.match(/\/(modulo-[\w-]+)\//);
  return match ? match[1] : "otros";
}

function fmtSec(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

type Group = { key: string; label: string; icon: string; lessons: Lesson[] };

function groupLessons(lessons: Lesson[]): Group[] {
  const orderArr: string[] = [];
  const map: Record<string, Lesson[]> = {};
  for (const l of lessons) {
    const key = getModuleKey(l.videoPath);
    if (!map[key]) { map[key] = []; orderArr.push(key); }
    map[key].push(l);
  }
  return orderArr.map((key) => ({
    key,
    label: MODULE_META[key]?.label ?? key,
    icon:  MODULE_META[key]?.icon  ?? "📁",
    lessons: map[key],
  }));
}

export default function CourseAccordion({ lessons, slug }: { lessons: Lesson[]; slug: string }) {
  const groups = groupLessons(lessons);
  // Open first module by default
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({ [groups[0]?.key]: true });

  function toggle(key: string) {
    setOpenMap((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="overflow-y-auto flex-1 divide-y" style={{ borderColor: "var(--border)" }}>
      {groups.map((group) => {
        const isOpen = !!openMap[group.key];
        return (
          <div key={group.key}>
            {/* Module header */}
            <button
              onClick={() => toggle(group.key)}
              className="w-full flex items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-white/5"
            >
              <span style={{ fontSize: 14, flexShrink: 0 }}>{group.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold leading-snug" style={{ color: "var(--text)" }}>
                  {group.label}
                </p>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                  {group.lessons.length} clases
                </p>
              </div>
              <span
                style={{
                  color: "var(--text-muted)", fontSize: 10, flexShrink: 0,
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s", display: "inline-block",
                }}
              >▼</span>
            </button>

            {/* Lesson list */}
            {isOpen && (
              <div className="border-t" style={{ borderColor: "var(--border)" }}>
                {group.lessons.map((l) => (
                  <Link
                    key={l.id}
                    href={`/cursos/${slug}/leccion/${l.id}`}
                    className="flex items-start gap-3 py-2.5 pr-4 transition-colors hover:bg-white/5"
                    style={{
                      paddingLeft: "2.5rem",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <span
                      style={{
                        width: 14, height: 14, borderRadius: "50%", flexShrink: 0,
                        marginTop: 2, display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: 8,
                        background: "rgba(0,209,102,0.15)",
                        color: "var(--green)",
                        border: "1px solid rgba(0,209,102,0.3)",
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontSize: 12, lineHeight: 1.35, color: "var(--text)",
                        display: "-webkit-box", WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical", overflow: "hidden",
                      }}>
                        {l.title}
                      </p>
                      <p style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>
                        ▶ {fmtSec(l.durationSec)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

type Lesson = {
  id: number;
  order: number;
  title: string;
  description: string;
  durationSec: number;
  videoPath: string;
};

type Props = {
  course: { slug: string; title: string };
  lesson: Lesson;
  lessons: Lesson[];
  prevLessonId: number | null;
  nextLessonId: number | null;
};

// ── Module metadata ────────────────────────────────────────────────────────────
const MODULE_META: Record<string, { label: string; icon: string }> = {
  "modulo-0-bienvenida":      { label: "Módulo 0 — Bienvenida",                      icon: "🎯" },
  "modulo-1-fundamentos":     { label: "Módulo 1 — Fundamentos",                     icon: "⚡" },
  "modulo-2-instrumentacion": { label: "Módulo 2 — Instrumentación",                 icon: "📐" },
  "modulo-3-sensores":        { label: "Módulo 3 — Sensores y Transmisores",         icon: "📡" },
  "modulo-4-actuadores":      { label: "Módulo 4 — Actuadores",                      icon: "🔧" },
  "modulo-5-control":         { label: "Módulo 5 — Control de Proceso",              icon: "🎛️" },
  "modulo-6-plc":             { label: "Módulo 6 — PLCs Siemens",                    icon: "🖥️" },
  "modulo-7":                 { label: "Módulo 7 — Redes Industriales",              icon: "🌐" },
  "modulo-8":                 { label: "Módulo 8 — SCADA e IIoT",                    icon: "📊" },
  "modulo-9":                 { label: "Módulo 9 — Seguridad Industrial",            icon: "🦺" },
  "modulo-10":                { label: "Módulo 10 — Tecnologías Avanzadas",          icon: "🚀" },
  "modulo-11":                { label: "Módulo 11 — Proyecto Capstone",              icon: "🏆" },
};

function getModuleKey(videoPath: string): string {
  // videoPath like "/videos/curso-automatizacion/modulo-6-plc/Clase..."
  const match = videoPath.match(/\/(modulo-[\w-]+)\//);
  return match ? match[1] : "otros";
}

function fmtSec(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

// ── Group lessons by module ────────────────────────────────────────────────────
type ModuleGroup = {
  key: string;
  label: string;
  icon: string;
  lessons: Lesson[];
};

function groupByModule(lessons: Lesson[]): ModuleGroup[] {
  const map = new Map<string, Lesson[]>();
  for (const l of lessons) {
    const key = getModuleKey(l.videoPath);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(l);
  }
  return [...map.entries()].map(([key, lsns]) => ({
    key,
    label: MODULE_META[key]?.label ?? key,
    icon: MODULE_META[key]?.icon ?? "📁",
    lessons: lsns,
  }));
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function LessonPlayer({ course, lesson, lessons, prevLessonId, nextLessonId }: Props) {
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const activeModuleKey = getModuleKey(lesson.videoPath);
  const [openModules, setOpenModules] = useState<Set<string>>(new Set([activeModuleKey]));

  const storageKey = `ia_progress_${course.slug}`;
  const groups = groupByModule(lessons);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setCompleted(new Set(JSON.parse(raw)));
    } catch {}
  }, [storageKey]);

  // Open the active module whenever the lesson changes
  useEffect(() => {
    setOpenModules((prev) => new Set([...prev, activeModuleKey]));
  }, [activeModuleKey]);

  // Disable looping in the iframe after it loads
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    function disableLoop() {
      try {
        const doc = iframe!.contentDocument;
        if (!doc) return;
        // Stop all <video> elements from looping
        doc.querySelectorAll("video").forEach((v) => {
          v.loop = false;
          v.controls = true;
        });
        // Post message to any React animation that listens
        iframe!.contentWindow?.postMessage({ type: "INSTRUMEX_PAUSE_LOOP" }, "*");
      } catch {
        // cross-origin — message only
        iframe!.contentWindow?.postMessage({ type: "INSTRUMEX_PAUSE_LOOP" }, "*");
      }
    }

    iframe.addEventListener("load", disableLoop);
    return () => iframe.removeEventListener("load", disableLoop);
  }, [lesson.id]);

  function toggleComplete(id: number) {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem(storageKey, JSON.stringify([...next]));
      return next;
    });
  }

  function toggleModule(key: string) {
    setOpenModules((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const progress = Math.round((completed.size / lessons.length) * 100);

  return (
    <div className="flex flex-1 h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* ── Main content ─────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Breadcrumb */}
        <div
          className="flex items-center gap-2 text-xs px-4 py-2 border-b"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
        >
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <span>/</span>
          <Link href={`/cursos/${course.slug}`} className="hover:text-white transition-colors">{course.title}</Link>
          <span>/</span>
          <span className="text-white">{lesson.title}</span>
        </div>

        {/* Video iframe */}
        <div className="relative bg-black" style={{ paddingBottom: "56.25%" }}>
          <iframe
            ref={iframeRef}
            key={lesson.id}
            src={lesson.videoPath}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            title={lesson.title}
            sandbox="allow-scripts allow-same-origin"
          />
        </div>

        {/* Lesson info */}
        <div className="px-6 py-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: "var(--text-muted)" }}>
                Lección {lesson.order} de {lessons.length}
              </p>
              <h1 className="text-xl font-bold mb-2">{lesson.title}</h1>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {lesson.description}
              </p>
            </div>
            <button
              onClick={() => toggleComplete(lesson.id)}
              className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: completed.has(lesson.id) ? "rgba(0,209,102,0.2)" : "var(--bg-card)",
                color: completed.has(lesson.id) ? "var(--green)" : "var(--text-secondary)",
                border: `1px solid ${completed.has(lesson.id) ? "var(--green)" : "var(--border)"}`,
              }}
            >
              {completed.has(lesson.id) ? "✓ Completado" : "Marcar completado"}
            </button>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3 mt-6">
            {prevLessonId ? (
              <Link
                href={`/cursos/${course.slug}/leccion/${prevLessonId}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
              >
                ← Anterior
              </Link>
            ) : (
              <span />
            )}
            {nextLessonId ? (
              <Link
                href={`/cursos/${course.slug}/leccion/${nextLessonId}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                style={{ background: "var(--green)", color: "#000" }}
              >
                Siguiente lección →
              </Link>
            ) : (
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                style={{ background: "rgba(0,209,102,0.15)", color: "var(--green)" }}
              >
                🎉 ¡Curso completado!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Sidebar ──────────────────────────────────────────────────────────── */}
      <aside
        className={`shrink-0 flex flex-col border-l overflow-hidden transition-all duration-300 ${sidebarOpen ? "w-80" : "w-0"}`}
        style={{ borderColor: "var(--border)", background: "var(--bg-sidebar)" }}
      >
        {sidebarOpen && (
          <>
            {/* Sidebar header */}
            <div className="px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
                  Contenido del curso
                </p>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-xs hover:text-white transition-colors"
                  style={{ color: "var(--text-muted)" }}
                >
                  ✕
                </button>
              </div>
              {/* Progress bar */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${progress}%`, background: "var(--green)" }}
                  />
                </div>
                <span className="text-xs font-medium" style={{ color: "var(--green)" }}>
                  {progress}%
                </span>
              </div>
            </div>

            {/* Accordion module list */}
            <div className="overflow-y-auto flex-1">
              {groups.map((group) => {
                const isOpen = openModules.has(group.key);
                const isActiveModule = group.key === activeModuleKey;
                const groupDone = group.lessons.filter((l) => completed.has(l.id)).length;
                const groupTotal = group.lessons.length;

                return (
                  <div key={group.key} style={{ borderBottom: "1px solid var(--border)" }}>
                    {/* Module header (accordion trigger) */}
                    <button
                      onClick={() => toggleModule(group.key)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/5"
                      style={{
                        background: isActiveModule ? "rgba(0,209,102,0.05)" : "transparent",
                      }}
                    >
                      <span className="text-base leading-none">{group.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-xs font-semibold leading-tight"
                          style={{ color: isActiveModule ? "var(--green)" : "var(--text)" }}
                        >
                          {group.label}
                        </p>
                        <p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                          {groupDone}/{groupTotal} clases
                        </p>
                      </div>
                      <span
                        className="text-[10px] transition-transform duration-200"
                        style={{
                          color: "var(--text-muted)",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          display: "inline-block",
                        }}
                      >
                        ▼
                      </span>
                    </button>

                    {/* Lesson list (collapsible) */}
                    {isOpen && (
                      <ul>
                        {group.lessons.map((l) => {
                          const isActive = l.id === lesson.id;
                          const isDone = completed.has(l.id);
                          return (
                            <li key={l.id} style={{ borderTop: "1px solid var(--border)" }}>
                              <Link
                                href={`/cursos/${course.slug}/leccion/${l.id}`}
                                className="flex items-start gap-3 pl-10 pr-4 py-2.5 transition-colors hover:bg-white/5"
                                style={{
                                  background: isActive ? "rgba(0,209,102,0.08)" : "transparent",
                                  borderLeft: isActive ? "2px solid var(--green)" : "2px solid transparent",
                                }}
                              >
                                <span
                                  className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5"
                                  style={{
                                    background: isDone
                                      ? "var(--green)"
                                      : isActive
                                      ? "rgba(0,209,102,0.3)"
                                      : "var(--bg-card)",
                                    color: isDone ? "#000" : isActive ? "var(--green)" : "var(--text-muted)",
                                    border: isDone || isActive ? "none" : "1px solid var(--border)",
                                  }}
                                >
                                  {isDone ? "✓" : ""}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <p
                                    className="text-xs font-medium leading-tight line-clamp-2"
                                    style={{
                                      color: isActive
                                        ? "var(--green)"
                                        : isDone
                                        ? "var(--text-secondary)"
                                        : "var(--text)",
                                    }}
                                  >
                                    {l.title}
                                  </p>
                                  <p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                                    ▶ {fmtSec(l.durationSec)}
                                  </p>
                                </div>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </aside>

      {/* Toggle sidebar button (when closed) */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 px-1.5 py-4 rounded-l-lg text-xs font-medium z-10"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
          title="Abrir contenido"
        >
          ☰
        </button>
      )}
    </div>
  );
}

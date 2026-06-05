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

// ── Module metadata ─────────────────────────────────────────────────────────
const MODULE_META: Record<string, { label: string; icon: string }> = {
  "modulo-0-bienvenida":      { label: "Módulo 0 — Bienvenida",                 icon: "🎯" },
  "modulo-1-fundamentos":     { label: "Módulo 1 — Fundamentos",                icon: "⚡" },
  "modulo-2-instrumentacion": { label: "Módulo 2 — Instrumentación",            icon: "📐" },
  "modulo-3-sensores":        { label: "Módulo 3 — Sensores",                   icon: "📡" },
  "modulo-4-actuadores":      { label: "Módulo 4 — Actuadores",                 icon: "🔧" },
  "modulo-5-control":         { label: "Módulo 5 — Control de Proceso",         icon: "🎛️" },
  "modulo-6-plc":             { label: "Módulo 6 — PLCs Siemens",               icon: "🖥️" },
  "modulo-7":                 { label: "Módulo 7 — Redes Industriales",         icon: "🌐" },
  "modulo-8":                 { label: "Módulo 8 — SCADA e IIoT",               icon: "📊" },
  "modulo-9":                 { label: "Módulo 9 — Seguridad Industrial",       icon: "🦺" },
  "modulo-10":                { label: "Módulo 10 — Tecnologías Avanzadas",     icon: "🚀" },
  "modulo-11":                { label: "Módulo 11 — Proyecto Capstone",         icon: "🏆" },
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

type ModuleGroup = { key: string; label: string; icon: string; lessons: Lesson[] };

function groupByModule(lessons: Lesson[]): ModuleGroup[] {
  const order: string[] = [];
  const map: Record<string, Lesson[]> = {};
  for (const l of lessons) {
    const key = getModuleKey(l.videoPath);
    if (!map[key]) { map[key] = []; order.push(key); }
    map[key].push(l);
  }
  return order.map((key) => ({
    key,
    label: MODULE_META[key]?.label ?? key,
    icon:  MODULE_META[key]?.icon  ?? "📁",
    lessons: map[key],
  }));
}

// ── Component ───────────────────────────────────────────────────────────────
export default function LessonPlayer({
  course, lesson, lessons, prevLessonId, nextLessonId,
}: Props) {
  const [completed, setCompleted]     = useState<Record<number, boolean>>({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openMap, setOpenMap]         = useState<Record<string, boolean>>({});
  const iframeRef                     = useRef<HTMLIFrameElement>(null);

  const storageKey     = `ia_progress_${course.slug}`;
  const activeModuleKey = getModuleKey(lesson.videoPath);
  const groups          = groupByModule(lessons);

  // Load saved progress
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const ids: number[] = JSON.parse(raw);
        const rec: Record<number, boolean> = {};
        ids.forEach((id) => (rec[id] = true));
        setCompleted(rec);
      }
    } catch {}
  }, [storageKey]);

  // Open the active module whenever the lesson changes
  useEffect(() => {
    setOpenMap((prev) => ({ ...prev, [activeModuleKey]: true }));
  }, [activeModuleKey]);

  // Disable loop/autoplay in iframe after load
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const onLoad = () => {
      try {
        iframe.contentDocument?.querySelectorAll("video").forEach((v) => {
          v.loop = false; v.controls = true;
        });
      } catch {}
      iframe.contentWindow?.postMessage({ type: "INSTRUMEX_PAUSE_LOOP" }, "*");
    };
    iframe.addEventListener("load", onLoad);
    return () => iframe.removeEventListener("load", onLoad);
  }, [lesson.id]);

  function toggleComplete(id: number) {
    setCompleted((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (!next[id]) delete next[id];
      localStorage.setItem(storageKey, JSON.stringify(Object.keys(next).map(Number)));
      return next;
    });
  }

  function toggleModule(key: string) {
    setOpenMap((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const completedCount = Object.keys(completed).length;
  const progress = Math.round((completedCount / lessons.length) * 100);

  return (
    <div className="flex flex-1 h-[calc(100vh-3.5rem)] overflow-hidden">

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-auto">

        {/* Breadcrumb */}
        <div
          className="flex items-center gap-2 text-xs px-4 py-2 border-b"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
        >
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <span>/</span>
          <Link href={`/cursos/${course.slug}`} className="hover:text-white transition-colors">
            {course.title}
          </Link>
          <span>/</span>
          <span className="text-white">{lesson.title}</span>
        </div>

        {/* Video */}
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
              <p className="text-xs font-medium uppercase tracking-wide mb-1"
                 style={{ color: "var(--text-muted)" }}>
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
                background: completed[lesson.id] ? "rgba(0,209,102,0.2)" : "var(--bg-card)",
                color:      completed[lesson.id] ? "var(--green)" : "var(--text-secondary)",
                border: `1px solid ${completed[lesson.id] ? "var(--green)" : "var(--border)"}`,
              }}
            >
              {completed[lesson.id] ? "✓ Completado" : "Marcar completado"}
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
            ) : <span />}
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

      {/* ── Sidebar ────────────────────────────────────────────────────────── */}
      <aside
        className={`shrink-0 flex flex-col border-l overflow-hidden transition-all duration-300 ${
          sidebarOpen ? "w-80" : "w-0"
        }`}
        style={{ borderColor: "var(--border)", background: "var(--bg-sidebar)" }}
      >
        {sidebarOpen && (
          <>
            {/* Sidebar header */}
            <div className="px-4 py-3 border-b flex-shrink-0" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold uppercase tracking-wide"
                   style={{ color: "var(--text-muted)" }}>
                  Contenido del curso
                </p>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-xs hover:text-white transition-colors"
                  style={{ color: "var(--text-muted)" }}
                >✕</button>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full overflow-hidden"
                     style={{ background: "var(--border)" }}>
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

            {/* Accordion */}
            <div className="overflow-y-auto flex-1">
              {groups.map((group) => {
                const isOpen        = !!openMap[group.key];
                const isActiveMod   = group.key === activeModuleKey;
                const doneCnt       = group.lessons.filter((l) => !!completed[l.id]).length;

                return (
                  <div key={group.key}>

                    {/* ── Module header ── */}
                    <button
                      onClick={() => toggleModule(group.key)}
                      className="w-full flex items-center gap-2 px-4 py-3 text-left transition-colors"
                      style={{
                        background:   isActiveMod ? "rgba(0,209,102,0.07)" : "transparent",
                        borderBottom: "1px solid var(--border)",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = isActiveMod
                          ? "rgba(0,209,102,0.12)"
                          : "rgba(255,255,255,0.04)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = isActiveMod
                          ? "rgba(0,209,102,0.07)"
                          : "transparent")
                      }
                    >
                      <span style={{ fontSize: 15 }}>{group.icon}</span>

                      <div className="flex-1 min-w-0 text-left">
                        <p
                          className="text-xs font-semibold leading-snug"
                          style={{ color: isActiveMod ? "var(--green)" : "var(--text)" }}
                        >
                          {group.label}
                        </p>
                        <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                          {doneCnt}/{group.lessons.length} clases
                        </p>
                      </div>

                      <span
                        style={{
                          color:     "var(--text-muted)",
                          fontSize:  10,
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.2s",
                          display:   "inline-block",
                          flexShrink: 0,
                        }}
                      >▼</span>
                    </button>

                    {/* ── Lesson list (only when open) ── */}
                    {isOpen && (
                      <div>
                        {group.lessons.map((l) => {
                          const isActive = l.id === lesson.id;
                          const isDone   = !!completed[l.id];

                          return (
                            <Link
                              key={l.id}
                              href={`/cursos/${course.slug}/leccion/${l.id}`}
                              className="flex items-start gap-3 py-2.5 pr-4 transition-colors"
                              style={{
                                paddingLeft:  "2.5rem",
                                background:   isActive ? "rgba(0,209,102,0.09)" : "transparent",
                                borderLeft:   isActive ? "3px solid var(--green)" : "3px solid transparent",
                                borderBottom: "1px solid var(--border)",
                                display:      "flex",
                              }}
                            >
                              {/* Status dot */}
                              <span
                                style={{
                                  width:        14,
                                  height:       14,
                                  borderRadius: "50%",
                                  flexShrink:   0,
                                  marginTop:    2,
                                  display:      "flex",
                                  alignItems:   "center",
                                  justifyContent: "center",
                                  fontSize:     8,
                                  fontWeight:   700,
                                  background:   isDone
                                    ? "var(--green)"
                                    : isActive
                                    ? "rgba(0,209,102,0.3)"
                                    : "var(--bg-card)",
                                  color:        isDone ? "#000" : "var(--green)",
                                  border:       isDone || isActive
                                    ? "none"
                                    : "1px solid var(--border)",
                                }}
                              >
                                {isDone ? "✓" : ""}
                              </span>

                              <div style={{ flex: 1, minWidth: 0 }}>
                                <p
                                  style={{
                                    fontSize:    12,
                                    fontWeight:  isActive ? 600 : 400,
                                    lineHeight:  1.35,
                                    color:       isActive
                                      ? "var(--green)"
                                      : isDone
                                      ? "var(--text-secondary)"
                                      : "var(--text)",
                                    display:     "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow:    "hidden",
                                  }}
                                >
                                  {l.title}
                                </p>
                                <p style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>
                                  ▶ {fmtSec(l.durationSec)}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </aside>

      {/* Sidebar toggle (when closed) */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 px-1.5 py-4 rounded-l-lg text-xs font-medium z-10"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
          title="Abrir contenido"
        >☰</button>
      )}
    </div>
  );
}

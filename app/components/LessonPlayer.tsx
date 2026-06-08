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

// ── Component ────────────────────────────────────────────────────────────────
export default function LessonPlayer({
  course, lesson, lessons, prevLessonId, nextLessonId,
}: Props) {
  const [completed,       setCompleted]      = useState<Record<number, boolean>>({});
  const [sidebarOpen,     setSidebarOpen]    = useState(false);
  const [openMap,         setOpenMap]        = useState<Record<string, boolean>>({});
  const [videoExpanded,   setVideoExpanded]  = useState(false);
  const [mobileLandscape, setMobileLandscape] = useState(false);
  const [containerWidth,  setContainerWidth] = useState(0);
  const [winSize,         setWinSize]        = useState({ w: 0, h: 0 });
  const iframeRef    = useRef<HTMLIFrameElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);

  const storageKey      = `ia_progress_${course.slug}`;
  const activeModuleKey = getModuleKey(lesson.videoPath);
  const groups          = groupByModule(lessons);

  // On desktop, default sidebar to open
  useEffect(() => {
    if (window.innerWidth >= 768) setSidebarOpen(true);
  }, []);

  // Track video container width for CSS-scale trick (keeps iframe at 1280px
  // internally so Stage renders at full resolution; CSS shrinks the output)
  useEffect(() => {
    const el = videoWrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Track window size (used for expanded scale calculation)
  useEffect(() => {
    function updateWin() {
      setWinSize({ w: window.innerWidth, h: window.innerHeight });
    }
    updateWin();
    window.addEventListener("resize", updateWin);
    window.addEventListener("orientationchange", updateWin);
    return () => {
      window.removeEventListener("resize", updateWin);
      window.removeEventListener("orientationchange", updateWin);
    };
  }, []);

  // Detect mobile landscape orientation
  useEffect(() => {
    function check() {
      const landscape = window.innerWidth > window.innerHeight;
      const mobileH   = window.innerHeight < 500; // phone in landscape
      setMobileLandscape(landscape && mobileH);
    }
    check();
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);

  // Auto-close sidebar when entering landscape on mobile
  useEffect(() => {
    if (mobileLandscape) setSidebarOpen(false);
  }, [mobileLandscape]);

  // ESC key to exit expanded mode
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setVideoExpanded(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const showExpanded = videoExpanded || mobileLandscape;

  // CSS-scale values: iframe always renders at 1280×720 internally;
  // we scale it down via transform so Stage sees full resolution (scale≈1)
  // and text stays crisp at any viewport size.
  const DESIGN_W = 1280;
  const DESIGN_H = 720;
  const iframeScale  = containerWidth > 0 ? containerWidth / DESIGN_W : 1;
  const scaledHeight = Math.round(DESIGN_H * iframeScale);

  // Scale for expanded/fullscreen mode: fit 1280×720 inside the viewport
  // keeping aspect ratio (letterbox), so the iframe content stays readable
  // on any screen size or orientation.
  const expandScaleW = winSize.w > 0 ? winSize.w / DESIGN_W : 1;
  const expandScaleH = winSize.h > 0 ? winSize.h / DESIGN_H : 1;
  const expandScale  = Math.min(expandScaleW, expandScaleH);

  // Lock body scroll when video is expanded
  useEffect(() => {
    if (showExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showExpanded]);

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

  // Open active module whenever lesson changes
  useEffect(() => {
    setOpenMap((prev) => ({ ...prev, [activeModuleKey]: true }));
  }, [activeModuleKey]);

  // Close sidebar on mobile when navigating to a lesson
  function handleLessonClick() {
    if (window.innerWidth < 768) setSidebarOpen(false);
  }

  // Disable loop/autoplay in iframe
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

  const progress = Math.round((Object.keys(completed).length / lessons.length) * 100);

  // ── Sidebar content (shared between desktop inline & mobile drawer) ───────
  const SidebarContent = (
    <>
      {/* Header */}
      <div className="px-4 py-3 border-b flex-shrink-0 flex flex-col gap-2"
           style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide"
             style={{ color: "var(--text-muted)" }}>
            Contenido del curso
          </p>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-sm hover:text-white transition-colors p-1"
            style={{ color: "var(--text-muted)" }}
            aria-label="Cerrar"
          >✕</button>
        </div>
        {/* Progress */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: "var(--green)" }}
            />
          </div>
          <span className="text-xs font-medium" style={{ color: "var(--green)" }}>{progress}%</span>
        </div>
      </div>

      {/* Accordion */}
      <div className="overflow-y-auto flex-1">
        {groups.map((group) => {
          const isOpen      = !!openMap[group.key];
          const isActiveMod = group.key === activeModuleKey;
          const doneCnt     = group.lessons.filter((l) => !!completed[l.id]).length;

          return (
            <div key={group.key}>
              {/* Module header */}
              <button
                onClick={() => toggleModule(group.key)}
                className="w-full flex items-center gap-2 px-4 py-3 text-left transition-colors"
                style={{
                  background:   isActiveMod ? "rgba(0,209,102,0.07)" : "transparent",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span style={{ fontSize: 15, flexShrink: 0 }}>{group.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold leading-snug"
                     style={{ color: isActiveMod ? "var(--green)" : "var(--text)" }}>
                    {group.label}
                  </p>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                    {doneCnt}/{group.lessons.length} clases
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
                <div>
                  {group.lessons.map((l) => {
                    const isActive = l.id === lesson.id;
                    const isDone   = !!completed[l.id];
                    return (
                      <Link
                        key={l.id}
                        href={`/cursos/${course.slug}/leccion/${l.id}`}
                        onClick={handleLessonClick}
                        className="flex items-start gap-3 py-2.5 pr-4 transition-colors"
                        style={{
                          paddingLeft:  "2.5rem",
                          background:   isActive ? "rgba(0,209,102,0.09)" : "transparent",
                          borderLeft:   isActive ? "3px solid var(--green)" : "3px solid transparent",
                          borderBottom: "1px solid var(--border)",
                          display:      "flex",
                        }}
                      >
                        <span
                          style={{
                            width: 14, height: 14, borderRadius: "50%", flexShrink: 0,
                            marginTop: 2, display: "flex", alignItems: "center",
                            justifyContent: "center", fontSize: 8, fontWeight: 700,
                            background: isDone ? "var(--green)" : isActive ? "rgba(0,209,102,0.3)" : "var(--bg-card)",
                            color: isDone ? "#000" : "var(--green)",
                            border: isDone || isActive ? "none" : "1px solid var(--border)",
                          }}
                        >{isDone ? "✓" : ""}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{
                            fontSize: 12, fontWeight: isActive ? 600 : 400, lineHeight: 1.35,
                            color: isActive ? "var(--green)" : isDone ? "var(--text-secondary)" : "var(--text)",
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
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );

  return (
    <div className="flex flex-col flex-1 md:flex-row md:h-[calc(100vh-3.5rem)] md:overflow-hidden">

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col md:overflow-auto">

        {/* Top bar: breadcrumb + sidebar toggle */}
        <div
          className="flex items-center gap-2 text-xs px-3 sm:px-4 py-2 border-b"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
        >
          <Link href="/" className="hover:text-white transition-colors hidden sm:inline">Inicio</Link>
          <span className="hidden sm:inline">/</span>
          <Link href={`/cursos/${course.slug}`} className="hover:text-white transition-colors truncate max-w-[120px] sm:max-w-none">
            {course.title}
          </Link>
          <span>/</span>
          <span className="text-white truncate max-w-[140px] sm:max-w-xs">{lesson.title}</span>

          {/* Sidebar toggle — always visible */}
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="ml-auto flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors shrink-0"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
          >
            <span>☰</span>
            <span className="hidden sm:inline">Temario</span>
          </button>
        </div>

        {/* Video */}
        <div
          ref={videoWrapRef}
          className={showExpanded ? "fixed inset-0 z-[200] bg-black" : "relative bg-black w-full overflow-hidden"}
          style={showExpanded ? {} : { height: containerWidth > 0 ? scaledHeight : undefined, paddingBottom: containerWidth > 0 ? 0 : "56.25%" }}
        >
          <iframe
            ref={iframeRef}
            key={lesson.id}
            src={lesson.videoPath}
            allowFullScreen
            title={lesson.title}
            sandbox="allow-scripts allow-same-origin"
            className="border-0"
            style={showExpanded
              /* expanded: render at 1280×720, scale to fit viewport (letterbox),
                 centered so content is always fully visible regardless of orientation */
              ? { position: "absolute",
                  width:  `${DESIGN_W}px`,
                  height: `${DESIGN_H}px`,
                  top:    "50%",
                  left:   "50%",
                  transform: `translate(-50%, -50%) scale(${expandScale})`,
                  transformOrigin: "center center" }
              /* normal: render at full design resolution, CSS-scale to fit */
              : containerWidth > 0
                ? { position: "absolute", top: 0, left: 0,
                    width: `${DESIGN_W}px`, height: `${DESIGN_H}px`,
                    transform: `scale(${iframeScale})`,
                    transformOrigin: "top left" }
                /* SSR / before measurement: fallback to % layout */
                : { position: "absolute", inset: 0, width: "100%", height: "100%" }
            }
          />

          {/* Expand button — visible on mobile/tablet when not expanded */}
          {!showExpanded && (
            <button
              onClick={() => setVideoExpanded(true)}
              title="Ver en pantalla completa"
              className="absolute bottom-2 right-2 md:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-opacity opacity-70 hover:opacity-100"
              style={{ background: "rgba(0,0,0,0.7)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", zIndex: 10 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 3 21 3 21 9"/>
                <polyline points="9 21 3 21 3 15"/>
                <line x1="21" y1="3" x2="14" y2="10"/>
                <line x1="3" y1="21" x2="10" y2="14"/>
              </svg>
              Expandir
            </button>
          )}

          {/* Exit expanded mode button */}
          {showExpanded && (
            <button
              onClick={() => { setVideoExpanded(false); }}
              title="Salir de pantalla completa (ESC)"
              className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-opacity opacity-80 hover:opacity-100"
              style={{ background: "rgba(0,0,0,0.75)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", zIndex: 201 }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="4 14 10 14 10 20"/>
                <polyline points="20 10 14 10 14 4"/>
                <line x1="10" y1="14" x2="3" y2="21"/>
                <line x1="21" y1="3" x2="14" y2="10"/>
              </svg>
              Salir · ESC
            </button>
          )}

          {/* Landscape hint — shows briefly when auto-expanded */}
          {mobileLandscape && !videoExpanded && (
            <div
              className="absolute bottom-3 left-3 text-[10px] px-2 py-1 rounded"
              style={{ background: "rgba(0,0,0,0.6)", color: "rgba(255,255,255,0.7)" }}
            >
              Gira el teléfono para volver
            </div>
          )}
        </div>

        {/* Lesson info */}
        <div className="px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wide mb-1"
                 style={{ color: "var(--text-muted)" }}>
                Lección {lesson.order} de {lessons.length}
              </p>
              <h1 className="text-lg sm:text-xl font-bold mb-2">{lesson.title}</h1>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {lesson.description}
              </p>
            </div>
            <button
              onClick={() => toggleComplete(lesson.id)}
              className="shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: completed[lesson.id] ? "rgba(0,209,102,0.2)" : "var(--bg-card)",
                color:      completed[lesson.id] ? "var(--green)" : "var(--text-secondary)",
                border: `1px solid ${completed[lesson.id] ? "var(--green)" : "var(--border)"}`,
                whiteSpace: "nowrap",
              }}
            >
              {completed[lesson.id] ? "✓ Completado" : "Completado"}
            </button>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3 mt-5 flex-wrap">
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
                Siguiente →
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

      {/* ── Desktop sidebar (inline, w-80) ─────────────────────────────── */}
      <aside
        className={`
          hidden md:flex flex-col border-l overflow-hidden transition-all duration-300
          ${sidebarOpen ? "md:w-80" : "md:w-0"}
        `}
        style={{ borderColor: "var(--border)", background: "var(--bg-sidebar)" }}
      >
        {sidebarOpen && SidebarContent}
      </aside>

      {/* ── Mobile sidebar (full-screen overlay drawer) ─────────────────── */}
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer */}
          <div
            className="md:hidden fixed top-0 right-0 bottom-0 z-50 flex flex-col w-[85vw] max-w-sm"
            style={{ background: "var(--bg-sidebar)", borderLeft: "1px solid var(--border)" }}
          >
            {/* Drawer handle / top bar */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <span className="text-sm font-semibold">Temario del curso</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-xl leading-none p-1 hover:text-white transition-colors"
                style={{ color: "var(--text-muted)" }}
              >✕</button>
            </div>
            <div className="flex flex-col flex-1 overflow-hidden">
              {SidebarContent}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

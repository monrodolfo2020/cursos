"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

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

function fmtSec(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function LessonPlayer({ course, lesson, lessons, prevLessonId, nextLessonId }: Props) {
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const storageKey = `ia_progress_${course.slug}`;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setCompleted(new Set(JSON.parse(raw)));
    } catch {}
  }, [storageKey]);

  function toggleComplete(id: number) {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem(storageKey, JSON.stringify([...next]));
      return next;
    });
  }

  const progress = Math.round((completed.size / lessons.length) * 100);

  return (
    <div className="flex flex-1 h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* Main content */}
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

      {/* Sidebar */}
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
                <span className="text-xs font-medium" style={{ color: "var(--green)" }}>{progress}%</span>
              </div>
            </div>

            {/* Lesson list */}
            <ul className="overflow-y-auto flex-1">
              {lessons.map((l) => {
                const isActive = l.id === lesson.id;
                const isDone = completed.has(l.id);
                return (
                  <li key={l.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <Link
                      href={`/cursos/${course.slug}/leccion/${l.id}`}
                      className="flex items-start gap-3 px-4 py-3 transition-colors"
                      style={{
                        background: isActive ? "rgba(0,209,102,0.08)" : "transparent",
                        borderLeft: isActive ? "2px solid var(--green)" : "2px solid transparent",
                      }}
                    >
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                        style={{
                          background: isDone
                            ? "var(--green)"
                            : isActive
                            ? "rgba(0,209,102,0.3)"
                            : "var(--bg-card)",
                          color: isDone ? "#000" : isActive ? "var(--green)" : "var(--text-muted)",
                        }}
                      >
                        {isDone ? "✓" : l.order}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-xs font-medium leading-tight line-clamp-2"
                          style={{ color: isActive ? "var(--green)" : isDone ? "var(--text-secondary)" : "var(--text)" }}
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

import Link from "next/link";
import { prisma } from "../lib/prisma";
import CourseCard from "./components/CourseCard";

export default async function HomePage() {
  const courses = await prisma.course.findMany({ orderBy: { createdAt: "asc" } });
  const totalLessons = courses.reduce((a, c) => a + c.lessonCount, 0);
  const totalHours   = Math.round(courses.reduce((a, c) => a + c.totalMinutes, 0) / 60);

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-4 sm:px-6 py-16 sm:py-24 text-center"
        style={{
          background: "linear-gradient(135deg, #0d0d0d 0%, #0a1a12 50%, #121212 100%)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 50%, var(--green) 0%, transparent 60%), radial-gradient(circle at 80% 20%, #00a84e 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5"
            style={{ background: "rgba(0,209,102,0.15)", color: "var(--green)", border: "1px solid rgba(0,209,102,0.3)" }}
          >
            Plataforma Educativa Industrial
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            Aprende <span style={{ color: "var(--green)" }}>Instrumentación</span>
            <br className="hidden sm:block" /> e Industria 4.0
          </h1>
          <p className="text-base sm:text-lg mb-8 max-w-xl mx-auto px-2" style={{ color: "var(--text-secondary)" }}>
            Cursos de automatización industrial, sensores y sistemas de control para ingenieros y técnicos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/cursos"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:scale-105 active:scale-95"
              style={{ background: "var(--green)", color: "#000" }}
            >
              Ver todos los cursos →
            </Link>
            <Link
              href={`/cursos/${courses[0]?.slug}/leccion/${1}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
              style={{ background: "var(--bg-card)", color: "var(--text)", border: "1px solid var(--border)" }}
            >
              ▶ Empezar gratis
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-6 sm:py-8 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { n: courses.length,  label: "Cursos",    icon: "📚" },
            { n: totalLessons,    label: "Lecciones",  icon: "🎬" },
            { n: `${totalHours}h`, label: "Contenido", icon: "⏱" },
            { n: "100%",          label: "Gratis",     icon: "🎁" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 py-2">
              <span className="text-xl">{s.icon}</span>
              <div className="text-2xl font-bold" style={{ color: "var(--green)" }}>{s.n}</div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Courses ───────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-10 sm:py-12 max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold">Cursos disponibles</h2>
          <Link
            href="/cursos"
            className="text-sm transition-colors hover:text-white"
            style={{ color: "var(--green)" }}
          >
            Ver todos →
          </Link>
        </div>
        {courses.length === 0 ? (
          <p style={{ color: "var(--text-muted)" }}>No hay cursos aún.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {courses.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        )}
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer
        className="border-t px-4 sm:px-6 py-8 text-center text-xs"
        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
      >
        <p>© 2025 Instrumex Academy · Plataforma educativa de instrumentación y automatización industrial</p>
      </footer>
    </div>
  );
}

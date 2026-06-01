import Link from "next/link";
import { prisma } from "../lib/prisma";
import CourseCard from "./components/CourseCard";

export default async function HomePage() {
  const courses = await prisma.course.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden px-6 py-20 text-center"
        style={{
          background: "linear-gradient(135deg, #0d0d0d 0%, #0a1a12 50%, #121212 100%)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, var(--green) 0%, transparent 60%), radial-gradient(circle at 80% 20%, #00a84e 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ background: "rgba(0,209,102,0.15)", color: "var(--green)", border: "1px solid rgba(0,209,102,0.3)" }}
          >
            Plataforma Educativa Industrial
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
            Aprende <span style={{ color: "var(--green)" }}>Instrumentación</span>
            <br />e Industria 4.0
          </h1>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Cursos de automatización industrial, sensores y sistemas de control para ingenieros y técnicos.
          </p>
          <Link
            href="/cursos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:scale-105"
            style={{ background: "var(--green)", color: "#000" }}
          >
            Ver todos los cursos →
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-8 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { n: courses.length, label: "Cursos" },
            { n: courses.reduce((a, c) => a + c.lessonCount, 0), label: "Lecciones" },
            { n: "100%", label: "Gratis" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold" style={{ color: "var(--green)" }}>
                {s.n}
              </div>
              <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section className="px-6 py-12 max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Cursos disponibles</h2>
          <Link href="/cursos" className="text-sm transition-colors hover:text-white" style={{ color: "var(--green)" }}>
            Ver todos →
          </Link>
        </div>
        {courses.length === 0 ? (
          <p style={{ color: "var(--text-muted)" }}>No hay cursos aún. Ejecuta el seed.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

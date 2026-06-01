import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = await prisma.course.findUnique({ where: { slug } });
  if (!course) return {};
  return { title: `${course.title} — Instrumex Academy` };
}

function fmtSec(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug },
    include: { lessons: { orderBy: { order: "asc" } } },
  });
  if (!course) notFound();

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "var(--text-muted)" }}>
        <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/cursos" className="hover:text-white transition-colors">Cursos</Link>
        <span>/</span>
        <span className="text-white">{course.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Course info */}
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(0,209,102,0.15)", color: "var(--green)" }}
            >
              {course.level}
            </span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>{course.category}</span>
          </div>

          <h1 className="text-3xl font-bold mb-3">{course.title}</h1>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
            {course.description}
          </p>

          <div className="flex flex-wrap gap-6 mb-8 text-sm" style={{ color: "var(--text-muted)" }}>
            <span>👨‍🏫 {course.instructor}</span>
            <span>📚 {course.lessonCount} lecciones</span>
            <span>⏱ {course.totalMinutes} min de contenido</span>
          </div>

          {/* What you'll learn */}
          <div
            className="rounded-xl p-5 mb-8"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <h2 className="font-semibold mb-4 text-sm uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
              Lo que aprenderás
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {course.lessons.map((l) => (
                <li key={l.id} className="flex items-start gap-2">
                  <span style={{ color: "var(--green)" }}>✓</span>
                  <span>{l.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Start CTA */}
          <Link
            href={`/cursos/${course.slug}/leccion/${course.lessons[0]?.id}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
            style={{ background: "var(--green)", color: "#000" }}
          >
            ▶ Comenzar curso
          </Link>
        </div>

        {/* Right: Lessons sidebar */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
            <span className="font-semibold text-sm">Contenido del curso</span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>{course.lessonCount} lecciones</span>
          </div>
          <ul>
            {course.lessons.map((lesson, i) => (
              <li key={lesson.id} style={{ borderBottom: i < course.lessons.length - 1 ? "1px solid var(--border)" : "none" }}>
                <Link
                  href={`/cursos/${course.slug}/leccion/${lesson.id}`}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors group"
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                    style={{ background: "rgba(0,209,102,0.15)", color: "var(--green)" }}
                  >
                    {lesson.order}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-tight group-hover:text-white transition-colors line-clamp-2">
                      {lesson.title}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      ▶ {fmtSec(lesson.durationSec)}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

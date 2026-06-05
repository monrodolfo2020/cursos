import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import CourseAccordion from "../../components/CourseAccordion";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = await prisma.course.findUnique({ where: { slug } });
  if (!course) return {};
  return { title: `${course.title} — Instrumex Academy` };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug },
    include: { lessons: { orderBy: { order: "asc" } } },
  });
  if (!course) notFound();

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs mb-6 flex-wrap" style={{ color: "var(--text-muted)" }}>
        <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/cursos" className="hover:text-white transition-colors">Cursos</Link>
        <span>/</span>
        <span className="text-white line-clamp-1">{course.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Left: Course info ── */}
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

          <h1 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight">{course.title}</h1>
          <p className="text-sm sm:text-base leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>
            {course.description}
          </p>

          <div className="flex flex-wrap gap-4 sm:gap-6 mb-8 text-sm" style={{ color: "var(--text-muted)" }}>
            <span>👨‍🏫 {course.instructor}</span>
            <span>📚 {course.lessonCount} lecciones</span>
            <span>⏱ {course.totalMinutes} min</span>
          </div>

          {/* CTA */}
          <Link
            href={`/cursos/${course.slug}/leccion/${course.lessons[0]?.id}`}
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:scale-105 active:scale-95"
            style={{ background: "var(--green)", color: "#000" }}
          >
            ▶ Comenzar curso
          </Link>
        </div>

        {/* ── Right: Lesson accordion ── */}
        <div
          className="rounded-xl overflow-hidden lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:flex lg:flex-col"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <div
            className="px-4 py-3 border-b flex items-center justify-between flex-shrink-0"
            style={{ borderColor: "var(--border)" }}
          >
            <span className="font-semibold text-sm">Contenido del curso</span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {course.lessonCount} lecciones
            </span>
          </div>
          {/* Accordion is a client component */}
          <CourseAccordion lessons={course.lessons} slug={course.slug} />
        </div>
      </div>
    </div>
  );
}

import { prisma } from "../../lib/prisma";
import CourseCard from "../components/CourseCard";

export default async function CursosPage() {
  const courses = await prisma.course.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div className="max-w-6xl mx-auto w-full px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Todos los cursos</h1>
        <p style={{ color: "var(--text-muted)" }}>
          {courses.length} {courses.length === 1 ? "curso disponible" : "cursos disponibles"}
        </p>
      </div>
      {courses.length === 0 ? (
        <p style={{ color: "var(--text-muted)" }}>No hay cursos aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      )}
    </div>
  );
}

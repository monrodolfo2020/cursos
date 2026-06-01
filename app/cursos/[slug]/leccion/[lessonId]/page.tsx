import { prisma } from "../../../../../lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LessonPlayer from "../../../../components/LessonPlayer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lessonId: string }>;
}): Promise<Metadata> {
  const { lessonId } = await params;
  const lesson = await prisma.lesson.findUnique({ where: { id: Number(lessonId) } });
  if (!lesson) return {};
  return { title: `${lesson.title} — Instrumex Academy` };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonId: string }>;
}) {
  const { slug, lessonId } = await params;

  const course = await prisma.course.findUnique({
    where: { slug },
    include: { lessons: { orderBy: { order: "asc" } } },
  });
  if (!course) notFound();

  const lesson = course.lessons.find((l) => l.id === Number(lessonId));
  if (!lesson) notFound();

  const currentIndex = course.lessons.indexOf(lesson);
  const prevLesson = course.lessons[currentIndex - 1] ?? null;
  const nextLesson = course.lessons[currentIndex + 1] ?? null;

  return (
    <LessonPlayer
      course={{ slug: course.slug, title: course.title }}
      lesson={lesson}
      lessons={course.lessons}
      prevLessonId={prevLesson?.id ?? null}
      nextLessonId={nextLesson?.id ?? null}
    />
  );
}

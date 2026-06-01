import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "./app/generated/prisma/client.ts";

const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();

  await prisma.course.create({
    data: {
      slug: "instrumentacion-industrial",
      title: "Instrumentación Industrial",
      description:
        "Domina los fundamentos de la instrumentación y automatización industrial. Aprende sobre sensores de temperatura, RTD, termocuplas y los sistemas que controlan los procesos industriales modernos.",
      instructor: "Instrumex",
      level: "Principiante",
      category: "Ingeniería Industrial",
      totalMinutes: 28,
      lessonCount: 3,
      lessons: {
        create: [
          {
            order: 1,
            title: "Módulo 0: Automatización Industrial",
            description:
              "Introducción al mundo de la automatización. Conoce qué es, por qué importa, las industrias donde se aplica y la ruta del curso.",
            durationSec: 169,
            videoPath: "/videos/automation/Video Módulo 0.html",
          },
          {
            order: 2,
            title: "RTD PT100 — Sensor de 3 Hilos",
            description:
              "Aprende cómo funciona el sensor RTD PT100 en configuración de 3 hilos: principio de operación, conexión y ventajas sobre otros sensores.",
            durationSec: 540,
            videoPath: "/videos/rtd-pt100/RTD PT100 - 3 Hilos.html",
          },
          {
            order: 3,
            title: "Termocuplas Tipo J y K",
            description:
              "Conoce las termocuplas tipo J y K: sus rangos de temperatura, composición metálica, aplicaciones industriales y cómo interpretarlas.",
            durationSec: 480,
            videoPath: "/videos/termocuplas/Termocuplas J y K.html",
          },
        ],
      },
    },
  });

  console.log("✅ Seed completado");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

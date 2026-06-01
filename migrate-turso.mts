import { createClient } from "@libsql/client";

const db = createClient({
  url: "libsql://cursos-db-monrodolfo2020.aws-us-east-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODAyODQ2MTksImlkIjoiMDE5ZTgxMzctMWEwMS03MDQ2LWI0MTYtOGUyOTA5MDBkNDg4IiwicmlkIjoiMjVjYjg2NGItYmFhNi00ODVhLWFmZjItYTU1MmZlYTAzMGI4In0.kVlvb3D-9I3aOavdZ8moaM7UQGmwcsTGtNFvGqRu03GT6mG6X_ovn4PhPi5EFRcodVGXmFnQ5Bd2YMxEaIr_Bw",
});

await db.executeMultiple(`
CREATE TABLE IF NOT EXISTS "Course" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "instructor" TEXT NOT NULL,
  "level" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "totalMinutes" INTEGER NOT NULL,
  "lessonCount" INTEGER NOT NULL,
  "thumbnail" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Lesson" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "courseId" INTEGER NOT NULL,
  "order" INTEGER NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "durationSec" INTEGER NOT NULL,
  "videoPath" TEXT NOT NULL,
  CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "Course_slug_key" ON "Course"("slug");
`);

console.log("✅ Schema aplicado a Turso");
db.close();

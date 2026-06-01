import Link from "next/link";

type Course = {
  slug: string;
  title: string;
  description: string;
  instructor: string;
  level: string;
  category: string;
  totalMinutes: number;
  lessonCount: number;
};

const LEVEL_COLOR: Record<string, string> = {
  Principiante: "#00d166",
  Intermedio: "#f5a623",
  Avanzado: "#e84040",
};

// SVG pattern per course for visual variety
function CourseThumbnail({ title, category }: { title: string; category: string }) {
  const hue = (title.charCodeAt(0) * 37) % 360;
  return (
    <div
      className="w-full aspect-video relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, hsl(${hue},70%,8%) 0%, hsl(${(hue + 40) % 360},60%,12%) 100%)`,
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 400 225"
        xmlns="http://www.w3.org/2000/svg"
      >
        {[...Array(8)].map((_, i) => (
          <circle
            key={i}
            cx={50 * i}
            cy={100 + Math.sin(i) * 40}
            r={30 + i * 5}
            fill="none"
            stroke={`hsl(${hue},80%,50%)`}
            strokeWidth="1"
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold"
          style={{ background: `hsl(${hue},70%,40%)`, color: "#fff" }}
        >
          {title.charAt(0)}
        </div>
        <p className="text-xs font-medium text-white/80 uppercase tracking-wide">{category}</p>
      </div>
    </div>
  );
}

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/cursos/${course.slug}`}
      className="block rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl group"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
    >
      <CourseThumbnail title={course.title} category={course.category} />
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide"
            style={{
              background: `${LEVEL_COLOR[course.level] || "#888"}22`,
              color: LEVEL_COLOR[course.level] || "#888",
            }}
          >
            {course.level}
          </span>
          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
            {course.category}
          </span>
        </div>
        <h3 className="font-semibold text-sm mb-1 group-hover:text-green-400 transition-colors line-clamp-2">
          {course.title}
        </h3>
        <p className="text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: "var(--text-muted)" }}>
          {course.description}
        </p>
        <div className="flex items-center justify-between text-xs" style={{ color: "var(--text-muted)" }}>
          <span>{course.instructor}</span>
          <span>{course.lessonCount} lecciones · {course.totalMinutes} min</span>
        </div>
      </div>
    </Link>
  );
}

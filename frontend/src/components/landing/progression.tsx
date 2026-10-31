import { Section, SectionHeader } from "@/components/layout/section";
import { cn } from "@/lib/utils";

const SKILLS = ["Listening", "Speaking", "Reading", "Writing"];

// Rising offsets on large screens echo the legacy "staircase" and suggest progress.
const LEVELS = [
  {
    code: "A1 – A2",
    title: "Beginner",
    percent: 55,
    badge: "bg-accent text-brand-blue-strong",
    offset: "lg:mt-16",
  },
  {
    code: "B1 – B2",
    title: "Intermediate",
    percent: 65,
    badge: "bg-brand-rose text-brand-strong",
    offset: "lg:mt-8",
  },
  {
    code: "C1 – C2",
    title: "Advanced",
    percent: 75,
    badge: "bg-muted text-foreground",
    offset: "lg:mt-0",
  },
];

export function Progression() {
  return (
    <Section id="levels">
      <SectionHeader
        eyebrow="Progression"
        title="Your Personalized Path to Fluency — One Level at a Time"
      />
      <div className="mt-12 grid items-start gap-6 sm:mt-16 lg:grid-cols-3">
        {LEVELS.map((level) => (
          <article
            key={level.code}
            className={cn(
              "reveal rounded-2xl border bg-card p-6 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card-hover sm:p-7",
              level.offset,
            )}
          >
            <span
              className={cn(
                "inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
                level.badge,
              )}
            >
              {level.code}
            </span>
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
              {level.title}
            </h3>

            <div className="mt-6">
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-muted-foreground">Sample progress</span>
                <span className="font-semibold text-foreground">
                  {level.percent}%
                </span>
              </div>
              <div
                role="progressbar"
                aria-label={`Sample progress for ${level.title}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={level.percent}
                className="mt-2 h-2 overflow-hidden rounded-full bg-muted"
              >
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${level.percent}%` }}
                />
              </div>
            </div>

            <ul className="mt-6 flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

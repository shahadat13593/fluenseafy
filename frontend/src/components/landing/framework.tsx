import {
  ClapperboardIcon,
  ClipboardCheckIcon,
  FileTextIcon,
  GraduationCapIcon,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/layout/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FEATURES: { Icon: LucideIcon; title: string; text: string }[] = [
  {
    Icon: ClapperboardIcon,
    title: "Expert-Led Lessons",
    text: "Engaging videos, real-world scenarios, and interactive content to strengthen all four language skills.",
  },
  {
    Icon: FileTextIcon,
    title: "Structured Notes",
    text: "Detailed lesson materials, transcripts, and key takeaways in interactive and downloadable formats.",
  },
  {
    Icon: ClipboardCheckIcon,
    title: "AI-Powered Quizzes",
    text: "Personalized assessments that adapt to your progress for an effective learning experience.",
  },
  {
    Icon: GraduationCapIcon,
    title: "Certified Progression",
    text: "Earn certificates, track achievements, and unlock new levels as you advance toward fluency.",
  },
];

export function Framework() {
  return (
    <Section id="framework" tone="surface">
      <SectionHeader
        eyebrow="Framework"
        title="How You Learn — A Step by Step Process"
      />
      <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ Icon, title, text }) => (
          <Card
            key={title}
            className="reveal transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <CardHeader>
              <span className="mb-2 grid size-12 place-items-center rounded-xl bg-accent text-brand-blue-strong">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <CardTitle>
                <h3>{title}</h3>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">{text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}

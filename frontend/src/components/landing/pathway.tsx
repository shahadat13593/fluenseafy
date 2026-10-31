import Image from "next/image";
import {
  BookOpenIcon,
  HeadphonesIcon,
  MicIcon,
  PenLineIcon,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/layout/section";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    Icon: HeadphonesIcon,
    title: "Listening: Understand with Confidence",
    text: "Improve your listening skills through curated videos, interactive transcripts, and AI-powered quizzes designed to enhance comprehension. Whether it’s casual dialogues or professional discussions, you’ll train your ear for natural English.",
    image: "/img/listening.png",
    alt: "Illustration of a learner practising listening",
    width: 4267,
    height: 4267,
  },
  {
    Icon: MicIcon,
    title: "Speaking: Speak Clearly & Naturally",
    text: "With AI speech analysis and guided speaking exercises, you’ll receive instant feedback to refine your pronunciation, rhythm, and confidence. Simulated conversations help you speak naturally in everyday situations.",
    image: "/img/speaking.png",
    alt: "Illustration of a learner practising speaking",
    width: 4219,
    height: 4215,
  },
  {
    Icon: BookOpenIcon,
    title: "Reading: Build Speed & Comprehension",
    text: "Explore articles, stories, and guided lessons tailored to your skill level. With comprehension exercises and vocabulary-building quizzes, you’ll develop the ability to read faster and retain more.",
    image: "/img/reading.png",
    alt: "Illustration of a learner practising reading",
    width: 4267,
    height: 4267,
  },
  {
    Icon: PenLineIcon,
    title: "Writing: Express Yourself with Precision",
    text: "From emails to essays, our structured writing lessons and smart AI assistant help refine your grammar, clarity, and style—so you can communicate effectively in any situation.",
    image: "/img/writing.png",
    alt: "Illustration of a learner practising writing",
    width: 4267,
    height: 4267,
  },
];

export function Pathway() {
  return (
    <Section id="pathway" tone="surface">
      <SectionHeader
        eyebrow="Pathway"
        title="A Smarter Way to Master English — Step by Step"
      />
      <div className="mt-12 space-y-14 sm:mt-16 lg:space-y-24">
        {STEPS.map((step, i) => {
          const imageFirst = i % 2 === 1;
          return (
            <article
              key={step.title}
              className="grid items-center gap-8 md:grid-cols-2 md:gap-14 lg:gap-20"
            >
              <div className={cn("reveal", imageFirst && "md:order-2")}>
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-accent text-brand-blue-strong">
                    <step.Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-muted-foreground">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-bold tracking-tight text-balance text-foreground sm:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
                  {step.text}
                </p>
              </div>
              <div className={cn("reveal", imageFirst && "md:order-1")}>
                <Image
                  src={step.image}
                  alt={step.alt}
                  width={step.width}
                  height={step.height}
                  sizes="(min-width: 768px) 440px, 90vw"
                  className="mx-auto h-auto w-full max-w-md rounded-3xl shadow-card"
                />
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

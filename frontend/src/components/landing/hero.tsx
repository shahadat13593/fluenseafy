import Image from "next/image";
import {
  BookOpenIcon,
  HeadphonesIcon,
  MicIcon,
  PenLineIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { HeroAmbient } from "./hero-ambient";

const SKILLS = [
  { label: "Listening", Icon: HeadphonesIcon },
  { label: "Speaking", Icon: MicIcon },
  { label: "Reading", Icon: BookOpenIcon },
  { label: "Writing", Icon: PenLineIcon },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-gradient-to-b from-surface to-background"
    >
      <HeroAmbient />
      <Container className="relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        <div>
          <p style={{ "--i": 0 } as React.CSSProperties} className="rise inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-semibold text-brand-blue-strong sm:text-sm">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            English learning from A1 to C2
          </p>
          <h1 style={{ "--i": 1 } as React.CSSProperties} className="rise mt-5 text-[clamp(2.25rem,1.6rem+2.8vw,3.5rem)] leading-[1.1] font-bold tracking-tight text-balance text-foreground">
            Master English with a{" "}
            <span className="text-primary">Structured and Engaging</span>{" "}
            Learning Experience
          </h1>
          <p style={{ "--i": 2 } as React.CSSProperties} className="rise mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            Unlock your full potential in English with expert-led courses in
            listening, speaking, writing, and reading. Learn at your own pace
            with interactive lessons designed to build confidence and fluency.
          </p>

          <div style={{ "--i": 3 } as React.CSSProperties} className="rise mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#pricing">Start your journey</a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="#assessment">Level assessment</a>
            </Button>
          </div>

          <ul style={{ "--i": 4 } as React.CSSProperties} className="rise mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-muted-foreground">
            {SKILLS.map(({ label, Icon }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="size-4 text-brand-blue-strong" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto w-full max-w-md lg:max-w-none">
          {/* White-background illustration: multiply blends it into the ambient layer. Keep this wrapper free of opacity/transform/z-index so it does not isolate the blend. */}
          <Image
            src="/img/hero_image.png"
            alt="A person studying English at a desk with a laptop"
            width={4267}
            height={4267}
            sizes="(min-width: 1024px) 45vw, (min-width: 448px) 448px, 90vw"
            data-hero-art
            className="h-auto w-full mix-blend-multiply"
            priority
          />
        </div>
      </Container>
    </section>
  );
}

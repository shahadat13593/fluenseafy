import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = React.ComponentProps<"section"> & {
  tone?: "default" | "surface";
};

/** Vertical rhythm and background for a landing page section. */
export function Section({
  tone = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-16 sm:py-20 lg:py-28",
        tone === "surface" && "border-y border-border/70 bg-surface",
        className,
      )}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="reveal mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold tracking-[0.12em] text-primary uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-[clamp(1.875rem,1.4rem+1.6vw,2.75rem)] leading-[1.15] font-bold tracking-tight text-balance text-foreground">
        {title}
      </h2>
    </div>
  );
}

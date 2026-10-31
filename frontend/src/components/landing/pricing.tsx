import { CheckIcon, XIcon } from "lucide-react";
import { Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Feature = { text: string; included: boolean; strong?: boolean };

const SHARED: Feature[] = [
  { text: "Expert-Led Lessons", included: true },
  { text: "Structured Notes", included: true },
  { text: "AI Power Quizzes", included: true },
];

const PLANS: {
  name: string;
  price: number;
  dot: string;
  variant: "outline" | "default";
  features: Feature[];
}[] = [
  {
    name: "Basic to Intermediate",
    price: 33,
    dot: "bg-foreground",
    variant: "outline",
    features: [
      { text: "A1 to B2 Levels", included: true, strong: true },
      ...SHARED,
      { text: "Unlimited Quizzes", included: false },
    ],
  },
  {
    name: "Advanced",
    price: 66,
    dot: "bg-brand-blue",
    variant: "outline",
    features: [
      { text: "C1 to C2 Levels", included: true, strong: true },
      ...SHARED,
      { text: "Unlimited Quizzes", included: false },
    ],
  },
  {
    name: "All Inclusive",
    price: 99,
    dot: "bg-primary",
    variant: "default",
    features: [
      { text: "All Levels", included: true, strong: true },
      ...SHARED,
      { text: "Unlimited Quizzes", included: true, strong: true },
    ],
  },
];

export function Pricing() {
  return (
    <Section id="pricing">
      <SectionHeader
        eyebrow="Pricing"
        title="Flexible Plans for Learners — Designed for Your Needs"
      />
      <div className="mx-auto mt-12 grid max-w-md gap-5 lg:mt-16 lg:max-w-none lg:grid-cols-3 lg:gap-6">
        {PLANS.map((plan, i) => (
          <Card
            key={plan.name}
            style={{ "--reveal-i": i } as React.CSSProperties}
            className="reveal surface-lift h-full gap-0 [--card-spacing:--spacing(7)] sm:[--card-spacing:--spacing(8)]"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2.5 text-sm font-semibold tracking-wide text-muted-foreground">
                <span
                  className={cn("size-2 rounded-full", plan.dot)}
                  aria-hidden="true"
                />
                <h3>{plan.name}</h3>
              </CardTitle>
              <p className="mt-5 flex items-baseline gap-1 text-foreground">
                <span className="text-2xl font-medium text-muted-foreground">
                  $
                </span>
                <span className="text-[3.5rem] leading-none font-semibold tracking-tight tabular-nums">
                  {plan.price}
                </span>
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                All modules included
              </p>
            </CardHeader>

            <Separator className="my-7" />

            <CardContent className="flex-1">
              <ul className="space-y-3.5 text-[0.9375rem]">
                {plan.features.map((feature) => (
                  <li
                    key={feature.text}
                    className={cn(
                      "flex items-center gap-3",
                      !feature.included && "text-muted-foreground",
                    )}
                  >
                    {feature.included ? (
                      <CheckIcon
                        className="size-[1.125rem] shrink-0 text-primary"
                        aria-hidden="true"
                      />
                    ) : (
                      <XIcon
                        className="size-[1.125rem] shrink-0 text-muted-foreground/60"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={cn(
                        feature.strong && "font-semibold text-foreground",
                      )}
                    >
                      {feature.text}
                      {!feature.included && (
                        <span className="sr-only"> (not included)</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="mt-8 border-0 bg-transparent p-0 px-(--card-spacing) pb-6">
              <Button
                asChild
                size="lg"
                variant={plan.variant}
                className="w-full"
              >
                <a href="#assessment">Get Started</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  );
}

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
  accent: string;
  variant: "outline" | "default";
  features: Feature[];
}[] = [
  {
    name: "Basic to Intermediate",
    price: 33,
    accent: "bg-foreground",
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
    accent: "bg-brand-blue",
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
    accent: "bg-primary",
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
      <div className="mx-auto mt-12 grid max-w-md gap-6 sm:mt-16 lg:max-w-none lg:grid-cols-3">
        {PLANS.map((plan) => (
          <Card
            key={plan.name}
            className="reveal relative gap-0 pt-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <span
              className={cn("absolute inset-x-0 top-0 h-1.5", plan.accent)}
              aria-hidden="true"
            />
            <CardHeader className="text-center">
              <CardTitle className="text-sm tracking-[0.08em] text-muted-foreground uppercase">
                <h3>{plan.name}</h3>
              </CardTitle>
              <p className="mt-4 flex items-start justify-center text-foreground">
                <span className="mt-2 mr-1 text-2xl font-medium">$</span>
                <span className="text-6xl font-bold tracking-tight">
                  {plan.price}
                </span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                All modules included
              </p>
            </CardHeader>

            <CardContent className="mt-8">
              <ul className="space-y-3.5">
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
                        className="size-5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                    ) : (
                      <XIcon
                        className="size-5 shrink-0 text-muted-foreground/70"
                        aria-hidden="true"
                      />
                    )}
                    <span className={cn(feature.strong && "font-semibold text-foreground")}>
                      {feature.text}
                      {!feature.included && (
                        <span className="sr-only"> (not included)</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="mt-8 border-0 bg-transparent p-0 px-(--card-spacing)">
              <Button asChild size="lg" variant={plan.variant} className="w-full">
                <a href="#assessment">Get Started</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  );
}

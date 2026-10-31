import { Icon } from "@/components/icons";
import { SectionHeader } from "./section-header";

type Feature = { text: string; included: boolean; strong?: boolean };

const SHARED: Feature[] = [
  { text: "Expert-Led Lessons", included: true },
  { text: "Structured Notes", included: true },
  { text: "AI Power Quizzes", included: true },
];

const PLANS: {
  modifier: string;
  name: string;
  price: number;
  buttonClass: string;
  features: Feature[];
}[] = [
  {
    modifier: "plan--basic",
    name: "Basic to Intermediate",
    price: 33,
    buttonClass: "btn",
    features: [
      { text: "A1 to B2 Levels", included: true, strong: true },
      ...SHARED,
      { text: "Unlimited Quizzes", included: false },
    ],
  },
  {
    modifier: "plan--intermediate",
    name: "Get Advance",
    price: 66,
    buttonClass: "btn btn--secondary",
    features: [
      { text: "C1 to C2 Levels", included: true, strong: true },
      ...SHARED,
      { text: "Unlimited Quizzes", included: false },
    ],
  },
  {
    modifier: "plan--advance",
    name: "All Inclusive",
    price: 99,
    buttonClass: "btn btn--primary",
    features: [
      { text: "All Levels", included: true, strong: true },
      ...SHARED,
      { text: "Unlimited Quizzes", included: true, strong: true },
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="section--price">
      <SectionHeader
        eyebrow="Pricing"
        title="Flexible Plans for Learners — Designed for Your Needs"
      />
      <div className="container grid grid--3--cols plan-gap margin-bottom--mb">
        {PLANS.map((plan) => (
          <div key={plan.name} className={`plan ${plan.modifier}`}>
            <div className="plan-header">
              <h3 className="plan-name">{plan.name}</h3>
              <p className="plan-price">
                <span>$</span>
                {plan.price}
              </p>
              <p className="plan-text">All module are Included</p>
            </div>
            <ul className="plan-lists">
              {plan.features.map((feature) => (
                <li key={feature.text} className="plan-list">
                  <Icon
                    name={
                      feature.included
                        ? "checkmark-circle-outline"
                        : "close-circle-outline"
                    }
                    className="plan-icon"
                  />
                  <span>
                    {feature.strong ? <strong>{feature.text}</strong> : feature.text}
                    {!feature.included && (
                      <span className="visually-hidden"> (not included)</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <div className="plan-btn">
              <button type="button" className={plan.buttonClass}>
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="container all-courses">
        <a href="#" className="link">
          See all Courses &rarr;
        </a>
      </div>
    </section>
  );
}

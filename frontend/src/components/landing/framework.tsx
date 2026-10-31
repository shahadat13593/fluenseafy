import { Icon, type IconName } from "@/components/icons";
import { SectionHeader } from "./section-header";

const FEATURES: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "film-outline",
    title: "Expert-Led Lessons",
    text: "Engaging videos, real-world scenarios, and interactive content to strengthen all four language skills.",
  },
  {
    icon: "reader-outline",
    title: "Structured Notes",
    text: "Detailed lesson materials, transcripts, and key takeaways in interactive and downloadable formats.",
  },
  {
    icon: "bag-check-outline",
    title: "AI-Powered Quizzes",
    text: "Personalized assessments that adapt to your progress for an effective learning experience.",
  },
  {
    icon: "school-outline",
    title: "Certified Progression",
    text: "Earn certificates, track achievements, and unlock new levels as you advance toward fluency.",
  },
];

export function Framework() {
  return (
    <section id="framework" className="section--framework">
      <SectionHeader
        eyebrow="Framework"
        title="How You Learn — A Step by Step Process"
      />
      <div className="container grid grid--4--cols">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="framework-box">
            <Icon name={feature.icon} className="framework-icon" />
            <h3 className="framework-title">{feature.title}</h3>
            <p className="framework-description">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

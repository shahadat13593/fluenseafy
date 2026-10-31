import Image from "next/image";
import { SectionHeader } from "./section-header";

const STEPS = [
  {
    title: "Listening: Understand with Confidence",
    text: "Improve your listening skills through curated videos, interactive transcripts, and AI-powered quizzes designed to enhance comprehension. Whether it’s casual dialogues or professional discussions, you’ll train your ear for natural English.",
    image: "/img/listening.png",
    alt: "Illustration of a learner practising listening",
    width: 4267,
    height: 4267,
    imageFirst: false,
  },
  {
    title: "Speaking: Speak Clearly & Naturally",
    text: "With AI speech analysis and guided speaking exercises, you’ll receive instant feedback to refine your pronunciation, rhythm, and confidence. Simulated conversations help you speak naturally in everyday situations.",
    image: "/img/speaking.png",
    alt: "Illustration of a learner practising speaking",
    width: 4219,
    height: 4215,
    imageFirst: true,
  },
  {
    title: "Reading: Build Speed & Comprehension",
    text: "Explore articles, stories, and guided lessons tailored to your skill level. With comprehension exercises and vocabulary-building quizzes, you’ll develop the ability to read faster and retain more.",
    image: "/img/reading.png",
    alt: "Illustration of a learner practising reading",
    width: 4267,
    height: 4267,
    imageFirst: false,
  },
  {
    title: "Writing: Express Yourself with Precision",
    text: "From emails to essays, our structured writing lessons and smart AI assistant help refine your grammar, clarity, and style—so you can communicate effectively in any situation.",
    image: "/img/writing.png",
    alt: "Illustration of a learner practising writing",
    width: 4267,
    height: 4267,
    imageFirst: true,
  },
];

export function Pathway() {
  return (
    <section id="pathway" className="section--pathway">
      <SectionHeader
        eyebrow="Pathway"
        title="A Smarter Way to Master English — Step by Step"
      />
      <div className="container grid grid--2--cols center-y">
        {STEPS.map((step) => {
          const text = (
            <div className="step--text-box">
              <h3 className="heading--tertiary">{step.title}</h3>
              <p className="step-heading-description">{step.text}</p>
            </div>
          );
          const img = (
            <div className="step--img-box">
              <Image
                src={step.image}
                alt={step.alt}
                width={step.width}
                height={step.height}
                sizes="(max-width: 900px) 90vw, 480px"
                className="step-img"
              />
            </div>
          );
          return (
            <article key={step.title} className="step">
              {step.imageFirst ? img : text}
              {step.imageFirst ? text : img}
            </article>
          );
        })}
      </div>
    </section>
  );
}

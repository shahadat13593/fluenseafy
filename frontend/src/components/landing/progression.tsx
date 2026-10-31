import { Icon } from "@/components/icons";
import { SectionHeader } from "./section-header";

const PILLARS = ["Listening", "Speaking", "Reading", "Writing"];

const LEVELS = [
  { title: "Beginner — A1 to A2", percent: 55, bg: "bg--1", fill: "progress-bar--fill-1" },
  { title: "Intermediate — B1 to B2", percent: 65, bg: "bg--2", fill: "progress-bar--fill-2" },
  { title: "Advanced — C1 to C2", percent: 75, bg: "bg--3", fill: "progress-bar--fill-3" },
];

// Legacy layout: a 3-column grid where each card is followed by three empty
// cells, which produces the diagonal "staircase" arrangement.
function EmptyCells({ prefix }: { prefix: string }) {
  return [0, 1, 2].map((i) => (
    <div key={`${prefix}-${i}`} className="progression-box" aria-hidden="true" />
  ));
}

export function Progression() {
  return (
    <section id="progression" className="section--progression">
      <SectionHeader
        eyebrow="Progression"
        title="Your Personalized Path to Fluency — One Level at a Time"
      />
      <div className="container grid grid--3--cols no-gap">
        {LEVELS.map((level, i) => (
          <ProgressionGroup key={level.title} level={level} last={i === LEVELS.length - 1} />
        ))}
      </div>
    </section>
  );
}

function ProgressionGroup({
  level,
  last,
}: {
  level: (typeof LEVELS)[number];
  last: boolean;
}) {
  return (
    <>
      <div className={`progression-box content-p ${level.bg}`}>
        <div className="p-box--first">
          <div className="progress-bar-box">
            <p className="Progress-level">
              Progress:{" "}
              <span className="Progress-percentage">{level.percent}% Done</span>
            </p>
            <div className="progress-bar" aria-hidden="true">
              <div className={`progress-bar-fill ${level.fill}`} />
            </div>
          </div>
          <Icon name="person-circle-outline" className="progression-icon" />
        </div>
        <h3 className="progression-heading">{level.title}</h3>
        <div className="four--pillars">
          {PILLARS.map((pillar) => (
            <div key={pillar} className="pillar">
              <span className="p-levels">{pillar}</span>
            </div>
          ))}
        </div>
      </div>
      {!last && <EmptyCells prefix={level.title} />}
    </>
  );
}

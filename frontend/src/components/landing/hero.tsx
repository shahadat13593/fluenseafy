import Image from "next/image";

export function Hero() {
  return (
    <section id="home" className="section-hero">
      <div className="hero-text-box">
        <h1 className="primary-heading">
          Master English with a Structured and Engaging Learning Experience
        </h1>
        <p className="heading-description">
          Unlock your full potential in English with expert-led courses in
          listening, speaking, writing, and reading. Learn at your own pace with
          interactive lessons designed to build confidence and fluency.
        </p>
        <div className="hero-btn-box">
          <button type="button" className="btn btn--primary">
            Start your journey
          </button>
          <button type="button" className="btn btn--level">
            Level assessment
          </button>
        </div>
      </div>
      <div className="hero-img-box">
        <Image
          src="/img/hero_image.png"
          alt="A person studying English"
          width={4267}
          height={4267}
          sizes="(max-width: 900px) 100vw, 600px"
          className="hero-image"
          priority
        />
      </div>
    </section>
  );
}

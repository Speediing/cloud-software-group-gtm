import type { SlideCard } from "@/data/types";

export function HeardSlide({
  slides,
  size = "lg",
}: {
  slides: SlideCard[];
  size?: "sm" | "lg";
  wash?: string;
}) {
  return (
    <div className={`leave leave-heard size-${size}`}>
      <article className="heard-slide">
        <header className="heard-bar">
          <span>Meeting brief</span>
          <span>Prepared by Scout + Brief</span>
        </header>
        <div className="heard-main">
          <h3>Context for the next conversation</h3>
          <ol>
            {slides.slice(0, 2).map((slide) => (
              <li key={slide.n}>
                <p className="heard-quote">{slide.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="heard-map">
          <ul>
            {slides.slice(2).map((slide) => (
              <li key={slide.n}>
                <strong>{slide.title}.</strong> {slide.body}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
}

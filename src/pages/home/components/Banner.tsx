import { useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import { Link } from "react-router";
import "./Banner.css";

const slides = [
  {
    id: "find-your-next-car",
    image: "/images/hero/service-and-repair.jpg",
    imageAlt: "A red sports car",
    subtitle: "Your next car starts here",
    title: "Find Your Next Car",
    description: "Explore cars that match your lifestyle and budget.",
    detail: "Compare your options and choose your next drive.",
  },
  {
    id: "drive-your-dream",
    image: "/images/hero/drive-your-dream.jpg",
    imageAlt: "A black sports car overlooking mountains at sunset",
    subtitle: "A car for every journey",
    title: "Drive Your Dream",
    description: "From daily commutes to weekend getaways.",
    detail: "Find the style, comfort, and performance you want.",
  },
];

export function Banner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const changeSlide = (direction: number) => {
    setActiveIndex((index) => (index + direction + slides.length) % slides.length);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      changeSlide(event.key === "ArrowRight" ? 1 : -1);
    }
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const end = event.changedTouches[0];
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || !end) return;

    const distanceX = start.x - end.clientX;
    const distanceY = start.y - end.clientY;

    if (Math.abs(distanceX) > 50 && Math.abs(distanceX) > Math.abs(distanceY)) {
      changeSlide(distanceX > 0 ? 1 : -1);
    }
  };

  return (
    <section
      className="hero-slider"
      aria-roledescription="carousel"
      aria-label="AutoSphere highlights"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={(event) => {
        const touch = event.touches[0];
        if (touch) touchStart.current = { x: touch.clientX, y: touch.clientY };
      }}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => { touchStart.current = null; }}
    >
      {slides.map((slide, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={slide.id}
            id={`hero-slide-${slide.id}`}
            className="hero-slide"
            data-active={isActive}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}
            aria-hidden={!isActive}
          >
            <img
              src={slide.image}
              alt={slide.imageAlt}
              className="hero-slide__image"
              decoding="async"
              draggable={false}
            />
            <div className="hero-slide__overlay" aria-hidden="true" />

            <div className="hero-slide__container">
              <div className="hero-slide__copy">
                <p className="hero-slide__subtitle hero-slide__reveal">{slide.subtitle}</p>
                <h1 className="hero-slide__title hero-slide__reveal">{slide.title}</h1>
                <p className="hero-slide__description hero-slide__reveal">
                  {slide.description}<br />{slide.detail}
                </p>
                <div className="hero-slide__action hero-slide__reveal">
                  <Link to="/products" className="hero-slide__button" tabIndex={isActive ? 0 : -1}>
                    <span className="hero-slide__button-label">
                      <span>Explore cars</span>
                      <span aria-hidden="true">Explore cars</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="hero-slider__pagination" role="group" aria-label="Choose a slide">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className="hero-slider__dot"
            data-active={index === activeIndex}
            aria-label={`Show slide ${index + 1}: ${slide.title}`}
            aria-controls={`hero-slide-${slide.id}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
          >
            <span aria-hidden="true" />
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {slides[activeIndex].title}
      </p>
    </section>
  );
}

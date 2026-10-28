import { useEffect, type MouseEvent } from "react";
import { Link } from "react-router";
import { ArrowRight, CarFront, Check, ClipboardList, MessagesSquare } from "lucide-react";
import "./About.css";
import "../shared/PageHero.css";

const values = [
  {
    Icon: ClipboardList,
    title: "The details first",
    description: "Look beyond the photo. Explore specifications, mileage, features and warranty details in one place.",
  },
  {
    Icon: CarFront,
    title: "Your kind of car",
    description: "A daily commute, more room for family or a weekend escape. Start with what matters to your life.",
  },
  {
    Icon: MessagesSquare,
    title: "A human conversation",
    description: "Ask about a listing or tell us what you’re looking for. Your questions are a good place to start.",
  },
];

const steps = [
  { title: "Find your style", description: "Browse the collection and explore the cars that suit your budget and everyday needs." },
  { title: "Get to know the car", description: "Take a closer look at photos, specifications, features and customer reviews." },
  { title: "Talk it through", description: "Get in touch with your questions or share what you have in mind for your next drive." },
];

const priorities = [
  "Cars for different lifestyles and budgets",
  "The details you need, in one place",
  "Guidance when you want a closer look",
];

export default function About() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "About AutoSphere";
    window.scrollTo({ top: 0, behavior: "auto" });
    return () => { document.title = previousTitle; };
  }, []);

  const handleNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <main className="about-page">
      <section className="page-hero about-hero" aria-labelledby="about-title">
        <img className="page-hero__image about-hero__image" src="/images/promotions/porsche-road.webp" alt="" />
        <div className="page-hero__shade" aria-hidden="true" />
        <div className="page-hero__content">
          <p className="page-hero__eyebrow">About AutoSphere</p>
          <h1 className="page-hero__title" id="about-title">More than a car.<br /><span>A new beginning.</span></h1>
          <p className="page-hero__description">From the daily commute to the drive you’ve always wanted, AutoSphere brings your next car into focus.</p>
        </div>
      </section>

      <section className="about-section about-story" aria-labelledby="about-story-title">
        <div className="about-page__container about-story__grid">
          <div className="about-story__copy">
            <p className="about-page__eyebrow">Built around your journey</p>
            <h2 id="about-story-title">A car that fits your life.</h2>
            <p>At AutoSphere, we start with the way you drive. A city commute, a growing family or a weekend on the open road—every journey calls for something different.</p>
            <p>Our collection brings sedans, SUVs, hatchbacks and coupes into one place. Explore the details, get to know your options and talk to us when you’re ready for a closer look.</p>
            <ul className="about-story__priorities">
              {priorities.map((priority) => <li key={priority}><Check aria-hidden="true" /><span>{priority}</span></li>)}
            </ul>
            <Link className="about-page__button" to="/products" onClick={handleNavigation}>Explore our cars <ArrowRight aria-hidden="true" /></Link>
          </div>
          <figure className="about-story__visual">
            <img src="/images/promotions/bmw-city.webp" alt="Silver BMW driving along a palm-lined road" loading="lazy" decoding="async" />
            <figcaption><span className="about-story__icon"><CarFront aria-hidden="true" /></span><div><p>A car for every chapter.</p><span>Made for the way you drive.</span></div></figcaption>
          </figure>
        </div>
      </section>

      <section className="about-section about-values" aria-labelledby="about-values-title">
        <div className="about-page__container">
          <div className="about-page__heading about-values__heading">
            <p className="about-page__eyebrow">What drives us</p>
            <h2 id="about-values-title">Car choices. Made clearer.</h2>
            <p>The things that matter when you’re choosing your next car.</p>
          </div>
          <div className="about-values__grid">
            {values.map(({ Icon, title, description }) => (
              <article className="about-value" key={title}>
                <span className="about-value__icon"><Icon aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-approach" aria-labelledby="about-approach-title">
        <div className="about-page__container">
          <div className="about-approach__panel">
            <div className="about-approach__intro">
              <p className="about-page__eyebrow">A simpler start</p>
              <h2 id="about-approach-title">The road to your next car starts here.</h2>
              <p>Take it one step at a time. Explore what’s available, understand the details and start a conversation.</p>
              <Link className="about-approach__link" to="/products" onClick={handleNavigation}>Browse the collection <ArrowRight aria-hidden="true" /></Link>
            </div>
            <ol className="about-approach__steps">
              {steps.map((step, index) => <li key={step.title}><span className="about-approach__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}
            </ol>
          </div>
        </div>
      </section>

      <section className="about-cta" aria-labelledby="about-cta-title">
        <img className="about-cta__image" src="/images/hero/drive-your-dream.jpg" alt="" loading="lazy" decoding="async" />
        <div className="about-cta__shade" aria-hidden="true" />
        <div className="about-page__container about-cta__container">
          <h2 id="about-cta-title">Let’s find your next car together.</h2>
          <p>Buying your first car or planning an upgrade? Share your budget, driving needs and preferences with our team, and let’s explore what fits your next chapter.</p>
          <Link className="about-page__button about-cta__button" to="/contact" onClick={handleNavigation}>Contact us</Link>
        </div>
      </section>
    </main>
  );
}

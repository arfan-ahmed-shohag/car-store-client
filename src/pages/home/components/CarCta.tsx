import { Link } from "react-router";
import { demoCarCta, type CarCtaContent } from "../data/carCta";
import "./CarCta.css";

export default function CarCta({ content = demoCarCta }: { content?: CarCtaContent }) {
  return (
    <section id="find-your-next-car" className="home-section car-cta" aria-labelledby="car-cta-title">
      <img className="car-cta__image" src={content.image} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <div className="car-cta__shade" aria-hidden="true" />
      <div className="home-container car-cta__container">
        <div className="car-cta__banner">
          <div className="car-cta__copy">
            <h2 id="car-cta-title" className="car-cta__title">{content.title}</h2>
            <p className="car-cta__description">{content.description}</p>
            <Link to={content.href} className="car-cta__button">{content.buttonLabel}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

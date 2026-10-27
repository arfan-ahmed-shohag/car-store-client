import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { demoPromotionalOffers, type PromotionalOffer } from "../data/promotionalOffers";
import "./PromotionalOffers.css";

export default function PromotionalOffers({ offers = demoPromotionalOffers }: { offers?: readonly PromotionalOffer[] }) {
  return (
    <section className="home-section promotional-offers" aria-label="Car offers and promotions">
      <div className="home-container promotional-offers__container">
        <ul className="promotional-offers__grid">
          {offers.map((offer) => (
            <li key={offer.id}>
              <article>
                <Link to={offer.href} className="promo-offer" aria-labelledby={`promo-offer-${offer.id}`}>
                  <img className="promo-offer__image" src={offer.image} alt={offer.imageAlt} loading="lazy" decoding="async" />
                  <div className="promo-offer__shade" aria-hidden="true" />
                  <div className="promo-offer__copy">
                    <p className="promo-offer__eyebrow">{offer.eyebrow}</p>
                    <h3 id={`promo-offer-${offer.id}`} className="promo-offer__title">{offer.title}</h3>
                    <p className="promo-offer__description">{offer.description}</p>
                    <span className="promo-offer__button">{offer.buttonLabel}<ChevronRight aria-hidden="true" /></span>
                  </div>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

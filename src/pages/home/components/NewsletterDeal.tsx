import { useState, type FormEvent } from "react";
import DailyDealCard from "./DailyDealCard";
import { demoDailyDeal, demoNewsletter, type DailyDeal, type NewsletterContent } from "../data/newsletterDeal";
import "./NewsletterDeal.css";

interface NewsletterDealProps {
  newsletter?: NewsletterContent;
  deal?: DailyDeal;
}

export default function NewsletterDeal({ newsletter = demoNewsletter, deal = demoDailyDeal }: NewsletterDealProps) {
  const [subscriptionMessage, setSubscriptionMessage] = useState("");

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // The form is a static preview until a newsletter service is connected.
    setSubscriptionMessage("Newsletter sign-ups are coming soon. Please check back!");
  };

  return (
    <section className="home-section newsletter-deal" aria-labelledby="newsletter-title">
      <div className="newsletter-deal__panel">
        <div className="newsletter-deal__background" aria-hidden="true">
          <img src={newsletter.backgroundImage} alt="" loading="lazy" decoding="async" />
        </div>
        <div className="home-container">
          <div className="newsletter-deal__intro">
            <h2 id="newsletter-title">{newsletter.title}</h2>
            <p className="newsletter-deal__description">{newsletter.description}</p>
            <form className="newsletter-deal__form" onSubmit={handleSubscribe}>
              <label htmlFor="newsletter-email" className="sr-only">Your email address</label>
              <input id="newsletter-email" type="email" name="email" autoComplete="email" placeholder="Your email address" required />
              <button type="submit">{newsletter.buttonLabel}</button>
              <p className="newsletter-deal__status" role="status">{subscriptionMessage}</p>
            </form>
          </div>
          <DailyDealCard deal={deal} />
        </div>
      </div>
    </section>
  );
}

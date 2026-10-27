import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch } from "../../../redux/hooks";
import { addToCart } from "../../../redux/fetchers/shopping/shoppingSlice";
import type { DailyDeal } from "../data/newsletterDeal";

const priceFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function DailyDealCard({ deal }: { deal: DailyDeal }) {
  const dispatch = useAppDispatch();
  const [now, setNow] = useState(() => Date.now());
  const deadline = Date.parse(deal.endsAt);
  const secondsLeft = Number.isFinite(deadline) ? Math.max(0, Math.ceil((deadline - now) / 1000)) : 0;
  const expired = secondsLeft === 0;
  const saving = Math.max(0, deal.previousPrice - deal.price);
  const discount = deal.previousPrice > 0 ? Math.round((saving / deal.previousPrice) * 100) : 0;
  const rating = Math.max(0, Math.min(5, deal.rating));
  const countdown = [
    { label: "days", value: Math.floor(secondsLeft / 86400) },
    { label: "hours", value: Math.floor((secondsLeft % 86400) / 3600) },
    { label: "mins", value: Math.floor((secondsLeft % 3600) / 60) },
    { label: "secs", value: secondsLeft % 60 },
  ];

  useEffect(() => {
    if (expired) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [expired, deal.endsAt]);

  const handleAddToCart = () => {
    if (expired) return;
    dispatch(addToCart({
      productId: deal.productId,
      name: deal.name,
      variantId: deal.variantId,
      variantName: deal.variantName,
      price: deal.price,
      image: deal.image,
    }));
    toast.success("Added to cart", { description: deal.name });
  };

  return (
    <article className="deal-of-day" aria-labelledby="daily-deal-title">
      <div className="deal-of-day__visual">
        <img src={deal.image} alt={deal.imageAlt} loading="lazy" decoding="async" />
        {saving > 0 && (
          <div className="deal-of-day__saving">
            <span>Save</span>
            <strong>{priceFormatter.format(saving)}</strong>
          </div>
        )}
      </div>
      <div className="deal-of-day__details">
        <p className="deal-of-day__eyebrow">Deal of the day</p>
        <h3 id="daily-deal-title">{deal.name}</h3>
        <div className="deal-of-day__rating" role="img" aria-label={`Rated ${rating} out of 5`}>
          {Array.from({ length: 5 }, (_, index) => <Star key={index} fill={index < Math.round(rating) ? "currentColor" : "none"} aria-hidden="true" />)}
        </div>
        <p className="deal-of-day__price">
          <span><span className="sr-only">Price: </span>{priceFormatter.format(deal.price)}</span>
          {saving > 0 && <><del><span className="sr-only">Previous price: </span>{priceFormatter.format(deal.previousPrice)}</del><span className="deal-of-day__discount">{discount}% off</span></>}
        </p>
        <div className="deal-of-day__countdown" role="timer" aria-label={expired ? "Offer ended" : "Time remaining for this offer"} aria-live="off">
          {countdown.map((part) => (
            <div key={part.label}>
              <span className="deal-of-day__number">{String(part.value).padStart(2, "0")}</span>
              <span className="deal-of-day__unit">{part.label}</span>
            </div>
          ))}
        </div>
        <button type="button" className="deal-of-day__cart" onClick={handleAddToCart} disabled={expired}>
          {expired ? "Offer ended" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}

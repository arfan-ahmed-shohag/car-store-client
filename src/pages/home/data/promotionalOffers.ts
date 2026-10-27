export interface PromotionalOffer {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  buttonLabel: string;
  href: string;
}

// Every banner uses the same fields and layout for future admin-managed data.
// Offer amounts are static design placeholders.
export const demoPromotionalOffers: readonly PromotionalOffer[] = [
  {
    id: "flash-offer",
    eyebrow: "Selected car deals",
    title: "Drive More.\nSpend Less.",
    description: "Save up to $2,000 on selected cars.",
    image: "/images/hero/service-and-repair.jpg",
    imageAlt: "A red sports car in a showroom",
    buttonLabel: "Shop now",
    href: "/products",
  },
  {
    id: "fresh-arrivals",
    eyebrow: "Fresh arrivals",
    title: "Your Next Car.\nYour Everyday Escape.",
    description: "Find a drive that fits your lifestyle.",
    image: "/images/promotions/bmw-city.webp",
    imageAlt: "A silver BMW sedan on a city road",
    buttonLabel: "Shop now",
    href: "/products",
  },
  {
    id: "family-suv",
    eyebrow: "Room for every journey",
    title: "More Space.\nMore Possibilities.",
    description: "Explore our family SUV collection.",
    image: "/images/new-arrivals/mazda-cx-5-3.webp",
    imageAlt: "A white Mazda CX-5 family SUV",
    buttonLabel: "Shop now",
    href: "/products",
  },
  {
    id: "premium-collection",
    eyebrow: "From $62,000",
    title: "Premium Cars.\nExceptional Drives.",
    description: "Discover the car you've been looking for.",
    image: "/images/promotions/porsche-road.webp",
    imageAlt: "A black Porsche sedan driving on a road",
    buttonLabel: "Shop now",
    href: "/products",
  },
];

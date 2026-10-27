export interface CarCtaContent {
  title: string;
  description: string;
  image: string;
  buttonLabel: string;
  href: string;
}

export const demoCarCta: CarCtaContent = {
  title: "Let's Find Your Next Car Together",
  description: "Whether you're buying your first car or planning an upgrade, we're here to help. Share your budget, driving needs and preferences with our team, and we'll help you explore cars that fit your lifestyle.",
  image: "/images/hero/drive-your-dream.jpg",
  buttonLabel: "Contact us",
  href: "/contact",
};

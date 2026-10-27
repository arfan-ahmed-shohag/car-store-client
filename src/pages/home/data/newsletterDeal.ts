export interface NewsletterContent {
  title: string;
  description: string;
  backgroundImage: string;
  buttonLabel: string;
}

export interface DailyDeal {
  productId: string;
  name: string;
  image: string;
  imageAlt: string;
  price: number;
  previousPrice: number;
  rating: number;
  endsAt: string;
  variantId: string;
  variantName: string;
}

export const demoNewsletter: NewsletterContent = {
  title: "Subscribe to Our Newsletter!",
  description: "Be the first to hear about new arrivals, exclusive car offers and the latest updates.\nJoin our mailing list today!",
  backgroundImage: "/images/promotions/bmw-city.webp",
  buttonLabel: "Subscribe now!",
};

// Static campaign example. Replace this object with admin-managed API data later.
// The deadline is fixed so the countdown keeps its value after a page reload.
export const demoDailyDeal: DailyDeal = {
  productId: "ford-mustang",
  name: "Ford Mustang GT",
  image: "/images/new-arrivals/mustang-gt-2.webp",
  imageAlt: "A red Ford Mustang GT coupe",
  price: 89000,
  previousPrice: 94000,
  rating: 5,
  endsAt: "2027-03-13T23:59:59+06:00",
  variantId: "standard",
  variantName: "Standard",
};

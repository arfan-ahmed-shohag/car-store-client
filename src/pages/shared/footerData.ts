export const footerContent = {
  description: "Discover cars for your daily drives and weekend escapes. Browse our collection of sedans, SUVs and coupes, compare your options, and get in touch with our team to find a car that fits your lifestyle and budget.",
  address: "12/B, Dhanmondi, Dhaka 1209, Bangladesh",
  phone: "01762915294",
  email: "arfan.exprovia@gmail.com",
  whatsapp: "01615391684",
};

export const footerSocialProfiles = {
  facebook: "https://www.facebook.com/arfan.arfanahmed.73",
  linkedin: "https://www.linkedin.com/in/arfan-ahmed-shohag/",
  github: "https://github.com/arfan-ahmed-shohag",
  whatsapp: `https://wa.me/${footerContent.whatsapp.replace(/^0/, "880")}`,
};

export const footerNavigation = [
  {
    title: "Information",
    links: [
      { label: "About AutoSphere", href: "/about" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Return & Refund Policy", href: "/return-refund-policy" },
      { label: "Cancellation Policy", href: "/cancellation-policy" },
      { label: "Browse Cars", href: "/products" },
      { label: "New Arrivals", href: "/#new-arrivals" },
      { label: "Featured Cars", href: "/#featured-cars" },
      { label: "Shop by Brand", href: "/#shop-by-brand-title" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Customer Services",
    links: [
      { label: "My Account", href: "/user/profile" },
      { label: "My Orders", href: "/user/order" },
      { label: "Create an Account", href: "/registration" },
      { label: "FAQs", href: "/faq" },
      { label: "Offers & Deals", href: "/#daily-deal-title" },
      { label: "Newsletter", href: "/#newsletter-title" },
      { label: "Help & Support", href: "/contact" },
    ],
  },
];

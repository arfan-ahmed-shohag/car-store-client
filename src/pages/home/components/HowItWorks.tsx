import { Search, BarChart3, CreditCard, Truck, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../../../components/ui/button";

const steps = [
  {
    icon: Search,
    title: "Browse Cars",
    description: "Explore hundreds of verified listings and find what suits you.",
  },
  {
    icon: BarChart3,
    title: "Compare & Choose",
    description: "Compare key details like price, mileage, features & reviews.",
  },
  {
    icon: CreditCard,
    title: "Secure Payment / EMI",
    description: "Buy directly or apply for EMI through trusted financial partners.",
  },
  {
    icon: Truck,
    title: "Delivery / Pickup",
    description: "Get doorstep delivery or collect from our partner showrooms.",
  },
];

export default function HowItWorks() {
  return (
    <section className="home-section border-b border-border bg-muted/30">
      <div className="home-container">
        <div className="home-section__heading text-center">
          <p className="brand-eyebrow">Our process</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">How It Works</h2>
          <p className="mt-3 text-muted-foreground">A seamless way to buy your next car.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <div key={title} className="group relative rounded-xl border border-border bg-card p-6 transition-colors hover:border-brand/60">
              <div className="mb-6 flex items-center justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-subtle text-brand-strong">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="text-3xl font-bold text-muted-foreground/35" aria-hidden="true">0{index + 1}</span>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-card-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>

        <div className="home-section__footer flex flex-col justify-between gap-6 rounded-xl border-l-4 border-brand bg-brand-ink p-7 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h3 className="text-xl font-semibold text-white sm:text-2xl">Ready to find your perfect car?</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">Browse our collection and find a car that fits your lifestyle.</p>
          </div>
          <Button asChild size="lg" className="bg-brand text-white hover:bg-brand-hover focus-visible:ring-brand shrink-0">
            <Link to="/products">Start exploring <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

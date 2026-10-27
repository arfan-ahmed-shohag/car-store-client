import React from 'react';
import {
  Shield,
  CreditCard,
  Award,
  Truck,
  RotateCcw,
  BadgeCheck,
} from 'lucide-react';

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Shield,
    title: 'Certified Used Cars',
    description: 'All vehicles go through strict inspection and certification process.',
  },
  {
    icon: CreditCard,
    title: 'EMI & Financing Support',
    description: 'Flexible loan & EMI plans from top financial partners.',
  },
  {
    icon: Award,
    title: 'Warranty Included',
    description: 'Standard warranty available on most models.',
  },
  {
    icon: Truck,
    title: 'Home Delivery',
    description: 'Receive your car directly at your doorstep.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Return',
    description: '7-day return policy for peace of mind.',
  },
  {
    icon: BadgeCheck,
    title: 'Verified Dealers',
    description: 'Buy only from trusted and verified dealerships.',
  },
];

const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => {
  const Icon = feature.icon;

  return (
    <div className="group h-full rounded-xl border border-border bg-card p-6 transition-colors hover:border-brand/60">
      <div className="mb-4 inline-flex rounded-lg bg-brand-subtle p-3">
        <Icon className="h-6 w-6 text-brand-strong" />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-card-foreground">
        {feature.title}
      </h3>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {feature.description}
      </p>
    </div>
  );
};

export default function WhyChooseUs(): React.ReactElement {
  return (
    <section className="border-y border-border bg-muted/30 py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <p className="brand-eyebrow">The AutoSphere difference</p>
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Why Choose AutoSphere?
          </h2>
          <p className="text-muted-foreground">
            Experience a trusted way to buy your next car.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

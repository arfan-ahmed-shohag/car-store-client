import CarCollectionSection from "./CarCollectionSection";
import { demoFeaturedCars } from "../data/featuredCars";
import type { ArrivalCar } from "../data/newArrivals";

export default function FeaturedCars({ cars = demoFeaturedCars }: { cars?: readonly ArrivalCar[] }) {
  return (
    <CarCollectionSection
      id="featured-cars"
      title="Featured cars"
      description="Explore our handpicked cars for your next journey."
      cars={cars}
      badgeLabel="Featured"
      previewLabel="Featured car"
    />
  );
}

import CarCollectionSection from "./CarCollectionSection";
import { demoExploreCars } from "../data/exploreCars";
import type { ArrivalCar } from "../data/newArrivals";

export default function ExploreCars({ cars = demoExploreCars }: { cars?: readonly ArrivalCar[] }) {
  return (
    <CarCollectionSection
      id="explore-cars"
      title="Explore more cars"
      description="More cars for your everyday drives and weekend plans."
      cars={cars}
      badgeLabel="Top pick"
      previewLabel="Car details"
    />
  );
}

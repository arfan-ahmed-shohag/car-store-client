import CarCollectionSection from "./CarCollectionSection";
import { demoNewArrivals, type ArrivalCar } from "../data/newArrivals";

const NewArrivals = ({ cars = demoNewArrivals }: { cars?: readonly ArrivalCar[] }) => {
  return (
    <CarCollectionSection
      id="new-arrivals"
      title="New arrivals"
      description="Find your next drive in our latest collection."
      cars={cars}
      badgeLabel="New"
      previewLabel="New arrival"
    />
  );
};

export default NewArrivals;

import NewArrivalCard from "./NewArrivalCard";
import type { ArrivalCar } from "../data/newArrivals";
import "./CarCollection.css";

interface CarCollectionSectionProps {
  id: string;
  title: string;
  description: string;
  cars: readonly ArrivalCar[];
  badgeLabel: string;
  previewLabel: string;
}

export default function CarCollectionSection({ id, title, description, cars, badgeLabel, previewLabel }: CarCollectionSectionProps) {
  return (
    <section id={id} className="home-section car-collection" aria-labelledby={`${id}-title`}>
      <div className="home-container">
        <div className="home-section__heading car-collection__heading">
          <h2 id={`${id}-title`}>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="car-collection__grid">
          {cars.map((car) => <NewArrivalCard key={car.id} car={car} badgeLabel={badgeLabel} previewLabel={previewLabel} />)}
        </div>
      </div>
    </section>
  );
}

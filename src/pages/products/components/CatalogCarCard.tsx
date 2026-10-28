import { CalendarDays, Fuel, Gauge, Settings2 } from "lucide-react";
import NewArrivalCard from "../../home/components/NewArrivalCard";
import type { CatalogCar } from "../data/catalog";

export default function CatalogCarCard({ car }: { car: CatalogCar }) {
  return (
    <div className="catalog-card">
      <NewArrivalCard car={car} />
      <ul className="catalog-card__specs">
        <li><CalendarDays aria-hidden="true" /><span><span className="sr-only">Year: </span>{car.releaseYear}</span></li>
        <li><Gauge aria-hidden="true" /><span><span className="sr-only">Mileage: </span>{car.mileage.toLocaleString("en-US")} km</span></li>
        <li><Fuel aria-hidden="true" /><span><span className="sr-only">Fuel: </span>{car.fuelType}</span></li>
        <li><Settings2 aria-hidden="true" /><span><span className="sr-only">Transmission: </span>{car.transmission}</span></li>
      </ul>
    </div>
  );
}

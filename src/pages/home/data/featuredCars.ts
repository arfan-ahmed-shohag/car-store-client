import { demoNewArrivals, type ArrivalCar } from "./newArrivals";

const featuredCarIds = [
  "ford-mustang",
  "tesla-model-s",
  "bmw-x5",
  "audi-a4",
  "camry-hybrid",
  "mazda-cx5",
  "honda-civic",
  "hyundai-sonata",
];

// Static selection for now. Reuse product IDs so cart and wishlist stay in sync
// when a car appears in both collections. Replace this selection with API data later.
export const demoFeaturedCars: readonly ArrivalCar[] = featuredCarIds.flatMap((id) => {
  const car = demoNewArrivals.find((item) => item.id === id);
  return car ? [car] : [];
});

import { demoNewArrivals, type ArrivalCar } from "./newArrivals";

const exploreCarIds = ["mazda-cx5", "honda-civic", "tesla-model-s", "audi-a4"];

// Static selection for the next collection. Shared IDs keep shopping actions
// consistent when the same car appears elsewhere on the home page.
export const demoExploreCars: readonly ArrivalCar[] = exploreCarIds.flatMap((id) => {
  const car = demoNewArrivals.find((item) => item.id === id);
  return car ? [car] : [];
});

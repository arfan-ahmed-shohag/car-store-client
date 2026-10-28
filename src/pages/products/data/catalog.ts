import { demoNewArrivals, type ArrivalCar } from "../../home/data/newArrivals";

export interface CatalogCar extends ArrivalCar {
  brand: string;
  model: string;
  releaseYear: number;
  mileage: number;
}

// Presentation data only. Replace this array with mapped API results when wiring the catalog.
const carMetadata: Record<string, Pick<CatalogCar, "brand" | "model" | "releaseYear" | "mileage">> = {
  "camry-hybrid": { brand: "Toyota", model: "Camry Hybrid", releaseYear: 2024, mileage: 25000 },
  "bmw-x5": { brand: "BMW", model: "X5", releaseYear: 2025, mileage: 40000 },
  "tesla-model-s": { brand: "Tesla", model: "Model S", releaseYear: 2025, mileage: 12000 },
  "honda-civic": { brand: "Honda", model: "Civic Turbo", releaseYear: 2024, mileage: 18000 },
  "ford-mustang": { brand: "Ford", model: "Mustang GT", releaseYear: 2024, mileage: 15000 },
  "audi-a4": { brand: "Audi", model: "A4", releaseYear: 2025, mileage: 22000 },
  "mazda-cx5": { brand: "Mazda", model: "CX-5", releaseYear: 2024, mileage: 30000 },
  "hyundai-sonata": { brand: "Hyundai", model: "Sonata", releaseYear: 2025, mileage: 16000 },
};

export const demoCatalogCars: CatalogCar[] = demoNewArrivals.map((car) => ({ ...car, ...carMetadata[car.id] }));

export const catalogRanges = {
  price: { min: 0, max: 150000, step: 1 },
};

export interface CatalogFilters {
  minPrice: string;
  maxPrice: string;
  brand: string[];
  model: string[];
  bodyType: string[];
  fuelType: string[];
  category: string[];
  warranty: string[];
  condition: string;
  availability: string;
}

export const createCatalogFilters = (): CatalogFilters => ({
  minPrice: "", maxPrice: "", brand: [], model: [], bodyType: [], fuelType: [],
  category: [], warranty: [], condition: "", availability: "",
});

export const catalogFilterLabels: Record<keyof CatalogFilters, string> = {
  minPrice: "Min price", maxPrice: "Max price", brand: "Brand", model: "Model",
  bodyType: "Body type", fuelType: "Fuel type", category: "Category", warranty: "Warranty",
  condition: "Condition", availability: "Availability",
};

export const catalogOptions = {
  brands: ["Toyota", "BMW", "Tesla", "Honda", "Ford", "Audi", "Mazda", "Hyundai"],
  models: ["Camry Hybrid", "X5", "Model S", "Civic Turbo", "Mustang GT", "A4", "CX-5", "Sonata"],
  bodyTypes: ["Sedan", "SUV", "Hatchback", "Coupe", "Convertible"],
  fuelTypes: ["Petrol", "Diesel", "Hybrid", "Electric", "Plug-in hybrid"],
  categories: ["Family", "Luxury", "Sports", "Electric", "Hybrid"],
  warranties: ["No warranty", "1 year", "2 years", "3 years", "5 years"],
};

export const catalogSortOptions = [
  { value: "newest", label: "Newest arrivals" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "year-desc", label: "Year: newest first" },
  { value: "mileage-asc", label: "Mileage: lowest first" },
  { value: "rating-desc", label: "Highest rated" },
  { value: "name-asc", label: "Name: A to Z" },
];

export interface ArrivalVariant {
  id: string;
  name: string;
  color: string;
  images: readonly [string, ...string[]];
}

export interface ArrivalCar {
  id: string;
  // Existing API record used for details while the home collections stay static.
  detailsId?: string;
  name: string;
  price: number;
  previousPrice?: number;
  description: string;
  bodyType: string;
  fuelType: string;
  transmission: string;
  variants: readonly [ArrivalVariant, ...ArrivalVariant[]];
}

// Static design examples. USD prices and availability are placeholder data.
export const demoNewArrivals: readonly ArrivalCar[] = [
  {
    id: "camry-hybrid",
    detailsId: "691d4ebb76f1554f561fd145",
    name: "Toyota Camry Hybrid",
    price: 48500,
    previousPrice: 51500,
    description: "Comfort for your daily drive, with room for every journey.",
    bodyType: "Sedan", fuelType: "Hybrid", transmission: "Automatic",
    variants: [{ id: "standard", name: "Standard", color: "#e4e6e8", images: ["/images/new-arrivals/camry-hybrid-4.webp", "/images/new-arrivals/camry-hybrid-1.webp"] }],
  },
  {
    id: "bmw-x5",
    detailsId: "691d4fc976f1554f561fd160",
    name: "BMW X5",
    price: 125000,
    previousPrice: 132000,
    description: "A spacious SUV with a confident presence on the road.",
    bodyType: "SUV", fuelType: "Petrol", transmission: "Automatic",
    variants: [{ id: "standard", name: "Standard", color: "#202124", images: ["/images/new-arrivals/bmw-x5-3.webp", "/images/new-arrivals/bmw-x5-4.webp"] }],
  },
  {
    id: "tesla-model-s",
    detailsId: "691cdcd5c437369ed7013065",
    name: "Tesla Model S",
    price: 98000,
    previousPrice: 104000,
    description: "Electric driving with a quiet cabin and a clean, modern design.",
    bodyType: "Sedan", fuelType: "Electric", transmission: "Automatic",
    variants: [
      { id: "red", name: "Red", color: "#bd2638", images: ["/images/new-arrivals/model-s-2.webp", "/images/new-arrivals/tesla-interior.webp"] },
      { id: "silver", name: "Silver", color: "#b7bec8", images: ["/images/new-arrivals/model-s-1.webp", "/images/new-arrivals/tesla-interior.webp"] },
      { id: "black", name: "Black", color: "#202329", images: ["/images/new-arrivals/model-s-4.webp", "/images/new-arrivals/tesla-interior.webp"] },
    ],
  },
  {
    id: "honda-civic",
    detailsId: "691cd6498d81fe3bd5568504",
    name: "Honda Civic Turbo",
    price: 36500,
    previousPrice: 39000,
    description: "A sporty everyday car with a lively character and practical comfort.",
    bodyType: "Hatchback", fuelType: "Petrol", transmission: "Automatic",
    variants: [{ id: "standard", name: "Standard", color: "#eeeef0", images: ["/images/new-arrivals/civic-turbo-1.webp", "/images/new-arrivals/civic-turbo-2.webp"] }],
  },
  {
    id: "ford-mustang",
    detailsId: "691ce2f5984cf0036985fca8",
    name: "Ford Mustang GT",
    price: 89000,
    previousPrice: 94000,
    description: "Classic coupe styling for the drives you look forward to.",
    bodyType: "Coupe", fuelType: "Petrol", transmission: "Automatic",
    variants: [{ id: "standard", name: "Standard", color: "#b62332", images: ["/images/new-arrivals/mustang-gt-2.webp", "/images/new-arrivals/mustang-gt-4.webp"] }],
  },
  {
    id: "audi-a4",
    detailsId: "691d50c176f1554f561fd165",
    name: "Audi A4",
    price: 62000,
    previousPrice: 66000,
    description: "Understated style and a comfortable cabin for your next chapter.",
    bodyType: "Sedan", fuelType: "Petrol", transmission: "Automatic",
    variants: [{ id: "standard", name: "Standard", color: "#b52b31", images: ["/images/new-arrivals/audi-a4-3.webp", "/images/new-arrivals/audi-a4-2.webp"] }],
  },
  {
    id: "mazda-cx5",
    detailsId: "691d5fd976f1554f561fd1d6",
    name: "Mazda CX-5",
    price: 46000,
    previousPrice: 49000,
    description: "An SUV that makes room for family plans and weekend escapes.",
    bodyType: "SUV", fuelType: "Petrol", transmission: "Automatic",
    variants: [{ id: "standard", name: "Standard", color: "#e8e9eb", images: ["/images/new-arrivals/mazda-cx-5-3.webp", "/images/new-arrivals/mazda-cx-5-2.webp"] }],
  },
  {
    id: "hyundai-sonata",
    detailsId: "691d5d3776f1554f561fd1b0",
    name: "Hyundai Sonata",
    price: 39500,
    previousPrice: 42500,
    description: "A relaxed sedan with the space and style for everyday life.",
    bodyType: "Sedan", fuelType: "Petrol", transmission: "Automatic",
    variants: [{ id: "standard", name: "Standard", color: "#202124", images: ["/images/new-arrivals/hyundai-sonata-2.webp", "/images/new-arrivals/hyundai-sonata-4.webp"] }],
  },
];

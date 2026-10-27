import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import ProductCard from "../../products/components/ProductCard";
import type { Cars } from "../../products/Products";
import { Button } from "../../../components/ui/button";

const ReUsableHomePageCarsSection = ({ carData, header }: { carData: Cars[]; header: string }) => (
  <section className="py-16 lg:py-20">
    <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
      <div className="mb-10 text-center">
        <p className="brand-eyebrow">Explore the collection</p>
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{header}</h2>
      </div>
      {carData.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {carData.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-border px-6 py-12 text-center text-muted-foreground">
          Cars will appear here as they become available.
        </p>
      )}
      <div className="mt-9 flex justify-center">
        <Button asChild size="lg" className="bg-brand text-white hover:bg-brand-hover focus-visible:ring-brand">
          <Link to="/products">View all cars <ArrowRight className="h-4 w-4" /></Link>
        </Button>
      </div>
    </div>
  </section>
);

export default ReUsableHomePageCarsSection;

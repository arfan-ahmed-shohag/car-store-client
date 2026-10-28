import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronDown, ChevronLeft, ChevronRight, Search, SlidersHorizontal, X } from "lucide-react";
import CatalogCarCard from "./components/CatalogCarCard";
import CatalogFilterFields from "./components/CatalogFilters";
import { catalogFilterLabels, catalogSortOptions, createCatalogFilters, demoCatalogCars, type CatalogFilters } from "./data/catalog";
import "../home/components/CarCollection.css";
import "./Products.css";
import "../shared/PageHero.css";

export interface Cars {
  _id: string;
  name: string;
  brand: string;
  model: string;
  releaseYear: Date;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  color: string;
  bodyType: string;
  transmission: string;
  fuelType: string;
  engineSize: string;
  images: [string];
  mileage: string;
  features: [string];
  tags: [string];
  warranty: string;
}

const Products = () => {
  // Only control presentation state here; connect results to the API in a later step.
  const [filters, setFilters] = useState<CatalogFilters>(createCatalogFilters);
  const [drawerFilters, setDrawerFilters] = useState<CatalogFilters>(createCatalogFilters);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Cars | AutoSphere";
    window.scrollTo({ top: 0, behavior: "auto" });
    return () => { document.title = previousTitle; };
  }, []);

  const selectedFilters = (Object.keys(filters) as (keyof CatalogFilters)[]).flatMap((field) => {
    const value = filters[field];
    return (Array.isArray(value) ? value : value ? [value] : []).map((item) => ({ field, value: item }));
  });
  const resetFilters = () => setFilters(createCatalogFilters());
  const changeFiltersOpen = (open: boolean) => {
    if (open) setDrawerFilters(filters);
    setFiltersOpen(open);
  };
  const applyDrawerFilters = () => {
    setFilters(drawerFilters);
    setFiltersOpen(false);
  };
  const removeFilter = (field: keyof CatalogFilters, value: string) => {
    setFilters((current) => ({ ...current, [field]: Array.isArray(current[field]) ? current[field].filter((item) => item !== value) : "" }));
  };
  const chipLabel = (field: keyof CatalogFilters, value: string) => {
    if (field === "minPrice" || field === "maxPrice") return `${catalogFilterLabels[field]}: $${Number(value).toLocaleString("en-US")}`;
    return `${catalogFilterLabels[field]}: ${value}`;
  };

  return (
    <main className="catalog-page">
      <section className="page-hero catalog-hero" aria-labelledby="catalog-title">
        <img className="page-hero__image catalog-hero__image" src="/images/hero/service-and-repair.jpg" alt="" />
        <div className="page-hero__shade" aria-hidden="true" />
        <div className="page-hero__content">
          <p className="page-hero__eyebrow">Explore the collection</p>
          <h1 className="page-hero__title" id="catalog-title">Find your <span>next drive.</span></h1>
          <p className="page-hero__description">From everyday journeys to weekend escapes, discover a car that feels like you.</p>
        </div>
      </section>

      <div className="catalog-content">
        <div className="catalog-page__container catalog-layout">
          <aside className="catalog-sidebar" aria-labelledby="catalog-filters-title">
            <div className="catalog-sidebar__heading"><h2 id="catalog-filters-title"><SlidersHorizontal aria-hidden="true" />Filters</h2><button type="button" className="catalog-text-button" onClick={resetFilters}>Reset</button></div>
            <div className="catalog-sidebar__body"><CatalogFilterFields id="catalog-filters-desktop" filters={filters} onChange={setFilters} /></div>
          </aside>

          <section className="catalog-results" aria-labelledby="catalog-results-title">
            <form className="catalog-search" role="search" onSubmit={(event) => event.preventDefault()}>
              <div className="catalog-search__field">
                <label htmlFor="catalog-search" className="sr-only">Search cars by name, brand or model</label>
                <Search aria-hidden="true" />
                <input id="catalog-search" type="search" name="searchTerm" placeholder="Search by car name, brand or model" value={searchText} onChange={(event) => setSearchText(event.target.value)} />
                {searchText && <button type="button" className="catalog-search__clear" aria-label="Clear search" onClick={() => setSearchText("")}><X aria-hidden="true" /></button>}
              </div>
              <button type="submit" className="catalog-button">Search</button>
            </form>

            <div className="catalog-toolbar">
              <div className="catalog-toolbar__heading"><h2 id="catalog-results-title">All cars</h2><p>{demoCatalogCars.length} cars to explore</p></div>
              <div className="catalog-toolbar__controls">
                <Dialog.Root open={filtersOpen} onOpenChange={changeFiltersOpen}>
                  <Dialog.Trigger asChild><button type="button" className="catalog-mobile-filters"><SlidersHorizontal aria-hidden="true" />Filters{selectedFilters.length > 0 && <span>{selectedFilters.length}</span>}</button></Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="catalog-drawer__overlay" />
                    <Dialog.Content className="catalog-drawer">
                      <div className="catalog-drawer__heading"><Dialog.Title>Filters</Dialog.Title><Dialog.Close className="catalog-drawer__close" aria-label="Close filters"><X aria-hidden="true" /></Dialog.Close></div>
                      <Dialog.Description className="sr-only">Choose the car details and price range you’re interested in.</Dialog.Description>
                      <div className="catalog-drawer__body"><CatalogFilterFields id="catalog-filters-mobile" filters={drawerFilters} onChange={setDrawerFilters} onApply={applyDrawerFilters} /></div>
                      <div className="catalog-drawer__footer"><button type="button" className="catalog-drawer__reset" onClick={() => setDrawerFilters(createCatalogFilters())}>Reset all</button><button type="submit" form="catalog-filters-mobile" className="catalog-button">Apply filters</button></div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
                <label className="catalog-toolbar__select" htmlFor="catalog-sort">Sort by<span className="catalog-select"><select id="catalog-sort" name="sortBy" value={sortBy} onChange={(event) => setSortBy(event.target.value)}><option value="default">Default order</option>{catalogSortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><ChevronDown aria-hidden="true" /></span></label>
              </div>
            </div>

            {selectedFilters.length > 0 && (
              <div className="catalog-selected" role="group" aria-label="Selected filters">
                <div className="catalog-selected__chips">{selectedFilters.map(({ field, value }) => <button type="button" key={`${field}-${value}`} aria-label={`Remove ${chipLabel(field, value)}`} onClick={() => removeFilter(field, value)}>{chipLabel(field, value)}<X aria-hidden="true" /></button>)}</div>
                <button type="button" className="catalog-text-button" onClick={resetFilters}>Clear all</button>
              </div>
            )}

            <div className="catalog-grid">{demoCatalogCars.map((car) => <CatalogCarCard key={car.id} car={car} />)}</div>

            <div className="catalog-results__footer">
              <p>Showing <strong>1–{demoCatalogCars.length}</strong> of <strong>{demoCatalogCars.length}</strong> cars</p>
              <nav className="catalog-pagination" aria-label="Catalog pagination"><button type="button" disabled aria-label="Previous page"><ChevronLeft aria-hidden="true" /></button><button type="button" aria-current="page" aria-label="Page 1">1</button><button type="button" disabled aria-label="Next page"><ChevronRight aria-hidden="true" /></button></nav>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Products;

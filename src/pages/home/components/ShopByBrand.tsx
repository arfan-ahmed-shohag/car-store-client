import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type TouchEvent } from "react";
import "./ShopByBrand.css";

export interface ShopBrand {
  id: string;
  name: string;
  logo: string;
  logoScale?: number;
}

const staticBrands: ShopBrand[] = [
  { id: "toyota", name: "Toyota", logo: "/images/brands/toyota.png", logoScale: 0.73 },
  { id: "tesla", name: "Tesla", logo: "/images/brands/tesla.png", logoScale: 1.16 },
  { id: "audi", name: "Audi", logo: "/images/brands/audi.png", logoScale: 0.72 },
  { id: "bmw", name: "BMW", logo: "/images/brands/bmw.png", logoScale: 1.15 },
  { id: "honda", name: "Honda", logo: "/images/brands/honda.png", logoScale: 0.75 },
  { id: "ford", name: "Ford", logo: "/images/brands/ford.png", logoScale: 0.73 },
  { id: "hyundai", name: "Hyundai", logo: "/images/brands/hyundai.png", logoScale: 0.74 },
  { id: "mercedes-benz", name: "Mercedes-Benz", logo: "/images/brands/mercedes-benz.png", logoScale: 0.82 },
];

export default function ShopByBrand({ brands = staticBrands }: { brands?: ShopBrand[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [perView, setPerView] = useState(7);
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(brands.length / perView));
  const currentPage = Math.min(page, pageCount - 1);
  const firstVisible = Math.min(currentPage * perView, Math.max(0, brands.length - perView));

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const updateLayout = () => {
      const count = Number(getComputedStyle(viewport).getPropertyValue("--brands-per-view")) || 7;
      setPerView(count);
      setPage((current) => Math.min(current, Math.max(0, Math.ceil(brands.length / count) - 1)));
    };

    const observer = new ResizeObserver(updateLayout);
    observer.observe(viewport);
    updateLayout();
    return () => observer.disconnect();
  }, [brands.length]);

  const changePage = (direction: number) => {
    setPage(Math.min(Math.max(0, currentPage + direction), pageCount - 1));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      changePage(event.key === "ArrowRight" ? 1 : -1);
    }
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const end = event.changedTouches[0];
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || !end) return;

    const distanceX = start.x - end.clientX;
    const distanceY = start.y - end.clientY;
    if (Math.abs(distanceX) > 50 && Math.abs(distanceX) > Math.abs(distanceY)) {
      changePage(distanceX > 0 ? 1 : -1);
    }
  };

  return (
    <section className="home-section shop-by-brand" aria-labelledby="shop-by-brand-title" onKeyDown={handleKeyDown}>
      <div className="home-container shop-by-brand__container">
        <h2 id="shop-by-brand-title" className="home-section__heading shop-by-brand__title">Shop by brand</h2>

        <div className="shop-by-brand__slider">
          <div
            id="shop-by-brand-carousel"
            ref={viewportRef}
            className="shop-by-brand__viewport"
            role="group"
            aria-roledescription="carousel"
            aria-label="Car brands"
            tabIndex={0}
            onTouchStart={(event) => {
              const touch = event.touches[0];
              if (touch) touchStart.current = { x: touch.clientX, y: touch.clientY };
            }}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={() => { touchStart.current = null; }}
          >
            <ul
              className="shop-by-brand__track"
              style={{ transform: `translateX(calc(-${firstVisible} * (100% + 15px) / ${perView}))` }}
            >
              {brands.map((brand, index) => (
                <li
                  key={brand.id}
                  className="shop-by-brand__item"
                  style={{ "--brand-logo-scale": brand.logoScale ?? 1 } as CSSProperties}
                  aria-hidden={index < firstVisible || index >= firstVisible + perView}
                >
                  <div className="shop-by-brand__image">
                    <img src={brand.logo} alt={`${brand.name} logo`} width={385} height={256} loading="lazy" draggable={false} />
                  </div>
                  <h3 className="shop-by-brand__name">{brand.name}</h3>
                </li>
              ))}
            </ul>
          </div>
          {pageCount > 1 && (
            <>
              <button
                type="button"
                className="shop-by-brand__arrow shop-by-brand__arrow--previous"
                aria-label="Previous brands"
                aria-controls="shop-by-brand-carousel"
                disabled={currentPage === 0}
                onClick={() => changePage(-1)}
              >
                <ChevronLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                className="shop-by-brand__arrow shop-by-brand__arrow--next"
                aria-label="Next brands"
                aria-controls="shop-by-brand-carousel"
                disabled={currentPage === pageCount - 1}
                onClick={() => changePage(1)}
              >
                <ChevronRight aria-hidden="true" />
              </button>
            </>
          )}
        </div>

        {pageCount > 1 && (
          <div className="shop-by-brand__pagination" role="group" aria-label="Choose brand page">
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                type="button"
                className="shop-by-brand__dot"
                aria-label={`Show brand page ${index + 1}`}
                aria-controls="shop-by-brand-carousel"
                aria-current={currentPage === index ? "true" : undefined}
                onClick={() => setPage(index)}
              >
                <span aria-hidden="true" />
              </button>
            ))}
          </div>
        )}
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Showing brands {brands.length ? firstVisible + 1 : 0} to {Math.min(firstVisible + perView, brands.length)} of {brands.length}
        </p>
      </div>
    </section>
  );
}

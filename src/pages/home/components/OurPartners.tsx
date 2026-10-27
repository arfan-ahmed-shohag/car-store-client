interface Brand {
  id: number;
  name: string;
  logo: string;
}

const OurPartners = ({ brands }: { brands: Brand[] }) => (
  <section className="overflow-hidden border-t border-border bg-muted/30 py-16 lg:py-20">
    <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
      <div className="mb-10 text-center">
        <p className="brand-eyebrow">The brands you love</p>
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Our Partners</h2>
        <p className="mt-3 text-muted-foreground">Trusted automotive brands around the world.</p>
      </div>
      <div className="overflow-hidden rounded-xl">
        <div className="brand-marquee flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1 ? true : undefined} className="flex shrink-0 gap-4 pr-4">
              {brands.map((brand) => (
                <div key={brand.id} className="flex h-28 w-36 shrink-0 flex-col items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white p-4">
                  <img
                    src={brand.logo}
                    alt=""
                    loading="lazy"
                    className="h-12 max-w-full object-contain"
                    onError={(event) => { event.currentTarget.style.display = "none"; }}
                  />
                  <span className="text-xs font-semibold text-zinc-700">{brand.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default OurPartners;

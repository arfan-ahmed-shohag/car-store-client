import { catalogOptions, catalogRanges, type CatalogFilters } from "../data/catalog";
import CatalogFilterGroup from "./CatalogFilterGroup";
import CatalogRangeFilter from "./CatalogRangeFilter";

type MultiFilter = "brand" | "model" | "bodyType" | "fuelType" | "category" | "warranty";

interface Props {
  id: string;
  filters: CatalogFilters;
  onChange: (filters: CatalogFilters) => void;
  onApply?: () => void;
}

export default function CatalogFilterFields({ id, filters, onChange, onApply }: Props) {
  function update<Key extends keyof CatalogFilters>(field: Key, value: CatalogFilters[Key]) {
    onChange({ ...filters, [field]: value });
  }

  const toggle = (field: MultiFilter, value: string) => {
    const selected = filters[field];
    update(field, selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]);
  };

  const options = (field: MultiFilter, choices: string[]) => (
    <div className="catalog-filter__options">
      {choices.map((choice) => (
        <label className="catalog-filter__option" key={choice}>
          <input type="checkbox" name={field} value={choice} checked={filters[field].includes(choice)} onChange={() => toggle(field, choice)} />
          <span>{choice}</span>
        </label>
      ))}
    </div>
  );

  return (
    <form id={id} className="catalog-filter-form" noValidate onSubmit={(event) => { event.preventDefault(); onApply?.(); }}>
      <CatalogFilterGroup title="Price range" defaultOpen>
        <CatalogRangeFilter
          id={`${id}-price`}
          label="price"
          {...catalogRanges.price}
          names={["minPrice", "maxPrice"]}
          values={[filters.minPrice, filters.maxPrice]}
          prefix="$"
          onChange={([minPrice, maxPrice]) => onChange({ ...filters, minPrice, maxPrice })}
        />
      </CatalogFilterGroup>
      <CatalogFilterGroup title="Availability" defaultOpen>
        <div className="catalog-filter__options">
          {[{ value: "", label: "All cars" }, { value: "In stock", label: "In stock" }, { value: "Out of stock", label: "Out of stock" }].map((choice) => <label className="catalog-filter__option" key={choice.label}><input type="radio" name="availability" value={choice.value} checked={filters.availability === choice.value} onChange={() => update("availability", choice.value)} /><span>{choice.label}</span></label>)}
        </div>
      </CatalogFilterGroup>
      <CatalogFilterGroup title="Brand" defaultOpen>
        {options("brand", catalogOptions.brands)}
      </CatalogFilterGroup>
      <CatalogFilterGroup title="Models" defaultOpen>
        {options("model", catalogOptions.models)}
      </CatalogFilterGroup>
      <CatalogFilterGroup title="Body type" defaultOpen>
        {options("bodyType", catalogOptions.bodyTypes)}
      </CatalogFilterGroup>
      <CatalogFilterGroup title="Fuel type">
        {options("fuelType", catalogOptions.fuelTypes)}
      </CatalogFilterGroup>
      <CatalogFilterGroup title="Category">
        {options("category", catalogOptions.categories)}
      </CatalogFilterGroup>
      <CatalogFilterGroup title="Warranty">
        {options("warranty", catalogOptions.warranties)}
      </CatalogFilterGroup>
      <CatalogFilterGroup title="Condition">
        <div className="catalog-filter__options">
          {[{ value: "", label: "Any condition" }, { value: "New", label: "New" }, { value: "Used", label: "Used" }].map((choice) => <label className="catalog-filter__option" key={choice.label}><input type="radio" name="condition" value={choice.value} checked={filters.condition === choice.value} onChange={() => update("condition", choice.value)} /><span>{choice.label}</span></label>)}
        </div>
      </CatalogFilterGroup>
    </form>
  );
}

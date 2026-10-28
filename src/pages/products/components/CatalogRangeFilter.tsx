import { useEffect, useState } from "react";
import { ConfigProvider, Slider, type ThemeConfig } from "antd";

const sliderTheme: ThemeConfig = {
  token: { colorPrimary: "#f57c1f", colorPrimaryBorderHover: "#f57c1f", colorBgElevated: "#fff" },
  components: {
    Slider: {
      railSize: 6, handleSize: 12, handleSizeHover: 12,
      railBg: "var(--catalog-border)", railHoverBg: "var(--catalog-border)",
      trackBg: "#f57c1f", trackHoverBg: "#f57c1f",
      handleColor: "#f57c1f", handleActiveColor: "#f57c1f",
      handleActiveOutlineColor: "rgba(245, 124, 31, 0.15)",
    },
  },
};

interface Props {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  names: [string, string];
  values: [string, string];
  prefix?: string;
  suffix?: string;
  onChange: (values: [string, string]) => void;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function CatalogRangeFilter({ id, label, min, max, step, names, values, prefix = "", suffix = "", onChange }: Props) {
  const lower = clamp(values[0] === "" ? min : Number(values[0]), min, max);
  const upper = clamp(values[1] === "" ? max : Number(values[1]), lower, max);
  const [drafts, setDrafts] = useState<[string, string]>([String(lower), String(upper)]);

  useEffect(() => { setDrafts([String(lower), String(upper)]); }, [lower, upper]);

  const updateRange = (nextLower: number, nextUpper: number) => {
    setDrafts([String(nextLower), String(nextUpper)]);
    onChange([nextLower === min ? "" : String(nextLower), nextUpper === max ? "" : String(nextUpper)]);
  };

  const commitInput = (index: 0 | 1) => {
    const fallback = index === 0 ? min : max;
    const entered = drafts[index].trim() === "" ? fallback : Number(drafts[index]);
    const value = Number.isFinite(entered) ? Math.round(entered / step) * step : fallback;
    if (index === 0) updateRange(clamp(value, min, upper), upper);
    else updateRange(lower, clamp(value, lower, max));
  };

  const editInput = (index: 0 | 1, text: string) => {
    const value = Number(text);
    const valid = text.trim() !== "" && Number.isFinite(value) && value % step === 0 && value >= min && value <= max;
    if (valid && index === 0 && value <= upper) updateRange(value, upper);
    else if (valid && index === 1 && value >= lower) updateRange(lower, value);
    else setDrafts((current) => index === 0 ? [text, current[1]] : [current[0], text]);
  };

  const formatValue = (value: number) => `${prefix}${value.toLocaleString("en-US")}${suffix ? ` ${suffix}` : ""}`;

  return (
    <div className="catalog-range" data-range={id}>
      <ConfigProvider theme={sliderTheme}>
        <Slider
          className="catalog-range__slider"
          range
          min={min}
          max={max}
          step={step}
          value={[lower, upper]}
          onChange={([nextLower, nextUpper]) => updateRange(Math.min(nextLower, nextUpper), Math.max(nextLower, nextUpper))}
          tooltip={{ open: false }}
          ariaLabelForHandle={[`Minimum ${label}`, `Maximum ${label}`]}
          ariaValueTextFormatterForHandle={[formatValue, formatValue]}
        />
      </ConfigProvider>
      <div className="catalog-range__values">
        {([0, 1] as const).map((index) => (
          <label className="catalog-range__field" data-prefix={Boolean(prefix)} data-suffix={Boolean(suffix)} key={names[index]}>
            <span className="sr-only">{index === 0 ? "Minimum" : "Maximum"} {label}</span>
            {prefix && <span className="catalog-range__prefix" aria-hidden="true">{prefix}</span>}
            <input
              id={`${id}-${index === 0 ? "min" : "max"}`}
              name={names[index]}
              type="number"
              inputMode="numeric"
              min={min}
              max={max}
              step={step}
              value={drafts[index]}
              onChange={(event) => editInput(index, event.target.value)}
              onBlur={() => commitInput(index)}
              onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); event.currentTarget.blur(); } }}
            />
            {suffix && <span className="catalog-range__suffix" aria-hidden="true">{suffix}</span>}
          </label>
        ))}
      </div>
    </div>
  );
}

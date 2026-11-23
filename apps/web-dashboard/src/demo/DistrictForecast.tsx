import { useTranslation } from "../i18n";
import { useState, type FormEvent } from "react";

const scenarios = {
  Gampaha: { flood_depth_m: 0.8, population_per_km2: 1200, area_km2: 2, rain_mm: 90 },
  Kalutara: { flood_depth_m: 1.2, population_per_km2: 640, area_km2: 3, rain_mm: 120 },
  Batticaloa: { flood_depth_m: 0.5, population_per_km2: 480, area_km2: 4, rain_mm: 80 },
};
type District = keyof typeof scenarios;
type Estimate = { district: string; people: number; meal_packs: number; clean_water_litres: number; exposed_fraction: number };
const fields = [
  { key: "flood_depth_m", label: "Flood depth (m)", min: 0, max: 10, step: 0.1 },
  { key: "population_per_km2", label: "Population density (people per km²)", min: 1, max: 100000, step: 1 },
  { key: "area_km2", label: "Area in scope (km²)", min: 0.1, max: 10000, step: 0.1 },
  { key: "rain_mm", label: "Rain forecast for next 24 hours (mm)", min: 0, max: 2000, step: 1 },
  { key: "meals_per_person", label: "Meal packs per person per day", min: 1, max: 20, step: 1 },
  { key: "litres_per_person", label: "Clean water litres per person per day", min: 0.1, max: 100, step: 0.1 },
] as const;

export function DistrictForecast() {
  const { language, t } = useTranslation();
  const [district, setDistrict] = useState<District>("Gampaha");
  const [result, setResult] = useState<Estimate>();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const defaults = { ...scenarios[district], meals_per_person: 3, litres_per_person: 4 };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setResult(undefined);
    setError("");
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/forecast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ district, ...Object.fromEntries(fields.map(({ key }) => [key, Number(data.get(key))])) }),
      });
      if (!response.ok || !response.headers.get("content-type")?.includes("application/json")) {
        throw new Error("Start the local forecast service and check that all inputs are within range.");
      }
      setResult(await response.json() as Estimate);
    } catch (failure) {
      setError((failure as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="human-panel">
      <h2>{t("24-hour food and water estimate")}</h2>
      <p>{t("Scenario planner with sample data and illustrative assumptions.")}</p>
      <form className="human-form" onSubmit={submit}>
        <label>{t("District")}
          <select value={district} disabled={busy} onChange={(event) => { setDistrict(event.target.value as District); setResult(undefined); }}>
            {Object.keys(scenarios).map((name) => <option key={name} value={name}>{t(name)}</option>)}
          </select>
        </label>
        {fields.map(({ key, label, min, max, step }) => (
          <label key={`${district}-${key}`}>{t(label)}
            <input required name={key} type="number" min={min} max={max} step={step} defaultValue={defaults[key]} />
          </label>
        ))}
        <button className="primary" disabled={busy}>{t("Estimate district demand")}</button>
      </form>
      {error && <p role="alert">{t(error)}</p>}
      {result && <div className="human-card shelter-detail" aria-live="polite">
        <h3>{t(result.district)}</h3>
        <dl className="facility-list">
          <div><dt>{t("Estimated people affected")}</dt><dd>{result.people.toLocaleString(language)}</dd></div>
          <div><dt>{t("Meal packs")}</dt><dd>{result.meal_packs.toLocaleString(language)}</dd></div>
          <div><dt>{t("Clean water (litres)")}</dt><dd>{result.clean_water_litres.toLocaleString(language)}</dd></div>
          <div><dt>{t("Estimated exposed share")}</dt><dd>{Math.round(result.exposed_fraction * 100)}%</dd></div>
        </dl>
      </div>}
    </section>
  );
}

import { useTranslation } from "../i18n";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { MapPin } from "lucide-react";
import { drawMap, project, type BoundaryData, type Point } from "../DisasterMap";
import { demoRequest } from "./api";
import { ShelterNeeds } from "./ShelterNeeds";

export type Shelter = {
  id: string;
  name: string;
  district: string;
  point: Point;
  verified: boolean;
  facilities: Record<string, string>;
  auditedAt: string | null;
  capacity: number;
  occupancy: number;
};

const facilities = [
  ["water", "Drinking water"], ["generator", "Backup generator"], ["sanitation", "Sanitation and toilets"],
  ["kitchen", "Communal kitchen"], ["medical", "Medical post"], ["accessibility", "Wheelchair access"],
];
const readiness: Record<string, string> = { READY: "Ready", UNAVAILABLE: "Unavailable", UNKNOWN: "Unconfirmed" };

const home = { x: 0, y: 0, zoom: 1 };

function ShelterMap({ shelters, selected, onSelect }: {
  shelters: Shelter[];
  selected?: string;
  onSelect: (id: string) => void;
}) {
  const { t } = useTranslation();
  const frame = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [boundaries, setBoundaries] = useState<BoundaryData>();
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [error, setError] = useState(false);
  const { width, height } = size;

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${import.meta.env.BASE_URL}maps/sri-lanka.json`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Map is unavailable");
        return response.json() as Promise<BoundaryData>;
      })
      .then(setBoundaries)
      .catch(() => { if (!controller.signal.aborted) setError(true); });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    const resize = new ResizeObserver(([{ contentRect }]) => {
      setSize({ width: contentRect.width, height: contentRect.height });
    });
    resize.observe(element);
    return () => resize.disconnect();
  }, []);

  useEffect(() => {
    if (width < 100 || height < 100 || !boundaries || !canvas.current) return;
    const points = shelters.map(({ point }) => project(point, width, height, home));
    drawMap(canvas.current, boundaries, width, height, home, points, t);
  }, [boundaries, width, height, shelters, t]);

  return (
    <div className="disaster-viewport shelter-map" ref={frame} role="group" aria-label={t("Verified shelters in Sri Lanka")}>
      <canvas ref={canvas} aria-hidden="true" />
      {!boundaries && <span className="disaster-map-notice" role="status">{t(error ? "Shelter map unavailable" : "Loading shelter map…")}</span>}
      {boundaries && width > 0 && shelters.map((shelter) => {
        const [left, top] = project(shelter.point, width, height, home);
        return (
          <button type="button" key={shelter.id} className="shelter-marker" style={{ left, top }}
            title={t(shelter.name)} aria-label={t(shelter.name)} aria-pressed={selected === shelter.id}
            onClick={() => onSelect(shelter.id)}>
            <MapPin size={18} aria-hidden="true" />
          </button>
        );
      })}
      <a className="disaster-map-credit" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">{t("© OpenStreetMap contributors")}</a>
    </div>
  );
}

function FacilityAudit({ shelter, operator, onUpdate }: {
  shelter: Shelter;
  operator?: string;
  onUpdate: (shelter: Shelter) => void;
}) {
  const { language, t } = useTranslation();
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const values = Object.fromEntries(new FormData(event.currentTarget));
    try {
      onUpdate(await demoRequest<Shelter>("shelters/audit", { token: operator, body: { id: shelter.id, facilities: values } }));
      setEditing(false);
    } catch (failure) {
      setError((failure as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <h4>{t("Facility readiness")}</h4>
      {shelter.auditedAt && <small>{t("Last checked {date}", { date: new Date(shelter.auditedAt).toLocaleString(language, { timeZone: "Asia/Colombo" }) })}</small>}
      {editing ? (
        <form className="human-form" onSubmit={submit}>
          {facilities.map(([key, label]) => (
            <label key={key}>{t(label)}
              <select name={key} defaultValue={shelter.facilities[key]}>
                {Object.entries(readiness).map(([value, text]) => <option key={value} value={value}>{t(text)}</option>)}
              </select>
            </label>
          ))}
          {error && <p role="alert">{t(error)}</p>}
          <div className="human-actions">
            <button className="primary" disabled={busy}>{t("Save facility audit")}</button>
            <button type="button" className="human-action" disabled={busy} onClick={() => setEditing(false)}>{t("Cancel")}</button>
          </div>
        </form>
      ) : (
        <>
          <dl className="facility-list">
            {facilities.map(([key, label]) => <div key={key}><dt>{t(label)}</dt><dd>{t(readiness[shelter.facilities[key]])}</dd></div>)}
          </dl>
          {operator && <button type="button" className="human-action" onClick={() => { setError(""); setEditing(true); }}>{t("Audit facilities")}</button>}
        </>
      )}
    </div>
  );
}

export function ShelterDirectory({ operator }: { operator?: string }) {
  const { t } = useTranslation();
  const [shelters, setShelters] = useState<Shelter[]>();
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const [live, setLive] = useState(false);

  useEffect(() => {
    let receivedSnapshot = false;
    demoRequest<Shelter[]>("shelters").then(
      (rows) => { if (!receivedSnapshot) setShelters(rows); },
      (failure: Error) => { if (!receivedSnapshot) setError(failure.message); },
    );
    const events = new EventSource("/api/demo/shelters/events");
    events.onmessage = ({ data }) => {
      receivedSnapshot = true;
      setShelters(JSON.parse(data) as Shelter[]);
      setLive(true);
      setError("");
    };
    events.onerror = () => setLive(false);
    return () => { receivedSnapshot = true; events.close(); };
  }, []);

  const shelter = shelters?.find(({ id }) => id === selected) ?? shelters?.[0];

  function onUpdate(updated: Shelter) {
    setShelters((current) => current?.map((row) => row.id === updated.id ? updated : row));
  }

  return (
    <section className="human-panel" aria-labelledby="shelter-title">
      <h2 id="shelter-title">{t("Verified evacuation shelters")}</h2>
      <p>{t(live ? "Live occupancy updates connected" : "Waiting for live occupancy updates")}</p>
      {error && <p role="alert">{t(error)}</p>}
      {!error && !shelters && <p role="status">{t("Loading shelters…")}</p>}
      {shelters && (
        <div className="shelter-layout">
          <ShelterMap shelters={shelters} selected={shelter?.id} onSelect={setSelected} />
          <div>
            <ul className="shelter-choices">
              {shelters.map(({ id, name, district }) => (
                <li key={id}>
                  <button type="button" className="human-action" aria-pressed={shelter?.id === id} onClick={() => setSelected(id)}>
                    <MapPin size={16} aria-hidden="true" /><span><strong>{t(name)}</strong><br />{t(district)}</span>
                  </button>
                </li>
              ))}
            </ul>
            {shelter && <article className="human-card shelter-detail">
              <h3>{t(shelter.name)}</h3>
              <p>{t(shelter.district)} · {t("Verified shelter")}</p>
              <Occupancy key={shelter.id} shelter={shelter} operator={operator} onUpdate={onUpdate} />
              <FacilityAudit key={shelter.id} shelter={shelter} operator={operator} onUpdate={onUpdate} />
              {operator && <ShelterNeeds key={shelter.id} shelter={shelter} operator={operator} />}
            </article>}
          </div>
        </div>
      )}
    </section>
  );
}

function Occupancy({ shelter, operator, onUpdate }: {
  shelter: Shelter;
  operator?: string;
  onUpdate: (shelter: Shelter) => void;
}) {
  const { t } = useTranslation();
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const free = shelter.capacity - shelter.occupancy;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    const data = new FormData(event.currentTarget);
    try {
      onUpdate(await demoRequest<Shelter>("shelters/occupancy", {
        token: operator,
        body: { id: shelter.id, capacity: Number(data.get("capacity")), occupancy: Number(data.get("occupancy")) },
      }));
      setEditing(false);
    } catch (failure) {
      setError((failure as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relief-progress">
      <h4>{t("Occupancy")}</h4>
      <progress max={shelter.capacity} value={Math.min(shelter.capacity, shelter.occupancy)} aria-label={t("Shelter occupancy")} />
      <p>{t("{used} of {capacity} places occupied", { used: shelter.occupancy, capacity: shelter.capacity })} · {free < 0 ? t("{count} over capacity", { count: -free }) : t("{count} available", { count: free })}</p>
      {editing ? (
        <form className="human-form" onSubmit={submit}>
          <label>{t("Capacity")}<input required name="capacity" type="number" min="1" max="100000" defaultValue={shelter.capacity} /></label>
          <label>{t("Current occupancy")}<input required name="occupancy" type="number" min="0" max="100000" defaultValue={shelter.occupancy} /></label>
          {error && <p role="alert">{t(error)}</p>}
          <div className="human-actions">
            <button className="primary" disabled={busy}>{t("Save occupancy")}</button>
            <button type="button" className="human-action" disabled={busy} onClick={() => setEditing(false)}>{t("Cancel")}</button>
          </div>
        </form>
      ) : operator && <button type="button" className="human-action" onClick={() => { setError(""); setEditing(true); }}>{t("Update occupancy")}</button>}
    </div>
  );
}

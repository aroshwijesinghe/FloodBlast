import { useEffect, useRef, useState, type FormEvent } from "react";
import { MapPin } from "lucide-react";
import { drawMap, project, type BoundaryData, type Point } from "../DisasterMap";
import { demoRequest } from "./api";

export type Shelter = {
  id: string;
  name: string;
  district: string;
  point: Point;
  verified: boolean;
  facilities: Record<string, string>;
  auditedAt: string | null;
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
    drawMap(canvas.current, boundaries, width, height, home, points);
  }, [boundaries, width, height, shelters]);

  return (
    <div className="disaster-viewport shelter-map" ref={frame} role="group" aria-label="Verified shelters in Sri Lanka">
      <canvas ref={canvas} aria-hidden="true" />
      {!boundaries && <span className="disaster-map-notice" role="status">{error ? "Shelter map unavailable" : "Loading shelter map…"}</span>}
      {boundaries && width > 0 && shelters.map((shelter) => {
        const [left, top] = project(shelter.point, width, height, home);
        return (
          <button type="button" key={shelter.id} className="shelter-marker" style={{ left, top }}
            title={shelter.name} aria-label={shelter.name} aria-pressed={selected === shelter.id}
            onClick={() => onSelect(shelter.id)}>
            <MapPin size={18} aria-hidden="true" />
          </button>
        );
      })}
      <a className="disaster-map-credit" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap contributors</a>
    </div>
  );
}

function FacilityAudit({ shelter, operator, onUpdate }: {
  shelter: Shelter;
  operator?: string;
  onUpdate: (shelter: Shelter) => void;
}) {
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
      <h4>Facility readiness</h4>
      {shelter.auditedAt && <small>Last checked {new Date(shelter.auditedAt).toLocaleString(undefined, { timeZone: "Asia/Colombo" })}</small>}
      {editing ? (
        <form className="human-form" onSubmit={submit}>
          {facilities.map(([key, label]) => (
            <label key={key}>{label}
              <select name={key} defaultValue={shelter.facilities[key]}>
                {Object.entries(readiness).map(([value, text]) => <option key={value} value={value}>{text}</option>)}
              </select>
            </label>
          ))}
          {error && <p role="alert">{error}</p>}
          <div className="human-actions">
            <button className="primary" disabled={busy}>Save facility audit</button>
            <button type="button" className="human-action" disabled={busy} onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <dl className="facility-list">
            {facilities.map(([key, label]) => <div key={key}><dt>{label}</dt><dd>{readiness[shelter.facilities[key]]}</dd></div>)}
          </dl>
          {operator && <button type="button" className="human-action" onClick={() => { setError(""); setEditing(true); }}>Audit facilities</button>}
        </>
      )}
    </div>
  );
}

export function ShelterDirectory({ operator }: { operator?: string }) {
  const [shelters, setShelters] = useState<Shelter[]>();
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    demoRequest<Shelter[]>("shelters").then(setShelters, (failure: Error) => setError(failure.message));
  }, []);

  const shelter = shelters?.find(({ id }) => id === selected) ?? shelters?.[0];

  function onUpdate(updated: Shelter) {
    setShelters((current) => current?.map((row) => row.id === updated.id ? updated : row));
  }

  return (
    <section className="human-panel" aria-labelledby="shelter-title">
      <h2 id="shelter-title">Verified evacuation shelters</h2>
      {error && <p role="alert">{error}</p>}
      {!error && !shelters && <p role="status">Loading shelters…</p>}
      {shelters && (
        <div className="shelter-layout">
          <ShelterMap shelters={shelters} selected={shelter?.id} onSelect={setSelected} />
          <div>
            <ul className="shelter-choices">
              {shelters.map(({ id, name, district }) => (
                <li key={id}>
                  <button type="button" className="human-action" aria-pressed={shelter?.id === id} onClick={() => setSelected(id)}>
                    <MapPin size={16} aria-hidden="true" /><span><strong>{name}</strong><br />{district}</span>
                  </button>
                </li>
              ))}
            </ul>
            {shelter && <article className="human-card shelter-detail">
              <h3>{shelter.name}</h3>
              <p>{shelter.district} · Verified shelter</p>
              <FacilityAudit key={shelter.id} shelter={shelter} operator={operator} onUpdate={onUpdate} />
            </article>}
          </div>
        </div>
      )}
    </section>
  );
}

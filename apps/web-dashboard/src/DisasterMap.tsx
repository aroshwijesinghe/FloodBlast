import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { AlertTriangle, Crosshair, Minus, Mountain, Plus, Waves } from "lucide-react";
import "./disaster-map.css";

type Point = [number, number];
type Polygon = Point[][];
type Geometry =
  | { type: "Polygon"; coordinates: Polygon }
  | { type: "MultiPolygon"; coordinates: Polygon[] };
type BoundaryData = { features: { geometry: Geometry }[] };
type Incident = { id: string; detail: string; status: string };
type MapView = { zoom: number; x: number; y: number };

const hazardTypes = {
  river: { label: "River overflow", icon: Waves },
  flood: { label: "Flooding", icon: AlertTriangle },
  slope: { label: "Landslide", icon: Mountain },
} as const;
type HazardType = keyof typeof hazardTypes;

const hazards: { id: string; place: string; name: string; type: HazardType; point: Point }[] = [
  { id: "INC-101", place: "Kelani River · Gampaha", name: "River overflow", type: "river", point: [80.015, 6.955] },
  { id: "INC-102", place: "Kalutara", name: "Road flooding", type: "flood", point: [79.991, 6.585] },
  { id: "INC-103", place: "Badulla", name: "Landslide", type: "slope", point: [81.056, 6.989] },
  { id: "INC-104", place: "Batticaloa", name: "Flash flooding", type: "flood", point: [81.692, 7.717] },
];
const cities: [string, Point][] = [
  ["Colombo", [79.861, 6.927]],
  ["Kandy", [80.636, 7.290]],
  ["Jaffna", [80.025, 9.662]],
  ["Anuradhapura", [80.403, 8.311]],
  ["Trincomalee", [81.234, 8.587]],
  ["Galle", [80.218, 6.053]],
  ["Kurunegala", [80.363, 7.486]],
  ["Hambantota", [81.118, 6.124]],
];
const defaultView = { zoom: 1, x: 0, y: 0 };

function project([longitude, latitude]: Point, width: number, height: number, view: MapView): Point {
  const scale = Math.min((height - 64) / 3.92, (width - 60) / 2.23) * view.zoom;
  return [
    width / 2 + view.x + (longitude - 80.765) * scale * 0.99,
    height / 2 + view.y - (latitude - 7.88) * scale,
  ];
}

type LabelBounds = { left: number; top: number; right: number; bottom: number };

function drawMap(canvas: HTMLCanvasElement, data: BoundaryData, width: number, height: number, view: MapView, points: Point[]) {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const pixelWidth = Math.round(width * ratio);
  const pixelHeight = Math.round(height * ratio);
  if (canvas.width !== pixelWidth) canvas.width = pixelWidth;
  if (canvas.height !== pixelHeight) canvas.height = pixelHeight;
  const context = canvas.getContext("2d");
  if (!context) return;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);

  context.strokeStyle = "#c5dbe2";
  context.lineWidth = 1;
  context.beginPath();
  for (let longitude = 74; longitude <= 88; longitude += 0.5) {
    const [x] = project([longitude, 7.88], width, height, view);
    context.moveTo(x, 0);
    context.lineTo(x, height);
  }
  for (let latitude = 3; latitude <= 13; latitude += 0.5) {
    const [, y] = project([80.765, latitude], width, height, view);
    context.moveTo(0, y);
    context.lineTo(width, y);
  }
  context.stroke();

  const [reliefX, reliefY] = project([80.72, 7.02], width, height, view);
  const relief = context.createRadialGradient(reliefX, reliefY, 0, reliefX, reliefY, height * view.zoom * 0.36);
  relief.addColorStop(0, "#b6c8a3");
  relief.addColorStop(0.55, "#d1ddbf");
  relief.addColorStop(1, "#e4e8d2");
  context.fillStyle = relief;
  context.strokeStyle = "#98af9b";
  context.lineWidth = 0.85;
  context.lineJoin = "round";
  data.features.forEach(({ geometry }) => {
    const polygons = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
    context.beginPath();
    polygons.forEach((polygon) => polygon.forEach((ring) => {
      ring.forEach((coordinate, index) => {
        const [x, y] = project(coordinate, width, height, view);
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      });
      context.closePath();
    }));
    context.fill("evenodd");
    context.stroke();
  });

  context.font = "italic 11px Segoe UI, sans-serif";
  context.fillStyle = "#527785";
  const [oceanX, oceanY] = project([79.40, 7.65], width, height, view);
  context.fillText("Indian Ocean", Math.max(12, oceanX - 63), oceanY);

  context.font = "600 11px Segoe UI, sans-serif";
  context.textBaseline = "middle";
  const labels: LabelBounds[] = points.map(([x, y]) => ({
    left: x - 18, right: x + 18, top: y - 18, bottom: y + 18,
  }));
  for (const [name, point] of cities) {
    if (width < 360 && view.zoom === 1 && name === "Kurunegala") continue;
    const [x, y] = project(point, width, height, view);
    if (x < 0 || x > width || y < 0 || y > height) continue;
    const textWidth = context.measureText(name).width;
    const candidates: Point[] = [[x + 7, y], [x - textWidth - 7, y], [x - textWidth / 2, y + 12], [x - textWidth / 2, y - 12]];
    for (const [start, baseline] of candidates) {
      const bounds = { left: start - 2, right: start + textWidth + 2, top: baseline - 7, bottom: baseline + 7 };
      if (bounds.left < 4 || bounds.right > width - 4 || bounds.top < 4 || bounds.bottom > height - 4) continue;
      if (labels.some((box) => bounds.left < box.right && bounds.right > box.left && bounds.top < box.bottom && bounds.bottom > box.top)) continue;
      context.beginPath();
      context.arc(x, y, 2, 0, 2 * Math.PI);
      context.fillStyle = "#46645c";
      context.fill();
      context.strokeStyle = "#eef3e7";
      context.lineWidth = 3;
      context.strokeText(name, start, baseline);
      context.fillStyle = "#2b4945";
      context.fillText(name, start, baseline);
      labels.push(bounds);
      break;
    }
  }
}

export function DisasterMap({ incidents }: { incidents: Incident[] }) {
  const [selected, setSelected] = useState(hazards[0]);
  const [filter, setFilter] = useState<HazardType | "all">("all");
  const [view, setView] = useState(defaultView);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [boundaries, setBoundaries] = useState<BoundaryData>();
  const [unavailable, setUnavailable] = useState(false);
  const [dragging, setDragging] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const drag = useRef<{ pointer: number; x: number; y: number }>();
  const visible = hazards.filter((hazard) => filter === "all" || hazard.type === filter);
  const incident = incidents.find(({ id }) => id === selected.id);
  const { width, height } = size;

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${import.meta.env.BASE_URL}maps/sri-lanka.json`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Boundary data is unavailable");
        return response.json() as Promise<BoundaryData>;
      })
      .then(setBoundaries)
      .catch(() => { if (!controller.signal.aborted) setUnavailable(true); });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const observer = new ResizeObserver(([{ contentRect }]) => {
      setSize({ width: contentRect.width, height: contentRect.height });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!boundaries || !canvas.current || width < 100 || height < 100) return;
    const points = hazards
      .filter((hazard) => filter === "all" || hazard.type === filter)
      .map(({ point }) => project(point, width, height, view));
    drawMap(canvas.current, boundaries, width, height, view, points);
  }, [boundaries, width, height, view, filter]);

  function changeFilter(next: HazardType | "all") {
    setFilter(next);
    if (next !== "all" && selected.type !== next) {
      selectHazard(hazards.find(({ type }) => type === next) ?? hazards[0]);
    }
  }

  function selectHazard(hazard: typeof hazards[number]) {
    setSelected(hazard);
    setView((current) => {
      const [x, y] = project(hazard.point, width, height, current);
      if (x >= 25 && x <= width - 25 && y >= 25 && y <= height - 25) return current;
      return { zoom: current.zoom, x: current.x + width / 2 - x, y: current.y + height / 2 - y };
    });
  }

  function zoomBy(delta: number) {
    setView((current) => {
      const zoom = Math.min(2.5, Math.max(1, current.zoom + delta));
      if (zoom === current.zoom) return current;
      if (zoom === 1) return defaultView;
      const [x, y] = project(selected.point, width, height, current);
      return {
        zoom,
        x: current.x + (x - width / 2 - current.x) * (1 - zoom / current.zoom),
        y: current.y + (y - height / 2 - current.y) * (1 - zoom / current.zoom),
      };
    });
  }

  function panBy(dx: number, dy: number) {
    setView((current) => ({
      ...current,
      x: Math.max(-width * 0.5, Math.min(width * 0.5, current.x + dx)),
      y: Math.max(-height * 0.55, Math.min(height * 0.55, current.y + dy)),
    }));
  }

  function startDrag(event: PointerEvent<HTMLCanvasElement>) {
    if (event.button !== 0) return;
    drag.current = { pointer: event.pointerId, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }

  function moveDrag(event: PointerEvent<HTMLCanvasElement>) {
    const previous = drag.current;
    if (previous?.pointer !== event.pointerId) return;
    panBy(event.clientX - previous.x, event.clientY - previous.y);
    drag.current = { pointer: event.pointerId, x: event.clientX, y: event.clientY };
  }

  function stopDrag() {
    drag.current = undefined;
    setDragging(false);
  }

  function handleMapKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    switch (event.key) {
      case "ArrowLeft": panBy(28, 0); break;
      case "ArrowRight": panBy(-28, 0); break;
      case "ArrowUp": panBy(0, 28); break;
      case "ArrowDown": panBy(0, -28); break;
      case "+": case "=": zoomBy(0.5); break;
      case "-": zoomBy(-0.5); break;
      case "Home": setView(defaultView); break;
      default: return;
    }
    event.preventDefault();
  }

  const SelectedIcon = hazardTypes[selected.type].icon;

  return (
    <section className="disaster-map" aria-labelledby="disaster-map-title">
      <header className="disaster-map-heading">
        <div>
          <h2 id="disaster-map-title">Sri Lanka disaster map</h2>
          <p>Explore reported hazards by location.</p>
        </div>
        <span className="disaster-map-demo">Demo data</span>
      </header>
      <div className="disaster-map-layout">
        <div ref={viewport} className="disaster-viewport" role="group" tabIndex={0} onKeyDown={handleMapKey}
          aria-label="Sri Lanka map. Use arrow keys to pan, plus and minus to zoom, and Home to reset.">
          <canvas
            ref={canvas}
            className={dragging ? "is-dragging" : undefined}
            onPointerDown={startDrag}
            onPointerMove={moveDrag}
            onPointerUp={stopDrag}
            onLostPointerCapture={stopDrag}
            aria-hidden="true"
          />
          {!boundaries && <span className="disaster-map-notice" role="status">{unavailable ? "Map unavailable. Locations are listed beside it." : "Loading map…"}</span>}
          {boundaries && width > 0 && visible.map((hazard) => {
            const [x, y] = project(hazard.point, width, height, view);
            if (x < 14 || y < 14 || x > width - 14 || y > height - 14) return null;
            const Icon = hazardTypes[hazard.type].icon;
            return (
              <button
                key={hazard.id}
                type="button"
                className={`disaster-marker ${hazard.type}`}
                style={{ left: x, top: y }}
                aria-label={`${hazard.name} in ${hazard.place}`}
                title={`${hazard.name} · ${hazard.place}`}
                aria-pressed={selected.id === hazard.id}
                onClick={() => setSelected(hazard)}
              >
                <Icon size={15} aria-hidden="true" />
              </button>
            );
          })}
          <span className="disaster-map-north" aria-hidden="true">↑ N</span>
          <div className="disaster-map-controls" role="group" aria-label="Map controls">
            <button type="button" onClick={() => zoomBy(0.5)} disabled={view.zoom === 2.5 || !boundaries} aria-label="Zoom in" title="Zoom in"><Plus size={15} /></button>
            <button type="button" onClick={() => zoomBy(-0.5)} disabled={view.zoom === 1 || !boundaries} aria-label="Zoom out" title="Zoom out"><Minus size={15} /></button>
            <button type="button" onClick={() => setView(defaultView)} aria-label="Reset map view" title="Reset map view" disabled={!boundaries}><Crosshair size={15} /></button>
          </div>
          <a className="disaster-map-credit" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap contributors</a>
        </div>
        <div className="disaster-map-panel">
          <div className="disaster-map-filters" role="group" aria-label="Filter hazards">
            <button type="button" aria-pressed={filter === "all"} onClick={() => changeFilter("all")}>All</button>
            {(Object.keys(hazardTypes) as HazardType[]).map((type) => (
              <button type="button" key={type} aria-pressed={filter === type} onClick={() => changeFilter(type)}>
                <i className={type} aria-hidden="true" />{hazardTypes[type].label}
              </button>
            ))}
          </div>
          <ul className="disaster-map-incidents" aria-label="Mapped incidents">
            {visible.map((hazard) => {
              const Icon = hazardTypes[hazard.type].icon;
              return (
                <li key={hazard.id}>
                  <button type="button" aria-pressed={selected.id === hazard.id} onClick={() => selectHazard(hazard)}>
                    <Icon className={hazard.type} size={16} aria-hidden="true" />
                    <span>{hazard.place}</span><small>{hazard.name}</small>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="disaster-map-selection" aria-live="polite">
            <article className="disaster-map-detail" key={selected.id}>
              <div><SelectedIcon className={selected.type} size={17} aria-hidden="true" /><h3>{selected.name}</h3>{incident && <span>{incident.status}</span>}</div>
              <p>{selected.place}</p>
              {incident && <p>{incident.detail}</p>}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

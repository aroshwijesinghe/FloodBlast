import { useEffect, useRef, useState } from "react";
import { MapPin, Mountain, Navigation, Waves } from "lucide-react";

type Coordinate = [longitude: number, latitude: number];
type Polygon = Coordinate[][];
type Boundaries = {
  features: { geometry: { type: "Polygon"; coordinates: Polygon } | { type: "MultiPolygon"; coordinates: Polygon[] } }[];
};

const width = 720;
const height = 390;
const west = 79.36;
const east = 81.01;
const north = 7.75;
const south = 6.47;

const towns = [
  { name: "Negombo", point: [79.84, 7.21], westLabel: true },
  { name: "Colombo", point: [79.86, 6.93], westLabel: true },
  { name: "Kandy", point: [80.64, 7.29], westLabel: false },
  { name: "Nuwara Eliya", point: [80.79, 6.95], westLabel: true },
  { name: "Ratnapura", point: [80.40, 6.68], westLabel: false },
] satisfies { name: string; point: Coordinate; westLabel: boolean }[];

const alerts = [
  { name: "Kelani River overflow", point: [80.09, 6.94], icon: Waves, kind: "water" },
  { name: "Central Highlands landslide", point: [80.53, 7.07], icon: Mountain, kind: "landslide" },
] satisfies { name: string; point: Coordinate; icon: typeof Waves; kind: string }[];

function project([longitude, latitude]: Coordinate): Coordinate {
  return [(longitude - west) / (east - west), (north - latitude) / (north - south)];
}

function markerPosition(point: Coordinate) {
  const [x, y] = project(point);
  return { left: `${x * 100}%`, top: `${y * 100}%` };
}

function terrainHeight(x: number, y: number) {
  const centralRidge = Math.exp(-(((x - 0.82) / 0.23) ** 2 + ((y - 0.62) / 0.29) ** 2));
  const knuckles = 0.57 * Math.exp(-(((x - 0.88) / 0.18) ** 2 + ((y - 0.30) / 0.19) ** 2));
  const foothills = 0.25 * Math.exp(-(((x - 0.62) / 0.38) ** 2 + ((y - 0.72) / 0.45) ** 2));
  const texture = 0.73 + 0.12 * Math.sin(31 * x + 15 * y) * Math.sin(28 * y - 19 * x)
    + 0.08 * Math.cos(76 * x + 39 * y) * Math.sin(56 * y - 27 * x)
    + 0.025 * Math.sin(178 * x + 89 * y) * Math.cos(144 * y - 62 * x);
  return (centralRidge + knuckles + foothills) * texture;
}

function drawRelief(canvas: HTMLCanvasElement, boundaries: Boundaries) {
  const context = canvas.getContext("2d");
  if (!context) return;

  const relief = context.createImageData(width, height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const elevation = terrainHeight(x / width, y / height);
      const slope = elevation - terrainHeight((x + 1) / width, (y + 1) / height);
      const lighting = Math.max(-14, Math.min(19, slope * 1150));
      const contour = elevation > 0.12 && (elevation * 19) % 1 < 0.07 ? 6 : 0;
      const pixel = (y * width + x) * 4;
      relief.data[pixel] = 30 + elevation * 76 + lighting + contour;
      relief.data[pixel + 1] = 79 + elevation * 62 + lighting + contour;
      relief.data[pixel + 2] = 73 + elevation * 33 + lighting + contour;
      relief.data[pixel + 3] = 255;
    }
  }

  const paths = boundaries.features.flatMap(({ geometry }) => {
    const polygons = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
    return polygons.map((polygon) => {
      const path = new Path2D();
      for (const ring of polygon) {
        ring.forEach((point, index) => {
          const [x, y] = project(point);
          if (index === 0) path.moveTo(x * width, y * height);
          else path.lineTo(x * width, y * height);
        });
        path.closePath();
      }
      return path;
    });
  });

  context.clearRect(0, 0, width, height);
  context.putImageData(relief, 0, 0);
  const land = new Path2D();
  paths.forEach((path) => land.addPath(path));
  context.save();
  context.globalCompositeOperation = "destination-in";
  context.fill(land);
  context.restore();
  context.lineWidth = 1;
  context.strokeStyle = "#b0e8d94f";
  paths.forEach((path) => context.stroke(path));
}

export function LoginAtlas() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [mapStatus, setMapStatus] = useState<"loading" | "loaded" | "error">("loading");

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${import.meta.env.BASE_URL}maps/sri-lanka.json`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Map boundaries unavailable");
        return response.json() as Promise<Boundaries>;
      })
      .then((boundaries) => {
        if (!canvas.current || controller.signal.aborted) return;
        drawRelief(canvas.current, boundaries);
        setMapStatus("loaded");
      })
      .catch(() => {
        if (!controller.signal.aborted) setMapStatus("error");
      });
    return () => controller.abort();
  }, []);

  return (
    <section className="login-atlas">
      <div className="login-atlas-copy">
        <h1>Flood response<br className="login-atlas-break" /> coordination<span>.</span></h1>
        <p>Sri Lanka operations center</p>
      </div>
      <figure className="login-atlas-figure" aria-label="Relief map of western and central Sri Lanka">
        <div className="login-atlas-map">
          <canvas ref={canvas} width={width} height={height} aria-hidden="true" />
          {mapStatus === "loaded" ? (
            <>
              <span className="login-atlas-north" aria-hidden="true"><Navigation size={13} /> N</span>
              <span className="login-atlas-ocean" aria-hidden="true">Indian Ocean</span>
              {towns.map(({ name, point, westLabel }) => (
                <span key={name} className={`login-atlas-town${westLabel ? " label-west" : ""}`} style={markerPosition(point)}>
                  <span aria-hidden="true" />{name}
                </span>
              ))}
              {alerts.map(({ name, point, icon: Icon, kind }) => (
                <span key={name} className={`login-atlas-marker ${kind}`} style={markerPosition(point)} title={`Sample alert: ${name}`}>
                  <Icon size={14} aria-hidden="true" />
                </span>
              ))}
            </>
          ) : (
            <p className="login-atlas-map-status" role="status">{mapStatus === "loading" ? "Loading regional map…" : "Regional map unavailable"}</p>
          )}
        </div>
        <figcaption>
          <span className="login-atlas-region"><MapPin size={15} /> Western &amp; central Sri Lanka</span>
          <span className="login-atlas-samples">Sample alerts</span>
          <ul aria-label="Sample alerts in the regional map">
            {alerts.map(({ name, icon: Icon, kind }) => <li key={name} className={kind}><Icon size={13} aria-hidden="true" />{name}</li>)}
          </ul>
        </figcaption>
      </figure>
      <div className="login-atlas-credit">
        Illustrated relief · <a href="https://www.geoboundaries.org/">geoBoundaries</a> ·{" "}
        <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a>
      </div>
    </section>
  );
}

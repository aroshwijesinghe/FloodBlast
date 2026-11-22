import { useState, type FormEvent } from "react";
import {
  Activity,
  ArrowRight,
  Check,
  ClipboardList,
  Eye,
  EyeOff,
  KeyRound,
  Layers,
  LogOut,
  MapPin,
  Package,
  Radio,
  ShieldCheck,
  Waves,
} from "lucide-react";

import { Terrain } from "./Terrain";
import "./operations.css";

const email = "officer@floodblast.test",
  password = "FloodDemo24!";
const sections = ["Incidents", "Relief", "Shelters", "Contacts"] as const;
type Section = (typeof sections)[number];
type Entry = {
  id: string;
  name: string;
  district: string;
  detail: string;
  status: string;
};
const statuses: Record<Section, string[]> = {
  Incidents: ["Reported", "Verified", "Resolved"],
  Relief: ["Requested", "Pledged", "Delivered"],
  Shelters: ["Open", "At capacity", "Closed"],
  Contacts: ["Duty contact", "Off duty"],
};
const initial: Record<Section, Entry[]> = {
  Incidents: [
    {
      id: "INC-101",
      name: "Rising water near Kelani River",
      district: "Gampaha",
      detail: "Water level report awaiting field verification.",
      status: "Reported",
    },
    {
      id: "INC-102",
      name: "Access road submerged",
      district: "Kalutara",
      detail: "Field team confirmed a blocked access road.",
      status: "Verified",
    },
  ],
  Relief: [
    {
      id: "REL-101",
      name: "Lunch parcels",
      district: "Gampaha",
      detail: "80 meal packs requested for the community shelter.",
      status: "Requested",
    },
  ],
  Shelters: [
    {
      id: "SH-101",
      name: "Community reception hall",
      district: "Gampaha",
      detail: "42 of 80 places occupied · Drinking water available",
      status: "Open",
    },
  ],
  Contacts: [
    {
      id: "CT-101",
      name: "District coordination desk",
      district: "Kalutara",
      detail: "Demo contact · Operations liaison",
      status: "Duty contact",
    },
  ],
};
function Brand() {
  return (
    <div className="fb-brand">
      <span>
        <Waves size={25} />
      </span>{" "}
      FloodBlast
    </div>
  );
}
async function digest(value: string) {
  const data = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );
  return Array.from(new Uint8Array(data), (b) =>
    b.toString(16).padStart(2, "0"),
  ).join("");
}
function Login({ enter }: { enter: (name: string) => void }) {
  const [signup, setSignup] = useState(false),
    [mail, setMail] = useState(""),
    [pass, setPass] = useState(""),
    [show, setShow] = useState(false),
    [error, setError] = useState("");
  async function submit(e: FormEvent) {
    e.preventDefault();
    const key = mail.trim().toLowerCase();
    const users: Record<string, string> = JSON.parse(
      localStorage.getItem("fb.accounts") || "{}",
    );
    if (signup && (key === email || users[key])) {
      setError("This email already has a demo account.");
      return;
    }
    if (signup) {
      users[key] = await digest(key + pass);
      localStorage.setItem("fb.accounts", JSON.stringify(users));
    } else if (
      !(key === email && pass === password) &&
      users[key] !== (await digest(key + pass))
    ) {
      setError("Check your email and password.");
      return;
    }
    enter(key);
  }
  return (
    <main className="login">
      <header>
        <Brand />
        <small>
          <i /> Development workspace
        </small>
      </header>
      <div className="login-grid">
        <section className="atlas">
          <Terrain />
          <div className="atlas-body">
            <div className="map-label">
              <Radio size={15} /> OPERATIONS ATLAS
            </div>
            <h1>
              Flood response
              <br />
              coordination<span>.</span>
            </h1>
            <p>Sri Lanka operations center</p>
          </div>
          <div className="pin">
            <b />
            <span>Kelani basin</span>
          </div>
          <div className="atlas-foot">
            <span>
              <MapPin size={14} /> Western Province
            </span>
            <code>06°56′ N · 79°51′ E</code>
          </div>
        </section>
        <section className="auth">
          <div className="auth-inner">
            <ShieldCheck className="shield" />
            <h2>{signup ? "Create an account" : "Welcome back"}</h2>
            <p>
              {signup
                ? "Create a local development account."
                : "Sign in to your operations workspace."}
            </p>
            <form onSubmit={submit}>
              <label>
                Email address
                <input
                  required
                  type="email"
                  value={mail}
                  placeholder="officer@example.com"
                  onChange={(e) => setMail(e.target.value)}
                />
              </label>
              <label>
                Password
                <div className="pass">
                  <input
                    type={show ? "text" : "password"}
                    required
                    minLength={signup ? 8 : 1}
                    value={pass}
                    placeholder={
                      signup ? "At least 8 characters" : "Enter your password"
                    }
                    onChange={(e) => setPass(e.target.value)}
                  />
                  <button
                    type="button"
                    aria-label="Toggle password visibility"
                    onClick={() => setShow(!show)}
                  >
                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>
              {error && <p role="alert">{error}</p>}
              <button className="primary">
                {signup ? "Create account" : "Sign in"}
                <ArrowRight size={18} />
              </button>
            </form>
            <div className="creds">
              <b>
                <KeyRound size={14} /> Developer credentials
              </b>
              <code>
                {email}
                <br />
                {password}
              </code>
              <button
                onClick={() => {
                  setMail(email);
                  setPass(password);
                  setSignup(false);
                  setError("");
                }}
              >
                Fill credentials <ArrowRight size={13} />
              </button>
            </div>
            <p className="switch">
              {signup ? "Already registered?" : "New to the workspace?"}{" "}
              <button
                onClick={() => {
                  setSignup(!signup);
                  setError("");
                  setPass("");
                }}
              >
                {signup ? "Sign in" : "Sign up"}
              </button>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
function Workspace({ leave }: { leave: () => void }) {
  const nav = (url: string) => window.location.assign(url),
    path = window.location.pathname.split("/")[1],
    section = sections.find((s) => s.toLowerCase() === path);
  const [data, setData] = useState<Record<Section, Entry[]>>(
      () => JSON.parse(localStorage.getItem("fb.records") || "null") || initial,
    ),
    [query, setQuery] = useState(""),
    [adding, setAdding] = useState(false);
  function save(s: Section, rows: Entry[]) {
    const next = { ...data, [s]: rows };
    localStorage.setItem("fb.records", JSON.stringify(next));
    setData(next);
  }
  function add(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!section) return;
    const f = new FormData(e.currentTarget);
    save(section, [
      {
        id: crypto.randomUUID(),
        name: String(f.get("name")),
        district: String(f.get("district")),
        detail: String(f.get("detail")),
        status: statuses[section][0],
      },
      ...data[section],
    ]);
    setAdding(false);
  }
  const icons = [Activity, Package, Layers, Radio];
  return (
    <main className="workspace">
      <header>
        <Brand />
        <button onClick={leave}>
          <LogOut size={16} /> Sign out
        </button>
      </header>
      <nav>
        {["Overview", ...sections].map((s) => (
          <a
            key={s}
            end
            to={s === "Overview" ? "/" : "/" + s.toLowerCase()}
            onClick={() => {
              setQuery("");
              setAdding(false);
            }}
          >
            {s}
          </a>
        ))}
      </nav>
      <div className="work-body">
        <small>
          <i /> Local demo workspace
        </small>
        <h1>{section || "Operations overview"}</h1>
        {!section ? (
          <>
            <div className="metrics">
              {sections.map((s, i) => {
                const Icon = icons[i];
                return (
                  <button key={s} onClick={() => nav("/" + s.toLowerCase())}>
                    <Icon />
                    <strong>{data[s].length}</strong>
                    {s}
                    <ArrowRight size={15} />
                  </button>
                );
              })}
            </div>
            <h2>Incident register</h2>
          </>
        ) : (
          <div className="tools">
            <input
              aria-label="Search records"
              placeholder="Search name or district"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="primary" onClick={() => setAdding(!adding)}>
              {adding ? "Cancel" : "+ Add record"}
            </button>
          </div>
        )}
        {adding && section && (
          <form className="entry" onSubmit={add}>
            {["name", "district", "detail"].map((n) => (
              <label key={n}>
                {n}
                <input required name={n} />
              </label>
            ))}
            <button className="primary">
              <Check size={16} /> Save record
            </button>
          </form>
        )}
        <div className="records">
          {data[section || "Incidents"]
            .filter((r) =>
              (r.name + " " + r.district)
                .toLowerCase()
                .includes(query.toLowerCase()),
            )
            .map((r) => (
              <article key={r.id}>
                <ClipboardList />
                <div>
                  <small>{r.district}</small>
                  <h3>{r.name}</h3>
                  <p>{r.detail}</p>
                </div>
                {section ? (
                  <select
                    aria-label={"Status for " + r.name}
                    value={r.status}
                    onChange={(e) =>
                      save(
                        section,
                        data[section].map((x) =>
                          x.id === r.id ? { ...x, status: e.target.value } : x,
                        ),
                      )
                    }
                  >
                    {statuses[section].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                ) : (
                  <span>{r.status}</span>
                )}
              </article>
            ))}
          {!data[section || "Incidents"].some((r) =>
            (r.name + " " + r.district)
              .toLowerCase()
              .includes(query.toLowerCase()),
          ) && <p>No matching records.</p>}
        </div>
      </div>
    </main>
  );
}
export function Demo() {
  if (!sessionStorage.getItem("fb.session")) {
    return <Login enter={name => {
      sessionStorage.setItem("fb.session", name);
      window.location.assign("/");
    }} />;
  }
  return <Workspace leave={() => {
    sessionStorage.removeItem("fb.session");
    window.location.assign("/login");
  }} />;
}

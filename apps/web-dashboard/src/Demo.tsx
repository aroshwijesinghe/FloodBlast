import { LanguageSwitcher } from "./components/shared/LanguageSwitcher";
import { useTranslation } from "./i18n";
import { useEffect, useState, type FormEvent } from "react";
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
  Package,
  Radio,
  ShieldCheck,
  Waves,
} from "lucide-react";

import { LoginAtlas } from "./LoginAtlas";
import { DisasterMap } from "./DisasterMap";
import { DonorPortal } from "./demo/DonorPortal";
import { ReliefBoard } from "./demo/ReliefBoard";
import { ShelterDirectory } from "./demo/ShelterDirectory";
import { DistrictForecast } from "./demo/DistrictForecast";
import { operatorToken, signInOperator, signOutOperator } from "./demo/operator";
import "./operations.css";
import "./login-atlas.css";

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
    {
      id: "INC-103",
      name: "Landslide blocks hillside road",
      district: "Badulla",
      detail: "A field team has marked the affected road and is checking alternate access.",
      status: "Verified",
    },
    {
      id: "INC-104",
      name: "Flash flooding near residential streets",
      district: "Batticaloa",
      detail: "Reports of street flooding are awaiting field verification.",
      status: "Reported",
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
    {
      id: "REL-102",
      name: "Drinking water delivery",
      district: "Kalutara",
      detail: "120 bottles pledged for the school relief center.",
      status: "Pledged",
    },
    {
      id: "REL-103",
      name: "Blankets and sleeping mats",
      district: "Badulla",
      detail: "25 blankets and 25 sleeping mats delivered to the reception hall.",
      status: "Delivered",
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
    {
      id: "SH-102",
      name: "School relief center",
      district: "Kalutara",
      detail: "50 of 50 places occupied · Accessible entrance",
      status: "At capacity",
    },
    {
      id: "SH-103",
      name: "Hillside community reception hall",
      district: "Badulla",
      detail: "18 of 40 places occupied · Bedding available",
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
    {
      id: "CT-102",
      name: "Shelter coordination desk",
      district: "Gampaha",
      detail: "Shelter intake and capacity · gampaha-shelters@example.com",
      status: "Duty contact",
    },
    {
      id: "CT-103",
      name: "Road clearance liaison",
      district: "Badulla",
      detail: "Road closures and clearance updates · badulla-roads@example.com",
      status: "Off duty",
    },
    {
      id: "CT-104",
      name: "Flood response desk",
      district: "Batticaloa",
      detail: "Flood reports and response coordination · batticaloa-response@example.com",
      status: "Duty contact",
    },
  ],
};

function loadRecords(): Record<Section, Entry[]> {
  const saved: Record<Section, Entry[]> | null = JSON.parse(
    localStorage.getItem("fb.records") || "null",
  );
  if (!saved) return initial;

  // Add missing samples without overwriting saved records or status changes.
  for (const section of sections) {
    const rows = saved[section] || [];
    const ids = new Set(rows.map(({ id }) => id));
    saved[section] = [...rows, ...initial[section].filter(({ id }) => !ids.has(id))];
  }
  return saved;
}
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
  const { t } = useTranslation();
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
    if (key === email && !signup) await signInOperator(key, pass);
    enter(key);
  }
  return (
    <main className="login">
      <header>
        <Brand />
        <div className="header-actions">
          <LanguageSwitcher />
          <small><i /> {t("Development workspace")}</small>
        </div>
      </header>
      <div className="login-grid">
        <LoginAtlas />
        <section className="auth">
          <div className="auth-inner">
            <ShieldCheck className="shield" />
            <h2>{t(signup ? "Create an account" : "Welcome back")}</h2>
            <p>
              {t(signup
                ? "Create a local development account."
                : "Sign in to your operations workspace.")}
            </p>
            <form onSubmit={submit}>
              <label>
                {t("Email address")}
                <input
                  required
                  type="email"
                  autoComplete="username"
                  value={mail}
                  placeholder="officer@example.com"
                  onChange={(e) => setMail(e.target.value)}
                />
              </label>
              <label>
                {t("Password")}
                <span className="pass">
                  <input
                    type={show ? "text" : "password"}
                    autoComplete={signup ? "new-password" : "current-password"}
                    required
                    minLength={signup ? 8 : 1}
                    value={pass}
                    placeholder={
                      t(signup ? "At least 8 characters" : "Enter your password")
                    }
                    onChange={(e) => setPass(e.target.value)}
                  />
                  <button
                    type="button"
                    aria-label={t(show ? "Hide password" : "Show password")}
                    onClick={() => setShow(!show)}
                  >
                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </span>
              </label>
              {error && <p role="alert">{t(error)}</p>}
              <button className="primary">
                {t(signup ? "Create account" : "Sign in")}
                <ArrowRight size={18} />
              </button>
            </form>
            <div className="creds">
              <b>
                <KeyRound size={14} /> {t("Demo credentials")}
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
                {t("Use demo account")} <ArrowRight size={13} />
              </button>
            </div>
            <p className="switch">
              {t(signup ? "Already registered?" : "New to the workspace?")}{" "}
              <button
                onClick={() => {
                  setSignup(!signup);
                  setError("");
                  setPass("");
                }}
              >
                {t(signup ? "Sign in" : "Sign up")}
              </button>
            </p>
            <p className="switch"><a className="human-link" href="/donor">{t("Donor portal")}</a></p>
          </div>
        </section>
      </div>
    </main>
  );
}
function Workspace({ leave }: { leave: () => void }) {
  const { t } = useTranslation();
  const nav = (url: string) => window.location.assign(url),
    path = window.location.pathname.split("/")[1],
    section = sections.find((s) => s.toLowerCase() === path);
  const [data, setData] = useState(loadRecords),
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
  const sampleIds = new Set(initial[section || "Incidents"].map((row) => row.id));
  function recordText(row: Entry, value: string) {
    return sampleIds.has(row.id) ? t(value) : value;
  }
  const visibleRecords = data[section || "Incidents"].filter((row) =>
    [row.name, row.district, recordText(row, row.name), recordText(row, row.district)]
      .join(" ").toLowerCase().includes(query.trim().toLowerCase()),
  );
  const icons = [Activity, Package, Layers, Radio];
  const forecast = path === "forecast";
  return (
    <main className="workspace">
      <header>
        <Brand />
        <div className="header-actions">
          <LanguageSwitcher />
          <button onClick={leave}>
            <LogOut size={16} /> {t("Sign out")}
          </button>
        </div>
      </header>
      <nav>
        {["Overview", ...sections].map((s) => (
          <a
            key={s}
            href={s === "Overview" ? "/" : "/" + s.toLowerCase()}
            aria-current={!forecast && s === (section || "Overview") ? "page" : undefined}
          >
            {t(s)}
          </a>
        ))}
        <a href="/forecast" aria-current={forecast ? "page" : undefined}>{t("Forecast")}</a>
      </nav>
      <div className="work-body">
        <small>
          <i /> {t("Local demo workspace")}
        </small>
        <h1>{t(forecast ? "District forecasting" : section || "Operations overview")}</h1>
        {forecast && <div className="humanitarian"><DistrictForecast /></div>}
        {section === "Relief" && <div className="humanitarian"><ReliefBoard operator={operatorToken()} /></div>}
        {section === "Shelters" && <div className="humanitarian"><ShelterDirectory operator={operatorToken()} /></div>}
        {!forecast && (!section ? (
          <>
            <DisasterMap incidents={data.Incidents} />
            <div className="metrics">
              {sections.map((s, i) => {
                const Icon = icons[i];
                return (
                  <button key={s} onClick={() => nav("/" + s.toLowerCase())}>
                    <Icon />
                    <strong>{data[s].length}</strong>
                    {t(s)}
                    <ArrowRight size={15} />
                  </button>
                );
              })}
            </div>
            <h2>{t("Incident register")}</h2>
          </>
        ) : (
          <div className="tools">
            <input
              aria-label={t("Search records")}
              placeholder={t("Search name or district")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="primary" onClick={() => setAdding(!adding)}>
              {t(adding ? "Cancel" : "+ Add record")}
            </button>
          </div>
        ))}
        {adding && section && (
          <form className="entry" onSubmit={add}>
            {["name", "district", "detail"].map((n) => (
              <label key={n}>
                {t(n)}
                <input required name={n} />
              </label>
            ))}
            <button className="primary">
              <Check size={16} /> {t("Save record")}
            </button>
          </form>
        )}
        {!forecast && <div className="records">
          {visibleRecords.map((r) => (
            <article key={r.id}>
              <ClipboardList />
              <div>
                <small>{recordText(r, r.district)}</small>
                <h3>{recordText(r, r.name)}</h3>
                <p>{recordText(r, r.detail)}</p>
              </div>
              {section ? (
                <select
                  aria-label={t("Status for {name}", { name: recordText(r, r.name) })}
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
                    <option key={s} value={s}>{t(s)}</option>
                  ))}
                </select>
              ) : (
                <span>{t(r.status)}</span>
              )}
            </article>
          ))}
          {visibleRecords.length === 0 && <p>{t("No matching records.")}</p>}
        </div>}
      </div>
    </main>
  );
}
export function Demo() {
  const { language, t } = useTranslation();
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t("FloodBlast Dashboard");
  }, [language, t]);
  if (window.location.pathname === "/donor") return <DonorPortal />;
  if (!sessionStorage.getItem("fb.session")) {
    return <Login enter={name => {
      sessionStorage.setItem("fb.session", name);
      window.location.assign("/");
    }} />;
  }
  return <Workspace leave={() => {
    sessionStorage.removeItem("fb.session");
    signOutOperator();
    window.location.assign("/login");
  }} />;
}

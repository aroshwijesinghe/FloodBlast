import { useEffect, useState, type FormEvent } from "react";
import { demoRequest } from "./api";
import type { Shelter } from "./ShelterDirectory";

const groups = [
  ["children", "Children"], ["olderAdults", "Older adults"],
  ["pregnant", "Pregnant evacuees"], ["injured", "Injured evacuees"],
];
type Plan = { counts: Record<string, number>; mealPacksPerWindow: number; mealPacksPerDay: number; supportKits: number };

export function ShelterNeeds({ shelter, operator }: { shelter: Shelter; operator: string }) {
  const [plan, setPlan] = useState<Plan>();
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    demoRequest<Plan>(`shelters/needs/${shelter.id}`, { token: operator }).then(
      (result) => { if (active) setPlan(result); },
      (failure: Error) => { if (active) setError(failure.message); },
    );
    return () => { active = false; };
  }, [shelter.id, shelter.occupancy, operator]);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const counts = Object.fromEntries(groups.map(([key]) => [key, Number(data.get(key))]));
    setBusy(true);
    setError("");
    setMessage("");
    try {
      setPlan(await demoRequest<Plan>("shelters/demographics", { token: operator, body: { id: shelter.id, counts } }));
      setEditing(false);
    } catch (failure) {
      setError((failure as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function publish() {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await demoRequest("shelters/publish-lunch", { token: operator, body: { id: shelter.id } });
      setMessage("Lunch request published to the relief queue.");
    } catch (failure) {
      setError((failure as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="shelter-needs">
      <h4>Evacuee needs · Operations only</h4>
      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message} <a className="human-link" href="/relief">View relief queue</a></p>}
      {plan && (editing ? (
        <form className="human-form" onSubmit={save}>
          {groups.map(([key, label]) => (
            <label key={key}>{label}<input required name={key} type="number" min="0" max={shelter.occupancy} defaultValue={plan.counts[key]} /></label>
          ))}
          <div className="human-actions">
            <button className="primary" disabled={busy}>Save group counts</button>
            <button type="button" className="human-action" disabled={busy} onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : <>
        <dl className="facility-list">
          {groups.map(([key, label]) => <div key={key}><dt>{label}</dt><dd>{plan.counts[key]}</dd></div>)}
          <div><dt>Meal packs per window</dt><dd>{plan.mealPacksPerWindow}</dd></div>
          <div><dt>Meal packs per day</dt><dd>{plan.mealPacksPerDay}</dd></div>
          <div><dt>First-aid stock kits (demo estimate)</dt><dd>{plan.supportKits}</dd></div>
        </dl>
        <div className="human-actions">
          <button type="button" className="human-action" disabled={busy} onClick={() => setEditing(true)}>Edit group counts</button>
          <button type="button" className="human-action" disabled={busy || !plan.mealPacksPerWindow} onClick={publish}>Publish lunch request</button>
        </div>
      </>)}
    </div>
  );
}

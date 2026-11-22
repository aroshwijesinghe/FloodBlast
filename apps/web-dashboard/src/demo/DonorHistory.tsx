import { useEffect, useState } from "react";
import { demoRequest } from "./api";

export type DonorPledge = {
  id: string;
  quantity: number;
  status: string;
  createdAt: string;
  name: string;
  district: string;
  unit: string;
};

export function DonorHistory({ token, revision }: { token: string; revision: number }) {
  const [rows, setRows] = useState<DonorPledge[]>();
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    demoRequest<DonorPledge[]>("donors/pledges", { token }).then(
      (result) => { if (active) { setRows(result); setError(""); } },
      (failure: Error) => { if (active) setError(failure.message); },
    );
    return () => { active = false; };
  }, [token, revision]);

  return (
    <section className="human-panel">
      <h2>My pledges</h2>
      {error && <p role="alert">{error}</p>}
      {!error && !rows && <p role="status">Loading pledge history…</p>}
      {rows?.length === 0 && <p>Your pledges and deliveries will appear here.</p>}
      <ul className="human-grid">
        {rows?.map((row) => (
          <li className="human-card" key={row.id}>
            <h3>{row.name} · {row.district}</h3>
            <p>{row.quantity} {row.unit} · {row.status.replace(/_/g, " ")}</p>
            <time dateTime={row.createdAt}>{new Intl.DateTimeFormat(undefined, {
              dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Colombo",
            }).format(new Date(row.createdAt))}</time>
            <small>Reference {row.id}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}

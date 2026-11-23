import { useTranslation } from "../i18n";
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
  const { language, t } = useTranslation();
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
      <h2>{t("My pledges")}</h2>
      {error && <p role="alert">{t(error)}</p>}
      {!error && !rows && <p role="status">{t("Loading pledge history…")}</p>}
      {rows?.length === 0 && <p>{t("Your pledges and deliveries will appear here.")}</p>}
      <ul className="human-grid">
        {rows?.map((row) => (
          <li className="human-card" key={row.id}>
            <h3>{t(row.name)} · {t(row.district)}</h3>
            <p>{row.quantity} {t(row.unit)} · {t(row.status.replace(/_/g, " "))}</p>
            <time dateTime={row.createdAt}>{new Intl.DateTimeFormat(language, {
              dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Colombo",
            }).format(new Date(row.createdAt))}</time>
            <small>{t("Reference {id}", { id: row.id })}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}

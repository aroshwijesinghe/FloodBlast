import { useEffect, useRef, useState, type FormEvent } from "react";
import { demoRequest } from "./api";
import "./humanitarian.css";

const queues = [
  { id: "food", label: "Meals" },
  { id: "medical", label: "Medical supplies" },
  { id: "water", label: "Clean water" },
  { id: "blankets", label: "Blankets" },
  { id: "formula", label: "Baby formula" },
];

export type ReliefRequest = {
  id: string;
  name: string;
  district: string;
  destination?: string;
  category: string;
  unit: string;
  required: number;
  pledged: number;
  remaining: number;
  status: string;
  allocations?: { id: string; quantity: number; status: string }[];
  date?: string;
  meal?: string;
  window?: string;
};

function ReliefProgress({ request }: { request: ReliefRequest }) {
  return (
    <div className="relief-progress">
      <progress max={request.required} value={request.pledged} aria-label={`${request.name} pledged quantity`} />
      <dl>
        <div><dt>Required</dt><dd>{request.required}</dd></div>
        <div><dt>Pledged</dt><dd>{request.pledged}</dd></div>
        <div><dt>Remaining</dt><dd>{request.remaining}</dd></div>
      </dl>
    </div>
  );
}

function PledgeForm({ request, token, onUpdate }: {
  request: ReliefRequest;
  token: string;
  onUpdate: (updated: ReliefRequest) => void;
}) {
  const [quantity, setQuantity] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const submission = useRef<{ quantity: number; id: string }>();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    const amount = Number(quantity);
    if (submission.current?.quantity !== amount) {
      submission.current = { quantity: amount, id: crypto.randomUUID() };
    }
    try {
      const updated = await demoRequest<ReliefRequest>("relief/pledges", {
        body: { requestId: request.id, quantity: amount, submissionId: submission.current.id },
        token,
      });
      setMessage(`Pledged ${quantity} ${request.unit}.`);
      onUpdate(updated);
      setQuantity("");
      submission.current = undefined;
    } catch (failure) {
      setError((failure as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="human-form" onSubmit={submit}>
      {request.remaining > 0 && <>
        <label>Quantity to pledge
          <input type="number" value={quantity} onChange={(event) => setQuantity(event.target.value)} min="1" max={request.remaining} step="1" required />
        </label>
        <div className="human-actions">
          <button className="primary" disabled={busy}>Confirm pledge</button>
          <button className="human-action" type="button" onClick={() => setQuantity(String(request.remaining))}>Use remaining quantity</button>
        </div>
      </>}
      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}
    </form>
  );
}

export function ReliefBoard({ token, operator, onPledge }: { token?: string; operator?: string; onPledge?: () => void }) {
  const [requests, setRequests] = useState<ReliefRequest[]>([]);
  const [queue, setQueue] = useState("food");
  const [error, setError] = useState("");
  const [advancing, setAdvancing] = useState(false);

  useEffect(() => {
    let active = true;
    function refresh() {
      demoRequest<ReliefRequest[]>(operator ? "relief/operations" : "relief/requests", { token: operator })
        .then(
          (rows) => { if (active) setRequests(rows); },
          (failure: Error) => { if (active) setError(failure.message); },
        );
    }
    refresh();
    window.addEventListener("focus", refresh);
    return () => { active = false; window.removeEventListener("focus", refresh); };
  }, [operator]);

  function update(updated: ReliefRequest) {
    setRequests((current) => current.map((request) => request.id === updated.id ? updated : request));
    onPledge?.();
  }

  async function advance(pledgeId: string, status: string) {
    setAdvancing(true);
    setError("");
    try {
      update(await demoRequest<ReliefRequest>("relief/fulfillment", { token: operator, body: { pledgeId, status } }));
    } catch (failure) {
      setError((failure as Error).message);
    } finally {
      setAdvancing(false);
    }
  }

  return (
    <section className="human-panel" aria-labelledby="relief-title">
      <h2 id="relief-title">Relief requests</h2>
      {error && <p role="alert">{error}</p>}
      {!token && <a className="human-link" href="/donor">Verify your phone to pledge</a>}
      <div className="human-actions human-queues" role="group" aria-label="Relief categories">
        {queues.map(({ id, label }) => (
          <button className="human-action" type="button" key={id} aria-pressed={queue === id} onClick={() => setQueue(id)}>{label}</button>
        ))}
      </div>
      <div className="human-grid">
        {requests.filter((request) => request.category === queue).map((request) => (
          <article className="human-card" key={request.id}>
            {request.meal && <small>{request.window} · {request.date} · Sri Lanka time</small>}
            <h3>{request.name}</h3>
            <p>{request.district} · {request.unit}</p>
            {request.destination && <p>{request.destination}</p>}
            <small>{request.status.replace(/_/g, " ")}</small>
            <ReliefProgress request={request} />
            {token && <PledgeForm request={request} token={token} onUpdate={update} />}
            {operator && request.remaining === 0 && request.allocations?.map((allocation) => (
              <div className="human-actions" key={allocation.id}>
                <small>{allocation.quantity} {request.unit} · {allocation.status.replace(/_/g, " ")}</small>
                {allocation.status !== "DELIVERED" && (
                  <button type="button" className="human-action" disabled={advancing} onClick={() => advance(
                    allocation.id, allocation.status === "PLEDGED" ? "IN_TRANSIT" : "DELIVERED",
                  )}>{allocation.status === "PLEDGED" ? "Mark in transit" : "Confirm delivery"}</button>
                )}
              </div>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}

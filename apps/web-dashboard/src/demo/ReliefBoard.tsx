import { useEffect, useRef, useState, type FormEvent } from "react";
import { demoRequest } from "./api";
import "./humanitarian.css";

export type ReliefRequest = {
  id: string;
  name: string;
  district: string;
  category: string;
  unit: string;
  required: number;
  pledged: number;
  remaining: number;
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

export function ReliefBoard({ token, onPledge }: { token?: string; onPledge?: () => void }) {
  const [requests, setRequests] = useState<ReliefRequest[]>([]);
  const [error, setError] = useState("");

  function refresh() {
    demoRequest<ReliefRequest[]>("relief/requests").then(setRequests, (failure: Error) => setError(failure.message));
  }

  useEffect(refresh, []);

  function update(updated: ReliefRequest) {
    setRequests((current) => current.map((request) => request.id === updated.id ? updated : request));
    onPledge?.();
  }

  return (
    <section className="human-panel" aria-labelledby="relief-title">
      <h2 id="relief-title">Relief requests</h2>
      {error && <p role="alert">{error}</p>}
      {!token && <a className="human-link" href="/donor">Verify your phone to pledge</a>}
      <div className="human-grid">
        {requests.map((request) => (
          <article className="human-card" key={request.id}>
            {request.meal && <small>{request.window} · {request.date} · Sri Lanka time</small>}
            <h3>{request.name}</h3>
            <p>{request.district} · {request.unit}</p>
            <ReliefProgress request={request} />
            {token && <PledgeForm request={request} token={token} onUpdate={update} />}
          </article>
        ))}
      </div>
    </section>
  );
}

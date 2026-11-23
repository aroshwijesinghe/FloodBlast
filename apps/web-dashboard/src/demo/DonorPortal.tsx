import { LanguageSwitcher } from "../components/shared/LanguageSwitcher";
import { useTranslation } from "../i18n";
import { useState, type FormEvent } from "react";
import { demoRequest } from "./api";
import { ReliefBoard } from "./ReliefBoard";
import { DonorHistory } from "./DonorHistory";
import "./humanitarian.css";

type Donor = { phone: string; token: string };
type Challenge = { phone: string; demoCode: string; expiresIn: number };
const sessionKey = "fb.demo.donor";

export function DonorPortal() {
  const { t } = useTranslation();
  const [donor, setDonor] = useState<Donor | null>(() => JSON.parse(sessionStorage.getItem(sessionKey) || "null"));
  const [phone, setPhone] = useState("+94");
  const [challenge, setChallenge] = useState<Challenge>();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [revision, setRevision] = useState(0);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (!challenge) {
        setChallenge(await demoRequest<Challenge>("donors/otp", { body: { phone } }));
      } else {
        const verified = await demoRequest<Donor>("donors/verify", { body: { phone: challenge.phone, code } });
        sessionStorage.setItem(sessionKey, JSON.stringify(verified));
        setDonor(verified);
      }
    } catch (failure) {
      setError((failure as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    if (donor) await demoRequest("donors/sign-out", { body: {}, token: donor.token }).catch(() => {});
    sessionStorage.removeItem(sessionKey);
    setDonor(null);
    setChallenge(undefined);
    setCode("");
    setError("");
  }

  return (
    <main className="workspace">
      <div className="work-body humanitarian">
        <div className="donor-toolbar"><a className="human-link" href="/login">{t("Operations sign-in")}</a><LanguageSwitcher /></div>
        <h1>{t("Donor portal")}</h1>
        {donor ? (
          <section className="human-panel">
            <p>{t("Verified demo donor")}</p>
            <strong>{donor.phone}</strong>
            <button type="button" className="human-action" onClick={signOut}>{t("Sign out")}</button>
          </section>
        ) : (
          <section className="human-panel">
            <h2>{t("Verify your phone number")}</h2>
            <p>{t("Use a sample +94 number for this local demo. The SMS simulator displays your code here.")}</p>
            <form onSubmit={submit} className="human-form">
              {challenge ? (
                <>
                  <p role="status">{t("Code for {phone}", { phone: challenge.phone })} · <strong>{challenge.demoCode}</strong></p>
                  <label>{t("Verification code")}
                    <input value={code} onChange={(event) => setCode(event.target.value)} pattern="[0-9]{6}" inputMode="numeric" autoComplete="one-time-code" required />
                  </label>
                </>
              ) : (
                <label>{t("Sri Lankan mobile number")}
                  <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" placeholder="+94771234567" required />
                </label>
              )}
              {error && <p role="alert">{t(error)}</p>}
              <div className="human-actions">
                <button className="primary" disabled={busy}>{t(challenge ? "Verify code" : "Get demo code")}</button>
                {challenge && <button type="button" className="human-action" disabled={busy} onClick={() => { setChallenge(undefined); setCode(""); setError(""); }}>{t("Change number or resend")}</button>}
              </div>
            </form>
          </section>
        )}
        {donor && <>
          <ReliefBoard token={donor.token} onPledge={() => setRevision((value) => value + 1)} />
          <DonorHistory token={donor.token} revision={revision} />
        </>}
      </div>
    </main>
  );
}

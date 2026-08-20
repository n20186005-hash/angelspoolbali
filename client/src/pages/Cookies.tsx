/**
 * Style reminder: Tide Field Guide — direct preference controls, no modal, with clear consent states.
 */
import { useState } from "react";
import LegalShell from "@/components/LegalShell";

export default function Cookies() {
  const [analytics, setAnalytics] = useState(() => localStorage.getItem("ab-analytics") === "granted");
  const save = () => {
    localStorage.setItem("ab-cookie-choice", "saved");
    localStorage.setItem("ab-analytics", analytics ? "granted" : "denied");
    window.dispatchEvent(new Event("cookiePreferenceUpdated"));
  };

  return (
    <LegalShell page="cookies">
      {(language) => (
        <>
          <p className="legal-lead">{language === "id" ? "Pilih data opsional yang boleh digunakan. Cookie esensial tetap aktif agar pengaturan ini dapat disimpan." : "Choose which optional data may be used. Essential cookies remain active so this choice can be stored."}</p>
          <div className="preference-list">
            <div className="preference-row"><div><h2>{language === "id" ? "Cookie esensial" : "Essential cookies"}</h2><p>{language === "id" ? "Diperlukan untuk menyimpan preferensi dasar situs." : "Needed to store the site’s basic preferences."}</p></div><span className="always-on">{language === "id" ? "Selalu aktif" : "Always on"}</span></div>
            <label className="preference-row"><div><h2>{language === "id" ? "Analitik" : "Analytics"}</h2><p>{language === "id" ? "Membantu kami memahami penggunaan situs secara agregat melalui Google Analytics." : "Helps us understand aggregate site use through Google Analytics."}</p></div><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} /></label>
          </div>
          <button className="coral-button" onClick={save}>{language === "id" ? "Simpan preferensi" : "Save preferences"}</button>
        </>
      )}
    </LegalShell>
  );
}

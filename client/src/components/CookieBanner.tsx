/**
 * Style reminder: Tide Field Guide — compact, factual consent strip using Swell Ink and coral action.
 */
import { Link } from "wouter";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [language, setLanguage] = useState<"id" | "en">(() => localStorage.getItem("ab-language") === "en" ? "en" : "id");

  useEffect(() => {
    setVisible(!localStorage.getItem("ab-cookie-choice"));
    const syncLanguage = () => setLanguage(localStorage.getItem("ab-language") === "en" ? "en" : "id");
    window.addEventListener("languagePreferenceUpdated", syncLanguage);
    return () => window.removeEventListener("languagePreferenceUpdated", syncLanguage);
  }, []);

  const choose = (analytics: "granted" | "denied") => {
    localStorage.setItem("ab-cookie-choice", "saved");
    localStorage.setItem("ab-analytics", analytics);
    window.dispatchEvent(new Event("cookiePreferenceUpdated"));
    setVisible(false);
  };

  if (!visible) return null;

  const text = language === "id"
    ? { body: "Kami menggunakan cookie esensial. Analitik hanya aktif bila Anda menyetujuinya.", manage: "Kelola preferensi", reject: "Tolak", allow: "Izinkan analitik" }
    : { body: "We use essential cookies. Analytics activate only if you consent.", manage: "Manage preferences", reject: "Reject", allow: "Allow analytics" };

  return (
    <aside className="cookie-strip" aria-label={language === "id" ? "Pilihan cookie" : "Cookie choices"}>
      <p>
        {text.body}<Link href="/cookie"> {text.manage}</Link>
      </p>
      <div className="cookie-actions">
        <button className="text-button" onClick={() => choose("denied")}>{text.reject}</button>
        <button className="coral-button compact" onClick={() => choose("granted")}>{text.allow}</button>
      </div>
    </aside>
  );
}

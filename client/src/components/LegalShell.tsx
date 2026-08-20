/**
 * Style reminder: Tide Field Guide — legal pages remain editorial and quiet, with readable long-form rhythm.
 */
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

export type SiteLanguage = "id" | "en";

type Props = {
  page: "privacy" | "terms" | "cookies";
  children: (language: SiteLanguage) => ReactNode;
};

const pageNames = {
  privacy: { id: "Privasi", en: "Privacy" },
  terms: { id: "Ketentuan", en: "Terms" },
  cookies: { id: "Pengaturan Cookie", en: "Cookie settings" },
};

export default function LegalShell({ page, children }: Props) {
  const [language, setLanguage] = useState<SiteLanguage>(() =>
    localStorage.getItem("ab-language") === "en" ? "en" : "id",
  );

  useEffect(() => {
    localStorage.setItem("ab-language", language);
    document.documentElement.lang = language;
  }, [language]);

  return (
    <main className="legal-page">
      <header className="legal-header">
        <Link href="/" className="legal-brand">
          <img src="/manus-storage/angels-billabong-brand-mark_3dfa352f.png" alt="" />
          <span>Angel’s Billabong</span>
        </Link>
        <div className="lang-toggle" aria-label="Language">
          <button className={language === "id" ? "active" : ""} onClick={() => setLanguage("id")}>ID</button>
          <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
        </div>
      </header>
      <article className="legal-article">
        <p className="eyebrow">{language === "id" ? "INFORMASI SITUS" : "SITE INFORMATION"}</p>
        <h1>{pageNames[page][language]}</h1>
        {children(language)}
      </article>
    </main>
  );
}

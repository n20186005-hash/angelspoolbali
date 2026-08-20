/**
 * Style reminder: Tide Field Guide — quiet long-form information page with clear, non-commercial language.
 */
import LegalShell from "@/components/LegalShell";

export default function Privacy() {
  return (
    <LegalShell page="privacy">
      {(language) => language === "id" ? (
        <>
          <p className="legal-lead">Panduan independen ini mengumpulkan data minimum yang diperlukan agar situs dapat berfungsi dan dipahami dengan lebih baik.</p>
          <h2>Informasi yang kami kumpulkan</h2>
          <p>Kami dapat menerima data teknis dasar seperti alamat IP, jenis peramban, halaman yang dibuka, serta cookie dan teknologi serupa. Jika Anda menghubungi kami, informasi yang Anda kirimkan secara sukarela juga dapat diterima.</p>
          <h2>Bagaimana informasi digunakan</h2>
          <p>Data digunakan untuk menjaga situs berjalan, memahami pola penggunaan secara agregat, memperbaiki kejelasan konten, menanggapi permintaan, dan memenuhi kewajiban hukum yang berlaku.</p>
          <h2>Layanan pihak ketiga</h2>
          <p>Peta tersemat disediakan oleh Google Maps. Analitik Google hanya dimuat setelah persetujuan Anda. Masing-masing layanan memiliki kebijakan privasinya sendiri.</p>
          <h2>Hak Anda</h2>
          <p>Menurut GDPR dan aturan relevan lainnya, Anda dapat meminta akses, koreksi, penghapusan, atau pembatasan pemrosesan data pribadi Anda, serta mengajukan keluhan kepada otoritas yang berwenang.</p>
        </>
      ) : (
        <>
          <p className="legal-lead">This independent guide collects the minimum data needed to operate the site and understand how it can be made clearer.</p>
          <h2>Information we collect</h2>
          <p>We may receive basic technical information such as IP address, browser type, pages viewed, and cookies or similar technologies. Information you voluntarily send when contacting us may also be received.</p>
          <h2>How information is used</h2>
          <p>Data is used to keep the site operating, understand aggregate use, improve content clarity, respond to requests, and meet applicable legal obligations.</p>
          <h2>Third-party services</h2>
          <p>The embedded map is supplied by Google Maps. Google Analytics loads only after your consent. Each service has its own privacy policy.</p>
          <h2>Your rights</h2>
          <p>Under the GDPR and other relevant rules, you may request access, correction, deletion, or restricted processing of your personal data and may lodge a complaint with the appropriate authority.</p>
        </>
      )}
    </LegalShell>
  );
}

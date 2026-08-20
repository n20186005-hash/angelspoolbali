/**
 * Style reminder: Tide Field Guide — photographic coastline + asymmetric field labels; Indonesian is primary, English is fully parallel.
 */
import { useEffect, useState } from "react";
import { AlertTriangle, ArrowDownRight, Bath, BatteryCharging, CarFront, ChevronDown, CircleParking, Clock3, Compass, Landmark, MapPin, ShipWheel, Store, UtensilsCrossed, Wifi } from "lucide-react";
import CookieBanner from "@/components/CookieBanner";
import photoHero from "../../../assets/angels-billabong-real.jpeg";
import photoCoast from "../../../assets/nusa-penida-coast-1.jpg";
import photoCliff from "../../../assets/nusa-penida-coast-2.jpg";
import brandMark from "../../../assets/angels-billabong-brand-mark.png";
import safetySwell from "../../../assets/safety-swell.png";
import limestoneSection from "../../../assets/limestone-section.png";
import tidalContours from "../../../assets/tidal-contours.png";

type Language = "id" | "en";

const copy = {
  id: {
    nav: ["Ikhtisar", "Kunjungan", "Akses", "Peta", "FAQ"],
    safetyLabel: "Catatan keselamatan", safetyTitle: "Air yang tenang bukan berarti laut yang aman.",
    safetyText: "Jangan turun atau berenang di kolam. Gelombang dan arus dapat berubah tiba-tiba; ikuti semua penutupan serta arahan petugas di lokasi.",
    observeLabel: "KONDISI YANG PERLU DIAMATI", observeText: "Pilih titik pandang yang dibuka di lokasi. Jika ada ombak, batu basah, atau pembatas terpasang, mundur dan nikmati lanskap dari jalur yang aman.",
    protocolTitle: "Protokol lapangan: berhenti, amati, putuskan.", protocolText: "Sebelum meninggalkan parkir, lihat kondisi laut dari jalur atas. Jangan memakai sesi foto, jadwal kapal, atau kolam yang terlihat tenang sebagai alasan untuk melintasi pembatas. Sisakan waktu untuk kembali ke kendaraan dan pelabuhan sebelum cahaya berkurang.",
    explore: "Rencanakan kunjungan", location: "Sakti, Nusa Penida · Klungkung, Bali", 
    heroLead: "Kolam batu alami di tepi samudra, dibentuk erosi dan paling baik dipahami dari jarak yang aman.",
    fieldNote: "CATATAN LAPANGAN 01", aboutTitle: "Kolam pasang surut yang dibingkai batu kapur.",
    aboutText: "Angel’s Billabong berada di pesisir barat Nusa Penida, berdekatan dengan Broken Beach. Cekungan batu ini terhubung dengan laut terbuka; ketika kondisi laut tenang, permukaannya tampak seperti kolam tanpa tepi. Karakter alamnya justru menuntut kewaspadaan—gelombang dapat menyapu area batu tanpa banyak peringatan.",
    facts: [["Wilayah", "Sakti, Kecamatan Nusa Penida"], ["Tipe lanskap", "Kolam batu pesisir & tebing"], ["Kunjungi bersama", "Broken Beach / Pasih Uug"], ["Prinsip utama", "Amati dari area yang aman"]],
    visitKicker: "SEBELUM BERANGKAT", visitTitle: "Sesuaikan rencana dengan laut, bukan sebaliknya.",
    visitCards: [
      ["Waktu terbaik", "Datang pagi atau sore untuk cahaya yang lebih lembut dan sirkulasi pengunjung yang biasanya lebih nyaman. Kondisi air tetap menjadi penentu utama."],
      ["Durasi", "Sisihkan sekitar 1–2 jam untuk Angel’s Billabong dan Broken Beach, termasuk berjalan dari parkir dan berhenti di sudut pandang."],
      ["Tiket & biaya", "Retribusi kecil serta parkir dapat berlaku dan berubah. Bawa uang tunai secukupnya; konfirmasi nominal dan akses di lokasi."],
      ["Parkir", "Parkir umum berada dekat titik akses. Gunakan jalur pejalan kaki yang tersedia, kunci kendaraan, dan jangan menghalangi pintu masuk."],
    ],
    accessKicker: "AKSES DI PULAU", accessTitle: "Kapal membawa Anda ke Nusa Penida. Jalan pulau membawa Anda ke tepi batu.",
    routes: [
      ["01 · Bandara → pelabuhan", "Dari Bandara Internasional I Gusti Ngurah Rai (DPS), lanjutkan dengan kendaraan darat menuju pelabuhan penyeberangan di Bali. Sanur kerap menjadi titik berangkat yang umum; Kusamba atau Padang Bai dapat relevan tergantung rencana kapal dan kendaraan. Periksa waktu tempuh sesuai lalu lintas, bagasi, dan jadwal kedatangan Anda."],
      ["02 · Pelabuhan → Nusa Penida", "Seberangi laut dengan layanan kapal yang beroperasi menuju pelabuhan Nusa Penida. Jangan mengandalkan satu jadwal atau harga tetap: cuaca, kapasitas, pelabuhan tujuan, ketentuan bagasi, dan pembatalan dapat berubah. Simpan bukti pemesanan serta beri waktu cadangan sebelum koneksi berikutnya."],
      ["03 · Bus, taksi & pilihan realistis", "Tidak ada rute bus umum reguler hingga Angel’s Billabong dan layanan taksi argo atau aplikasi tidak boleh diasumsikan tersedia di pulau. Jika tidak menggunakan kendaraan sendiri, atur penjemputan pelabuhan atau kendaraan dengan pengemudi sebelum menyeberang; pilih sesuai jumlah penumpang dan kebutuhan aksesibilitas."],
      ["04 · Perjalanan terakhir ke lokasi", "Dari kawasan pelabuhan, rute barat menuju Sakti dan titik parkir membutuhkan waktu serta konsentrasi di jalan sempit, berbukit, dan kadang berubah kondisi. Pengemudi berpengalaman dapat menggunakan motor dengan helm dan alas kaki yang sesuai; untuk banyak pengunjung, kendaraan tertutup dengan pengemudi lebih mudah dikelola."],
    ],
    amenitiesTitle: "Kebutuhan praktis, tanpa rekomendasi komersial.",
    amenitiesText: "Fasilitas di kawasan wisata pulau dapat berubah. Anggap informasi berikut sebagai daftar kesiapan, bukan jaminan ketersediaan.",
    amenities: [["Parkir & jalur jalan kaki", "Parkir bersama dapat berada dekat akses Angel’s Billabong dan Broken Beach. Gunakan tempat yang ditentukan, simpan barang berharga, lalu lanjutkan dengan berjalan di jalur yang terbuka—bukan melalui batu atau batas pandang."], ["WC & area ganti", "Fasilitas dasar mungkin tersedia di kawasan akses, tetapi kebersihan, antrean, dan biaya kecil dapat berubah. Gunakan sebelum memasuki jalur tebing; jangan menganggap fasilitas khusus akan tersedia."], ["Makan & air minum", "Area wisata dan pusat permukiman dapat memiliki warung atau tempat makan sederhana. Bawa air minum isi ulang serta makanan ringan yang cukup; pilih layanan sesuai kebutuhan Anda tanpa mengandalkan rekomendasi operator tertentu."], ["Menginap & belanja kebutuhan", "Pilihan penginapan, toko kebutuhan harian, dan ATM lebih masuk akal dicari di area pelabuhan atau pusat desa sebelum menuju pesisir barat. Jika jadwal pulang kapal ketat, pertimbangkan bermalam daripada menambah perjalanan malam."], ["Bahan bakar & daya perangkat", "Isi bahan bakar, periksa ban, dan isi daya ponsel/power bank sebelum meninggalkan kawasan yang lebih ramai. Tidak semua tempat memiliki fasilitas pengisian daya, dan sinyal dapat berubah menurut lokasi."], ["Uang tunai & komunikasi", "Simpan uang tunai secukupnya untuk biaya kecil dan siapkan peta offline. Jaringan seluler dapat bervariasi; beri tahu rekan perjalanan tentang rute dan waktu kembali, terutama jika Anda bepergian mandiri."]],
    scienceKicker: "MEMBACA LANSKAP", scienceTitle: "Bukan kolam buatan—ini garis pantai yang terus bekerja.", scienceText: "Nusa Penida banyak memperlihatkan batu kapur pesisir. Di Angel’s Billabong, air laut dan gelombang berinteraksi dengan celah serta permukaan batu untuk membentuk cekungan alami di tepi tebing. Air yang tampak diam bukan perairan terpisah: cekungan ini tetap berada dalam sistem pantai terbuka.",
    scienceNotes: [["Proses", "Erosi laut membentuk cekungan batu di garis pantai."], ["Konteks", "Angel’s Billabong bersebelahan dengan Broken Beach; Pasih Uug adalah nama lokal untuk Broken Beach."], ["Yang belum dipastikan", "Situs ini tidak menemukan sumber otoritatif untuk legenda asal-usul nama “Angel’s Billabong”; karena itu, kami tidak menyajikan cerita lisan sebagai fakta."]],
    nearbyKicker: "DI SEKITAR SINI", nearbyTitle: "Tiga lanskap, satu sisi liar Nusa Penida.",
    nearby: [["Broken Beach / Pasih Uug", "Tebing melingkar dan lengkungan batu alam, hanya beberapa menit dari Angel’s Billabong."], ["Kelingking Beach", "Sudut pandang pesisir ikonis di barat pulau; rencanakan waktu perjalanan dan kondisi jalan."], ["Crystal Bay", "Teluk di sisi barat yang kerap dimasukkan ke rute satu hari, dengan karakter laut yang juga perlu diperiksa." ]],
    mapKicker: "ORIENTASI", mapTitle: "Temukan titik masuk, lalu ikuti penanda di lapangan.",
    faqKicker: "PERTANYAAN UMUM", faqTitle: "Jawaban singkat untuk keputusan yang lebih aman.",
    faqs: [["Apakah boleh berenang?", "Tidak dianjurkan untuk masuk ke kolam. Ikuti penutupan dan instruksi petugas; ombak dapat masuk tiba-tiba bahkan saat air terlihat tenang."], ["Berapa lama waktu yang dibutuhkan?", "Kebanyakan pengunjung menggabungkan Angel’s Billabong dan Broken Beach dalam satu pemberhentian sekitar 1–2 jam."], ["Apakah tempat ini cocok untuk anak-anak?", "Area tebing dan batu bisa licin. Anak-anak memerlukan pendampingan dekat setiap saat dan tidak boleh mendekati tepi."], ["Apa yang perlu dibawa?", "Air minum, perlindungan matahari, alas kaki dengan pijakan baik, uang tunai terbatas, dan ponsel yang terisi daya. Hindari sandal yang licin."], ["Apakah informasi biaya dan akses selalu sama?", "Tidak. Retribusi, akses, dan aturan keselamatan dapat berubah. Verifikasi di lokasi sebelum membuat rencana final."]],
    referencesLabel: "Rujukan", references: "Panduan akses penyeberangan dan tata kelola pulau merujuk pada materi publik Dinas Perhubungan Provinsi Bali, Dinas Pariwisata Kabupaten Klungkung, serta rencana tata ruang wilayah Kabupaten Klungkung. Konfirmasi ketentuan akses dan keselamatan selalu dilakukan di lokasi sebelum memasuki kawasan wisata.", footer: "Proyek panduan pengunjung independen dan nirlaba. Tidak berafiliasi dengan pemerintah, pengelola, atau organisasi resmi mana pun.",
    footerResearch: "Konteks lokasi dirangkum dari materi publik tentang Kabupaten Klungkung, Bali, dan pariwisata Indonesia; tidak memuat rekomendasi komersial.",
    privacy: "Privasi", terms: "Ketentuan", cookies: "Cookie", photoNotice: "Hak foto tetap berada pada fotografer atau pemegang hak terkait.",
  },
  en: {
    nav: ["Overview", "Visit", "Access", "Map", "FAQ"],
    safetyLabel: "Safety note", safetyTitle: "Calm water does not mean a safe sea.",
    safetyText: "Do not climb down or swim in the pool. Waves and currents can change suddenly; follow every closure and instruction from staff on site.",
    observeLabel: "CONDITIONS TO OBSERVE", observeText: "Use the viewing area opened on site. If there are waves, wet rock, or a barrier in place, step back and enjoy the landscape from the safe path.",
    protocolTitle: "Field protocol: stop, observe, decide.", protocolText: "Before leaving the parking area, read the sea from the upper path. Do not treat a calm-looking pool, a photo stop, or a boat schedule as a reason to cross a barrier. Leave enough time to return to your vehicle and harbour before light fades.",
    explore: "Plan your visit", location: "Sakti, Nusa Penida · Klungkung, Bali",
    heroLead: "A natural rock pool at the ocean’s edge, shaped by erosion and best understood from a safe distance.",
    fieldNote: "FIELD NOTE 01", aboutTitle: "A tidal basin framed by limestone.",
    aboutText: "Angel’s Billabong sits on Nusa Penida’s west coast, close to Broken Beach. This rock basin connects to the open sea; in calm conditions, its surface can resemble an infinity pool. Its natural character calls for caution—waves can sweep across the rock without much warning.",
    facts: [["Area", "Sakti, Nusa Penida District"], ["Landscape", "Coastal rock pool & cliff"], ["Pair it with", "Broken Beach / Pasih Uug"], ["Core principle", "Observe from a safe zone"]],
    visitKicker: "BEFORE YOU GO", visitTitle: "Let the sea set the plan—not the other way around.",
    visitCards: [["Best window", "Go in the morning or late afternoon for softer light and often more comfortable visitor flow. Water conditions are still the first consideration."], ["Time needed", "Allow around 1–2 hours for Angel’s Billabong and Broken Beach, including the walk from parking and time at the viewpoints."], ["Entry & costs", "A small retribution and parking fee may apply and may change. Bring limited cash and confirm the amount and access on site."], ["Parking", "Public parking is near the access point. Use the marked pedestrian route, secure your vehicle, and keep entrances clear."]],
    accessKicker: "ON-ISLAND ACCESS", accessTitle: "A boat takes you to Nusa Penida. Island roads take you to the rock edge.",
    routes: [["01 · Airport → harbour", "From I Gusti Ngurah Rai International Airport (DPS), continue by road to a Bali crossing harbour. Sanur is often a common departure point; Kusamba or Padang Bai may fit a different boat or vehicle plan. Check the travel time against traffic, luggage, and your arrival schedule."], ["02 · Harbour → Nusa Penida", "Cross with a boat service operating to a Nusa Penida harbour. Do not rely on one fixed timetable or fare: weather, capacity, destination harbour, baggage rules, and cancellations can change. Keep booking evidence and allow slack before your next connection."], ["03 · Bus, taxi & realistic options", "There is no regular public-bus route to Angel’s Billabong, and metered-taxi or ride-hailing availability should not be assumed on the island. If you are not self-driving, arrange a harbour pickup or a driver-led vehicle before crossing; match it to group size and accessibility needs."], ["04 · Final approach to the site", "From the harbour area, west-island roads towards Sakti and the parking point require time and attention on narrow, hilly routes whose conditions can vary. Experienced riders may use a scooter with helmet and appropriate footwear; for many visitors, an enclosed vehicle with a driver is easier to manage."]],
    amenitiesTitle: "Practical needs, without commercial recommendations.",
    amenitiesText: "Facilities around island attractions can change. Treat this as a preparedness checklist, not a guarantee of availability.",
    amenities: [["Parking & walking path", "Shared parking may sit near access to Angel’s Billabong and Broken Beach. Use the designated space, secure valuables, then continue only on the open path—not across rock or viewpoint boundaries."], ["Toilets & changing", "Basic facilities may be available near the access area, but cleanliness, queues, and small fees can change. Use them before taking the cliff path and do not assume specialist facilities are available."], ["Food & drinking water", "The visitor area and larger settlements may have simple food stalls or eateries. Carry enough refillable drinking water and a snack; choose services for your own needs without relying on endorsements from this guide."], ["Stays & everyday supplies", "Accommodation, daily-needs shops, and ATMs are more practical to arrange around harbour areas or village centres before heading west. If your boat return is tight, consider an overnight stay rather than adding a night journey."], ["Fuel & device power", "Refuel, check tyres, and charge your phone or power bank before leaving busier areas. Not every stop has charging access, and signal can vary by location."], ["Cash & communications", "Carry limited cash for small costs and prepare an offline map. Mobile coverage can vary; tell a travel companion your route and return time, especially when travelling independently."]],
    scienceKicker: "READING THE LANDSCAPE", scienceTitle: "Not a built pool—an active coastline.", scienceText: "Nusa Penida reveals extensive coastal limestone. At Angel’s Billabong, seawater and wave action interact with rock joints and surfaces to form a natural basin at the cliff edge. Water that looks still is not separate from the sea: the basin remains part of an open-coast system.",
    scienceNotes: [["Process", "Marine erosion forms a rock basin along the coast."], ["Context", "Angel’s Billabong sits beside Broken Beach; Pasih Uug is the local name used for Broken Beach."], ["What is not verified", "This guide did not find an authoritative source for a legend explaining the “Angel’s Billabong” name, so it does not present oral stories as fact."]],
    nearbyKicker: "NEARBY", nearbyTitle: "Three landscapes, one wilder side of Nusa Penida.",
    nearby: [["Broken Beach / Pasih Uug", "A circular cliff and natural rock arch, a few minutes from Angel’s Billabong."], ["Kelingking Beach", "An iconic west-island coastal viewpoint; leave adequate time for driving and road conditions."], ["Crystal Bay", "A west-side cove often added to a day route, with sea conditions that also need checking."]],
    mapKicker: "ORIENTATION", mapTitle: "Find the access point, then follow the signs on the ground.",
    faqKicker: "COMMON QUESTIONS", faqTitle: "Short answers for safer decisions.",
    faqs: [["Can I swim?", "Entering the pool is not recommended. Follow closures and staff instructions; waves can arrive suddenly even when the water looks calm."], ["How long should I allow?", "Most visitors combine Angel’s Billabong and Broken Beach in one stop of around 1–2 hours."], ["Is it suitable for children?", "The cliff and rock areas can be slippery. Children need close supervision at all times and should never approach the edge."], ["What should I bring?", "Drinking water, sun protection, shoes with good grip, limited cash, and a charged phone. Avoid slippery sandals."], ["Are access and fees always the same?", "No. Retribution, access, and safety rules can change. Verify locally before finalising your plans."]],
    referencesLabel: "References", references: "Crossing and on-island access guidance is drawn from public material issued by the Bali Provincial Transport Agency, the Klungkung Regency Tourism Office, and the Klungkung Regency spatial plan. Access and safety rules should always be confirmed on site before entering any visitor area.", footer: "An independent, non-profit visitor information project. It is not affiliated with any government authority, operator, or official organisation.",
    footerResearch: "Location context is summarised from publicly available material concerning Klungkung Regency, Bali, and Indonesian tourism; it contains no commercial recommendations.",
    privacy: "Privacy", terms: "Terms", cookies: "Cookies", photoNotice: "Photo copyrights remain with their respective photographers or rights holders.",
  },
};

function addAnalytics() {
  if (document.getElementById("ga4-script")) return;
  const script = document.createElement("script");
  script.id = "ga4-script";
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-HXM22WWPKP";
  document.head.appendChild(script);
  const global = window as typeof window & { dataLayer?: unknown[] };
  global.dataLayer = global.dataLayer || [];
  global.dataLayer.push(new Date(), ["config", "G-HXM22WWPKP"]);
}

export default function Home() {
  const [language, setLanguage] = useState<Language>(() => localStorage.getItem("ab-language") === "en" ? "en" : "id");
  const t = copy[language];

  useEffect(() => {
    localStorage.setItem("ab-language", language);
    document.documentElement.lang = language;
    window.dispatchEvent(new Event("languagePreferenceUpdated"));
  }, [language]);

  useEffect(() => {
    const syncAnalytics = () => {
      if (localStorage.getItem("ab-analytics") === "granted") addAnalytics();
    };
    syncAnalytics();
    window.addEventListener("cookiePreferenceUpdated", syncAnalytics);
    return () => window.removeEventListener("cookiePreferenceUpdated", syncAnalytics);
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: "Angel’s Billabong",
    description: t.heroLead,
    address: { "@type": "PostalAddress", addressLocality: "Sakti", addressRegion: "Bali", postalCode: "80771", addressCountry: "ID" },
    geo: { "@type": "GeoCoordinates", latitude: -8.733500291280242, longitude: 115.44639851246426 },
    openingHours: "Mo-Su daylight hours recommended; access follows local conditions",
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.5", bestRating: "5", reviewCount: "700" },
    isAccessibleForFree: false,
  };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: t.faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };

  return (
    <div className="site-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Angel’s Billabong home"><img src={brandMark} alt="" /><span>Angel’s<br />Billabong</span></a>
        <nav aria-label="Primary navigation">{t.nav.map((item, index) => <a href={["#about", "#visit", "#access", "#map", "#faq"][index]} key={item}>{item}</a>)}</nav>
        <div className="lang-toggle" aria-label="Language"><button className={language === "id" ? "active" : ""} onClick={() => setLanguage("id")}>ID</button><button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button></div>
      </header>

      <main id="top">
        <section className="hero">
          <img className="hero-photo" src={photoHero} alt={language === "id" ? "Kolam batu Angel’s Billabong di pesisir Nusa Penida" : "Angel’s Billabong rock pool on the Nusa Penida coast"} />
          <div className="hero-wash" />
          <div className="hero-grid"><p className="hero-location"><MapPin size={15} /> {t.location}</p><div className="hero-content"><p className="eyebrow light">NUSA PENIDA · BALI</p><h1>Angel’s<br /><em>Billabong</em></h1><p>{t.heroLead}</p><a className="coral-button" href="#visit">{t.explore} <ArrowDownRight size={17} /></a></div><p className="hero-index">07° 8′ S · 115° 27′ E</p></div>
        </section>

        <section className="safety-band" aria-label={t.safetyLabel}>
          <div className="safety-icon"><AlertTriangle size={25} /></div><div><p className="eyebrow coral">{t.safetyLabel}</p><h2>{t.safetyTitle}</h2></div><p>{t.safetyText}</p><img src={safetySwell} alt="" />
        </section>

        <aside className="field-protocol" aria-label={t.protocolTitle}><span>△</span><div><p className="eyebrow coral">FIELD PROTOCOL · 00</p><h2>{t.protocolTitle}</h2></div><p>{t.protocolText}</p></aside>

        <section className="section about-section" id="about" data-field="OBSERVED · 01">
          <div className="section-rail"><span>01</span><div /><span>{t.fieldNote}</span></div>
          <div className="about-copy"><p className="eyebrow">{t.fieldNote}</p><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p></div>
          <div className="fact-list">{t.facts.map(([label, value]) => <div className="fact" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
          <figure className="side-art"><img src={limestoneSection} alt="" /><figcaption>{language === "id" ? "Bentuk batu pesisir berubah bersama pasang surut." : "Coastal rock forms change with the tide."}</figcaption></figure>
        </section>

        <section className="section interpret-section" data-field="LANDSCAPE NOTE · 01A">
          <div className="interpret-heading"><p className="eyebrow">{t.scienceKicker}</p><h2>{t.scienceTitle}</h2><p>{t.scienceText}</p></div>
          <div className="science-notes">{t.scienceNotes.map(([label, text], index) => <article key={label}><span>0{index + 1}</span><div><p>{label}</p><strong>{text}</strong></div></article>)}</div>
        </section>

        <section className="section visit-section" id="visit" data-field="TIDE WINDOW · 02">
          <div className="section-heading"><p className="eyebrow">{t.visitKicker}</p><h2>{t.visitTitle}</h2><img src={tidalContours} alt="" /></div>
          <aside className="tide-note"><AlertTriangle size={18} /><div><p>{t.observeLabel}</p><strong>{t.observeText}</strong></div></aside>
          <div className="visit-cards">{t.visitCards.map(([title, text], i) => <article key={title} className="visit-card"><span>0{i + 1}</span><Clock3 size={23} /><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section className="section access-section" id="access" data-field="ACCESS · 03">
          <figure className="access-photo"><img src={photoCoast} alt={language === "id" ? "Pesisir Nusa Penida" : "Nusa Penida coastline"} /><figcaption>{language === "id" ? "KONTEKS MEDAN · Pesisir Nusa Penida; bukan foto titik akses." : "TERRAIN CONTEXT · Nusa Penida coast; not the access point."}</figcaption></figure>
          <div className="access-content"><p className="eyebrow">{t.accessKicker}</p><h2>{t.accessTitle}</h2>{t.routes.map(([title, text], i) => <article className="route" key={title}>{[<Landmark key="airport" />, <ShipWheel key="boat" />, <Compass key="transit" />, <CarFront key="car" />][i]}<div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
        </section>

        <section className="section amenity-section" data-field="PREPAREDNESS · 04">
          <div className="amenity-header"><p className="eyebrow">CHECKLIST</p><h2>{t.amenitiesTitle}</h2><p>{t.amenitiesText}</p></div>
          <div className="amenities">{t.amenities.map(([title, text], i) => <article key={title}>{[<CircleParking key="parking" />, <Bath key="toilet" />, <UtensilsCrossed key="food" />, <Store key="shop" />, <BatteryCharging key="power" />, <Wifi key="signal" />][i]}<h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section className="section nearby-section" data-field="COASTLINE · 05">
          <div className="nearby-copy"><p className="eyebrow light">{t.nearbyKicker}</p><h2>{t.nearbyTitle}</h2><p>{language === "id" ? "Pertimbangkan cuaca, sisa cahaya, dan kebutuhan kembali ke pelabuhan sebelum menambah pemberhentian." : "Consider weather, remaining daylight, and your return to the harbour before adding another stop."}</p></div>
          <figure className="nearby-photo"><img src={photoCliff} alt={language === "id" ? "Tebing pantai Nusa Penida" : "Nusa Penida coastal cliffs"} /><figcaption>{language === "id" ? "KONTEKS LANSKAP · Pesisir Nusa Penida; bukan jalur yang ditentukan." : "LANDSCAPE CONTEXT · Nusa Penida coast; not a prescribed route."}</figcaption></figure>
          <div className="nearby-list">{t.nearby.map(([title, text], i) => <article key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
        </section>

        <section className="section map-section" id="map" data-field="LOCATION · 06">
          <div className="map-copy"><p className="eyebrow">{t.mapKicker}</p><h2>{t.mapTitle}</h2><p>{language === "id" ? "Peta membantu orientasi awal. Di lokasi, tanda keselamatan dan arahan petugas selalu lebih diutamakan daripada rencana digital." : "The map helps with initial orientation. On site, safety signs and staff directions always take priority over a digital plan."}</p><a href="https://maps.app.goo.gl/q5r1R672tXpLuvRP8" target="_blank" rel="noreferrer" className="map-link">Google Maps <ArrowDownRight size={16} /></a></div>
          <div className="map-frame"><iframe title="Peta Angel’s Billabong" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6819.068146832992!2d115.44639851246426!3d-8.733500291280242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd26f817e9cb20b%3A0x168ba6d3daf31579!2sAngel&#39;s%20Billabong!5e1!3m2!1szh-CN!2sjp!4v1787147316011!5m2!1szh-CN!2sjp" width="600" height="450" style="border:0;" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" /></div>
        </section>

        <section className="section faq-section" id="faq" data-field="FIELD FAQ · 07"><div className="faq-header"><p className="eyebrow">{t.faqKicker}</p><h2>{t.faqTitle}</h2></div><div className="faq-list">{t.faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={20} /></summary><p>{answer}</p></details>)}</div></section>

        <section className="references-section"><p>{t.referencesLabel}</p><p>{t.references}</p></section>
      </main>

      <footer className="footer"><div className="footer-brand"><img src={brandMark} alt="" /><span>Angel’s Billabong<br /><em>Field Guide</em></span></div><div><p>{t.footer}</p><p>{t.footerResearch}</p><p className="photo-note">{t.photoNotice}</p></div><div className="footer-links"><a href="/privacy">{t.privacy}</a><a href="/terms">{t.terms}</a><a href="/cookie">{t.cookies}</a></div><p className="copyright">© 2026 Angel’s Billabong · Klungkung, Bali</p></footer>
      <CookieBanner />
    </div>
  );
}

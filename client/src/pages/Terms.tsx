/**
 * Style reminder: Tide Field Guide — independent, factual terms page with a calm editorial hierarchy.
 */
import LegalShell from "@/components/LegalShell";

export default function Terms() {
  return (
    <LegalShell page="terms">
      {(language) => language === "id" ? (
        <>
          <p className="legal-lead">Dengan menggunakan situs ini, Anda memahami bahwa ini adalah panduan informasi pihak ketiga yang independen.</p>
          <h2>Penggunaan konten</h2>
          <p>Konten disediakan untuk tujuan informasi. Situs ini tidak berafiliasi dengan Angel’s Billabong, pemerintah, atau operator komersial mana pun.</p>
          <h2>Ketepatan informasi</h2>
          <p>Kondisi laut, akses, biaya, fasilitas, dan arahan petugas dapat berubah. Kami berupaya membuat informasi berguna, tetapi tidak menjamin kelengkapan atau ketepatannya. Selalu konfirmasi hal penting di lokasi atau melalui kanal resmi sebelum berangkat.</p>
          <h2>Hak cipta</h2>
          <p>Desain dan tulisan orisinal situs dilindungi. Hak cipta foto tetap berada pada fotografer atau pemegang hak terkait; gunakan kembali hanya sesuai izin sumbernya.</p>
          <h2>Batas tanggung jawab</h2>
          <p>Situs disediakan “sebagaimana adanya”. Kami tidak bertanggung jawab atas kehilangan atau keputusan perjalanan yang diambil berdasarkan informasi di sini. Jangan memasuki area air atau tepi batu yang dibatasi.</p>
        </>
      ) : (
        <>
          <p className="legal-lead">By using this site, you understand that it is an independent third-party information guide.</p>
          <h2>Content use</h2>
          <p>Content is provided for information only. This site is not affiliated with Angel’s Billabong, any government body, or any commercial operator.</p>
          <h2>Information accuracy</h2>
          <p>Sea conditions, access, fees, facilities, and staff directions can change. We aim to make this information useful but do not guarantee completeness or accuracy. Confirm important details on site or through official channels before travelling.</p>
          <h2>Copyright</h2>
          <p>Original writing and design are protected. Photo copyrights remain with their respective photographers or rights holders; reuse only where the source permits it.</p>
          <h2>Limitation of liability</h2>
          <p>The site is provided “as is”. We accept no responsibility for loss or travel decisions based on this information. Do not enter restricted water or cliff-edge areas.</p>
        </>
      )}
    </LegalShell>
  );
}

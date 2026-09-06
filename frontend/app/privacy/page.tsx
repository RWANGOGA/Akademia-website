import Link from "next/link";
import Header from "@/components/Header";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E3D] mb-6">Privacy &amp; Legal</h1>
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            DYNA WISDOM respects your privacy. We collect only the information necessary to respond to inquiries, deliver services, and improve our platforms.
          </p>
          <h2 className="text-xl font-bold text-[#0B1E3D]">Data Usage</h2>
          <p>
            Contact form submissions are sent to our team via email and are not stored for unrelated purposes. We do not sell or share personal data with third parties.
          </p>
          <h2 className="text-xl font-bold text-[#0B1E3D]">Cookies &amp; Analytics</h2>
          <p>
            Our site may use cookies and analytics to understand usage patterns. You can disable cookies in your browser settings.
          </p>
          <h2 className="text-xl font-bold text-[#0B1E3D]">Third-Party Services</h2>
          <p>
            We integrate third-party services such as AI providers, email delivery, and embedded maps. Each provider has its own privacy practices.
          </p>
          <h2 className="text-xl font-bold text-[#0B1E3D]">Contact</h2>
          <p>
            For privacy questions, contact us at <Link href="/contact" className="text-[#0B1E3D] underline">/contact</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}

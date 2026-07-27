"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { Phone, Mail, MapPin } from "lucide-react";

const DIRECTOR_EMAIL = "gen@akademia.co.jp";
const SECOND_EMAIL = "heike@akademia.co.jp";
const RECIPIENT_EMAILS = `${DIRECTOR_EMAIL},${SECOND_EMAIL}`;
const DIRECTOR_WHATSAPP = "819057563969"; // international format, no symbols
const DIRECTOR_PHONE_DISPLAY = "090-5756-3969";

const INQUIRY_TYPES = [
  "Finding a Solution / Product",
  "Partnership Inquiry",
  "Careers / Internship",
  "Press / Story Tip",
  "Account Help",
  "Other",
];

// Office location used in the map + contact details section below
const OFFICE_ADDRESS_LINES = [
  "Plot 2133, Tank Hill Road,",
  "Muyenga, Kampala, Uganda",
];
const OFFICE_LAT = 0.2990038;
const OFFICE_LNG = 32.6087117;
const OFFICE_MAPS_LINK = "https://maps.google.com/?cid=320021674925450370";
const OFFICE_PHONE_DISPLAY = "090-5756-3969";
const OFFICE_EMAIL_DISPLAY = "gen@akademia.co.jp";

type FormState = {
  inquiryType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  website: string;
  message: string;
  optIn: boolean;
};

const initialState: FormState = {
  inquiryType: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  companyName: "",
  website: "",
  message: "",
  optIn: false,
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate() {
    if (!form.inquiryType) return "Please select an inquiry type.";
    if (!form.firstName.trim()) return "Please enter your first name.";
    if (!form.lastName.trim()) return "Please enter your last name.";
    if (!form.email.trim()) return "Please enter your email.";
    if (!form.message.trim()) return "Please tell us a bit more.";
    return "";
  }

  function buildMessage() {
    return [
      `Inquiry Type: ${form.inquiryType}`,
      `Name: ${form.firstName} ${form.lastName}`,
      `Email: ${form.email}`,
      form.phone && `Phone: ${form.phone}`,
      form.companyName && `Company: ${form.companyName}`,
      form.website && `Website: ${form.website}`,
      "",
      "Message:",
      form.message,
    ]
      .filter(Boolean)
      .join("\n");
  }

  // Route inquiry via pre-filled email draft (mailto:)
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

    const subject = encodeURIComponent(
      `[Website Inquiry] ${form.inquiryType} — ${form.firstName} ${form.lastName}`
    );
    const body = encodeURIComponent(buildMessage());
    window.location.href = `mailto:${RECIPIENT_EMAILS}?subject=${subject}&body=${body}`;
  }

  // Route inquiry via WhatsApp
  function handleWhatsApp() {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    const text = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${DIRECTOR_WHATSAPP}?text=${text}`, "_blank");
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* HERO */}
      <section
        className="relative w-full overflow-hidden pt-28 sm:pt-32 md:pt-40 pb-24 md:pb-32 px-4 sm:px-6"
        style={{
          backgroundImage:
            "linear-gradient(rgba(11,30,61,0.65), rgba(11,30,61,0.75)), url('/images/image%20copy%2016.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-4 md:mb-6">
            Contact Us
          </h1>
          <div className="w-16 h-1 bg-yellow-400 rounded-full" />
        </div>
      </section>

      {/* FORM CARD */}
      <section className="relative px-4 sm:px-6 -mt-10 md:-mt-16 pb-16 md:pb-24">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl border border-slate-100 p-6 sm:p-8 md:p-12"
        >
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E3D] mb-2">
              How can we help you?
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Reach out below, and we&apos;ll be in touch.
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-500 mb-2">
              Inquiry Type<span className="text-red-500">*</span>
            </label>
            <select
              value={form.inquiryType}
              onChange={(e) => update("inquiryType", e.target.value)}
              className="w-full border border-slate-300 rounded-md px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">Select</option>
              {INQUIRY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-500 mb-2">
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                className="w-full border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-500 mb-2">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="w-full border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-500 mb-2">
                Last Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                className="w-full border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-500 mb-2">Company Name</label>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) => update("companyName", e.target.value)}
                className="w-full border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-500 mb-2">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-500 mb-2">Website</label>
              <input
                type="text"
                value={form.website}
                onChange={(e) => update("website", e.target.value)}
                className="w-full border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-500 mb-2">
              Tell Us More<span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              rows={7}
              className="w-full border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
            />
          </div>

          <label className="flex items-start gap-3 mb-6 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={form.optIn}
              onChange={(e) => update("optIn", e.target.checked)}
              className="mt-1 w-4 h-4 accent-yellow-500"
            />
            I&apos;d like to receive occasional insights from DYNA WISDOM.
          </label>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 transition-colors text-slate-900 font-bold px-6 sm:px-8 py-3 rounded-md text-sm sm:text-base"
            >
              Submit
              <span aria-hidden>{"\u2192"}</span>
            </button>
            <button
              type="button"
              onClick={handleWhatsApp}
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] transition-colors text-white font-bold px-6 sm:px-8 py-3 rounded-md text-sm sm:text-base"
            >
              Chat on WhatsApp
              <span aria-hidden>{"\u2197"}</span>
            </button>
          </div>
        </form>
      </section>

      {/* ================= MAP + CONTACT DETAILS SECTION ================= */}
      <section className="w-full">
        <div className="flex flex-col md:flex-row w-full min-h-[520px]">
          {/* Map (left / main area) */}
          <div className="w-full md:w-2/3 min-h-[360px] md:min-h-[520px]">
            <iframe
              src={`https://maps.google.com/maps?q=${OFFICE_LAT},${OFFICE_LNG}&z=16&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "360px", display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Akademia Uganda Office Location"
            />
          </div>

          {/* Dark navy contact details sidebar (right) */}
          <div className="w-full md:w-1/3 bg-[#0B1E3D] text-white px-8 sm:px-10 py-12 sm:py-14 flex flex-col justify-center">
            <h3 className="text-2xl sm:text-3xl font-bold leading-snug mb-3">
              Reach us through our contact details.
            </h3>
            <div className="w-14 h-1 bg-yellow-400 rounded-full mb-8" />

            <div className="space-y-7">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
                  <Phone size={18} className="text-slate-900" />
                </div>
                <p className="font-bold text-base sm:text-lg pt-2">
                  {OFFICE_PHONE_DISPLAY}
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
                  <Mail size={18} className="text-slate-900" />
                </div>
                <p className="font-bold text-base sm:text-lg pt-2">
                  {OFFICE_EMAIL_DISPLAY}
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
                  <MapPin size={18} className="text-slate-900" />
                </div>
                <div className="font-bold text-base sm:text-lg leading-relaxed pt-2">
                  {OFFICE_ADDRESS_LINES.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                  
                  {/* FIXED: Added the missing <a tag here */}
                  <a
                    href={OFFICE_MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-yellow-400 font-semibold text-sm hover:text-yellow-300 transition-colors"
                  >
                    Get Directions {"\u2192"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT HAPPENS NEXT ================= */}
      <section className="bg-slate-100 py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0B1E3D] mb-10 md:mb-14 tracking-tight">
            What happens next?
          </h2>

          <div className="space-y-6 sm:space-y-8">
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
              Having received and processed your request, we will reach you shortly to
              detail your project needs and sign an NDA (Non Disclosure Agreement ) to ensure the confidentiality of
              information.
            </p>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
              After examining requirements, our analysts and developers devise a project
              proposal with the scope of works, team size, time and cost estimates.
            </p>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
              We arrange a meeting with you to discuss the offer and come to an agreement.
            </p>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
              Once terms are settled, we kick off the engagement with a clear timeline, so
              you always know what to expect and when.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
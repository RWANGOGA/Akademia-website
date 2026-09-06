"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { Phone, Mail, MapPin, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const DIRECTOR_WHATSAPP = "819057563969";

const INQUIRY_TYPES = [
  "Finding a Solution / Product",
  "Partnership Inquiry",
  "Careers / Internship",
  "Press / Story Tip",
  "Account Help",
  "Other",
];

const OFFICE_ADDRESS_LINES = [
  "Plot 2133, Tank Hill Road,",
  "Muyenga, Kampala, Uganda",
];
const OFFICE_LAT = 0.2990038;
const OFFICE_LNG = 32.6087117;
const OFFICE_MAPS_LINK = "https://maps.google.com/?cid=320021674925450370";
const OFFICE_PHONE_DISPLAY = "090-5756-3969";
const OFFICE_EMAIL_DISPLAY = "ai-pod@akademia.sakura.ne.jp";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

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

  // Submit via backend API
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to send message");
      }

      setSubmitStatus("success");
      setStatusMessage(data.message || "Your message has been sent successfully!");
      setForm(initialState); // Reset form
    } catch (err) {
      setSubmitStatus("error");
      setStatusMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // WhatsApp handler (unchanged)
  function handleWhatsApp() {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    
    const text = encodeURIComponent(
      `Inquiry Type: ${form.inquiryType}\nName: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\n${form.phone ? `Phone: ${form.phone}\n` : ""}${form.companyName ? `Company: ${form.companyName}\n` : ""}${form.website ? `Website: ${form.website}\n` : ""}\nMessage:\n${form.message}`
    );
    window.open(`https://wa.me/${DIRECTOR_WHATSAPP}?text=${text}`, "_blank");
  }

  const inputClass = "w-full bg-slate-50 border border-slate-300 rounded-md px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white transition-colors";

  // Success State
  if (submitStatus === "success") {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <section className="flex items-center justify-center px-4 py-20 sm:py-32">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E3D] mb-4">
              Message Sent Successfully!
            </h1>
            <p className="text-slate-600 text-lg mb-8">
              {statusMessage}
            </p>
            <button
              onClick={() => setSubmitStatus("idle")}
              className="inline-flex items-center gap-2 bg-[#0B1E3D] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#162a4d] transition-colors"
            >
              Send Another Message
            </button>
          </div>
        </section>
      </div>
    );
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

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-800 border border-red-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          {/* Backend Error Message */}
          {submitStatus === "error" && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-800 border border-red-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span className="text-sm font-medium">{statusMessage}</span>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Inquiry Type<span className="text-red-500">*</span>
            </label>
            <select
              value={form.inquiryType}
              onChange={(e) => update("inquiryType", e.target.value)}
              className={inputClass}
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
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Last Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Company Name</label>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) => update("companyName", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Website</label>
              <input
                type="text"
                value={form.website}
                onChange={(e) => update("website", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Tell Us More<span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              rows={7}
              className={`${inputClass} resize-none`}
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

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 transition-colors text-slate-900 font-bold px-6 sm:px-8 py-3 rounded-md text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Submit
                  <span aria-hidden>{"\u2192"}</span>
                </>
              )}
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

      {/* MAP + CONTACT DETAILS (unchanged) */}
      <section className="w-full">
        <div className="flex flex-col md:flex-row w-full min-h-[520px]">
          <div className="w-full md:w-2/3 min-h-[360px] md:min-h-[520px]">
            <iframe
              src={`https://maps.google.com/maps?q=${OFFICE_LAT},${OFFICE_LNG}&z=16&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "360px", display: "block" }}
              allowFullScreen
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dyna Wisdom Office Location"
            />
          </div>

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
                  <a
                    href={OFFICE_MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-yellow-400 font-semibold text-sm hover:text-yellow-300 transition-colors"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT (unchanged) */}
      <section className="bg-slate-100 py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0B1E3D] mb-10 md:mb-14 tracking-tight">
            What happens next?
          </h2>

          <div className="space-y-6 sm:space-y-8">
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
              Having received and processed your request, we will reach you shortly to
              detail your project needs and sign an NDA (Non Disclosure Agreement) to ensure the confidentiality of
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
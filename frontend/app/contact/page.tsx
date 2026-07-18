"use client";

import { useState } from "react";
import Header from "@/components/Header";

const DIRECTOR_EMAIL = "gen@akademia.co.jp";
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

  // No backend/database yet — route every inquiry straight to the director
  // via a pre-filled email draft (mailto:) so nothing gets lost.
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
    window.location.href = `mailto:${DIRECTOR_EMAIL}?subject=${subject}&body=${body}`;
  }

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
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#5B3FE0] via-[#4433E8] to-[#2F6BF0] pt-40 pb-24 px-6">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[36rem] h-[36rem] rounded-full bg-white/10 blur-[80px]" />
          <div className="absolute top-0 left-1/3 w-[28rem] h-[28rem] rounded-full bg-white/10 blur-[100px]" />
          <div className="absolute -bottom-24 right-1/4 w-[32rem] h-[32rem] rounded-full bg-white/10 blur-[90px]" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            What Can We Help You With?
          </h1>
          <p className="text-white/90 font-semibold uppercase tracking-wide text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
            Whatever you need — a project inquiry, a partnership, a career question, or
            account help — tell us below and we&apos;ll get back to you within 1 business day.
          </p>
        </div>
      </section>

      {/* FORM CARD */}
      <section className="relative px-6 -mt-16 pb-24">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl border border-slate-100 p-8 md:p-12"
        >
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-500 mb-2">
              Inquiry Type<span className="text-red-500">*</span>
            </label>
            <select
              value={form.inquiryType}
              onChange={(e) => update("inquiryType", e.target.value)}
              className="w-full border border-slate-300 rounded-md px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              {INQUIRY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-500 mb-2">
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                className="w-full border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-500 mb-2">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="w-full border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-500 mb-2">
                Last Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                className="w-full border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-500 mb-2">Company Name</label>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) => update("companyName", e.target.value)}
                className="w-full border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-500 mb-2">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-500 mb-2">Website</label>
              <input
                type="text"
                value={form.website}
                onChange={(e) => update("website", e.target.value)}
                className="w-full border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <label className="flex items-start gap-3 mb-6 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={form.optIn}
              onChange={(e) => update("optIn", e.target.checked)}
              className="mt-1 w-4 h-4"
            />
            I&apos;d like to receive occasional insights from Akademia.
          </label>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 transition-colors text-white font-bold px-8 py-3 rounded-md"
            >
              Submit
              <span aria-hidden>→</span>
            </button>
            <button
              type="button"
              onClick={handleWhatsApp}
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] transition-colors text-white font-bold px-8 py-3 rounded-md"
            >
              Chat on WhatsApp
              <span aria-hidden>↗</span>
            </button>
          </div>

          <p className="text-xs text-slate-400 mt-6 leading-relaxed">
            Since we don&apos;t have an online submission system set up yet, Submit opens a
            pre-filled email to our director at {DIRECTOR_EMAIL}, and WhatsApp opens a chat with
            him directly at {DIRECTOR_PHONE_DISPLAY}. Either way, your inquiry reaches him
            straight away.
          </p>
        </form>
      </section>
    </div>
  );
}
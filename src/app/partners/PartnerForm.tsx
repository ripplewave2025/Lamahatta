"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { PartnerSlug } from "./paths";

type Props = {
  partnerType: PartnerSlug;
  submitLabel: string;
};

export default function PartnerForm({ partnerType, submitLabel }: Props) {
  const [form, setForm] = useState({
    name: "",
    org: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone.trim() && !form.email.trim()) return;
    setStatus("loading");
    try {
      const message = [
        form.name && `Name: ${form.name}`,
        form.org && `Org: ${form.org}`,
        form.email && `Email: ${form.email}`,
        form.message && `\n${form.message}`,
      ]
        .filter(Boolean)
        .join("\n");

      const { error } = await supabase.from("contact_requests").insert({
        phone: form.phone || form.email,
        message,
        type: `partner:${partnerType}`,
      });
      if (error) throw error;
      setStatus("ok");
      setForm({ name: "", org: "", phone: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "ok") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-[2rem] border border-amber-200 bg-amber-50/60 p-10 text-center"
      >
        <CheckCircle2 className="mx-auto h-10 w-10 text-amber-600" />
        <h3 className="mt-4 font-serif text-2xl text-stone-900">
          Thank you. The Samaj Head will be in touch.
        </h3>
        <p className="mt-3 text-sm text-stone-600">
          We answer every enquiry personally — usually within 48 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[2rem] border border-stone-200 bg-white/90 p-7 shadow-[0_18px_45px_rgba(0,0,0,0.06)] backdrop-blur sm:p-9"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" required>
          <input
            type="text"
            value={form.name}
            onChange={onChange("name")}
            required
            placeholder="Indra Rai"
            className="input"
          />
        </Field>
        <Field label="Organisation">
          <input
            type="text"
            value={form.org}
            onChange={onChange("org")}
            placeholder="Department / Company / NGO"
            className="input"
          />
        </Field>
        <Field label="Phone" required>
          <input
            type="tel"
            value={form.phone}
            onChange={onChange("phone")}
            required
            placeholder="+91 98765 43210"
            className="input"
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            value={form.email}
            onChange={onChange("email")}
            placeholder="you@example.com"
            className="input"
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="A line or two about what you have in mind">
          <textarea
            value={form.message}
            onChange={onChange("message")}
            rows={4}
            placeholder="The shorter, the better. We will call you to discuss."
            className="input resize-none"
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-stone-950 px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-amber-200 transition hover:bg-stone-800 disabled:opacity-50 sm:w-auto sm:text-sm"
      >
        {status === "loading" ? "Sending…" : submitLabel}
        <ArrowRight className="h-4 w-4" />
      </button>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-600">
          Something went wrong. Please try again or WhatsApp the Samaj Head directly.
        </p>
      )}

      <p className="mt-4 text-[11px] leading-relaxed text-stone-500">
        We store this enquiry so the Samaj can respond. See our{" "}
        <a href="/privacy" className="font-semibold text-stone-700 underline">
          Privacy Policy
        </a>
        .
      </p>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 0.85rem;
          border: 1px solid #e7e5e4;
          background: #fafaf9;
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
          color: #1c1917;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        :global(.input::placeholder) { color: #a8a29e; }
        :global(.input:focus) {
          outline: none;
          background: #ffffff;
          border-color: #f59e0b;
          box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.15);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
        {label}
        {required && <span className="ml-1 text-amber-600">*</span>}
      </span>
      {children}
    </label>
  );
}

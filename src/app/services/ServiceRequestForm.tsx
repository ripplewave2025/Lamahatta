"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { ServiceSlug } from "./services";

type Props = {
  serviceSlug: ServiceSlug;
  submitLabel: string;
};

export default function ServiceRequestForm({ serviceSlug, submitLabel }: Props) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    brief: "",
    when: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );

  const onChange = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone.trim() && !form.email.trim()) return;
    setStatus("loading");
    try {
      const message = [
        form.name && `Name: ${form.name}`,
        form.email && `Email: ${form.email}`,
        form.when && `When: ${form.when}`,
        form.brief && `\nBrief:\n${form.brief}`,
      ]
        .filter(Boolean)
        .join("\n");

      const { error } = await supabase.from("contact_requests").insert({
        phone: form.phone || form.email,
        message,
        type: `service:${serviceSlug}`,
      });
      if (error) throw error;
      setStatus("ok");
      setForm({ name: "", phone: "", email: "", brief: "", when: "" });
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
          Got it. We'll be in touch with a quote.
        </h3>
        <p className="mt-3 text-sm text-stone-600">
          Usually within 48 hours — sometimes much faster.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[2rem] border border-stone-200 bg-white/95 p-7 shadow-[0_18px_45px_rgba(0,0,0,0.06)] backdrop-blur sm:p-9"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" required>
          <input
            type="text"
            value={form.name}
            onChange={onChange("name")}
            required
            placeholder="Indra Rai"
            className="srv-input"
          />
        </Field>
        <Field label="When (date / month / 'flexible')">
          <input
            type="text"
            value={form.when}
            onChange={onChange("when")}
            placeholder="e.g. 12 Aug, or 'second week of October'"
            className="srv-input"
          />
        </Field>
        <Field label="Phone" required>
          <input
            type="tel"
            value={form.phone}
            onChange={onChange("phone")}
            required
            placeholder="+91 98765 43210"
            className="srv-input"
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            value={form.email}
            onChange={onChange("email")}
            placeholder="you@example.com"
            className="srv-input"
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Brief — what do you need, for how many, where?">
          <textarea
            value={form.brief}
            onChange={onChange("brief")}
            rows={4}
            placeholder="A few lines is fine. We'll call to discuss."
            className="srv-input resize-none"
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
          Something went wrong. Please try again or WhatsApp us directly.
        </p>
      )}

      <p className="mt-4 text-[11px] leading-relaxed text-stone-500">
        We store this request so we can quote and follow up. See our{" "}
        <a href="/privacy" className="font-semibold text-stone-700 underline">
          Privacy Policy
        </a>
        .
      </p>

      <style jsx>{`
        :global(.srv-input) {
          width: 100%;
          border-radius: 0.85rem;
          border: 1px solid #e7e5e4;
          background: #fafaf9;
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
          color: #1c1917;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        :global(.srv-input::placeholder) { color: #a8a29e; }
        :global(.srv-input:focus) {
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

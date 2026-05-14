"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

/**
 * Normalize a phone string into E.164-ish form.
 *  - Strips spaces, dashes, parens, dots
 *  - Ensures leading +
 * Does NOT do country-specific validation — caller is responsible for
 * collecting an internationally-formatted number.
 */
function normalizePhone(raw: string): string | null {
  const cleaned = raw.replace(/[\s\-().]/g, "");
  if (!cleaned) return null;
  const withPlus = cleaned.startsWith("+") ? cleaned : `+${cleaned}`;
  // 8–15 digits (E.164 max is 15)
  if (!/^\+\d{8,15}$/.test(withPlus)) return null;
  return withPlus;
}

function phoneToSyntheticEmail(phone: string): string {
  // +919876543210 → phone-919876543210@sunaraygoan.local
  return `phone-${phone.replace(/^\+/, "")}@sunaraygoan.local`;
}

export type PhoneSignUpResult =
  | { ok: true }
  | { ok: false; message: string };

/**
 * Self-signup with phone + password. No OTP. Auto-confirmed.
 * On success, the user is signed in via cookies (no separate sign-in step).
 *
 * Phone is stored as both:
 *   - synthesized email on auth.users (so signInWithPassword works)
 *   - profiles.phone (the real, visible value)
 */
export async function signUpWithPhone(input: {
  phone: string;
  password: string;
  fullName: string;
}): Promise<PhoneSignUpResult> {
  const phone = normalizePhone(input.phone);
  if (!phone) {
    return {
      ok: false,
      message:
        "Phone number looks wrong. Use international format, e.g. +91 98765 43210.",
    };
  }
  const fullName = input.fullName.trim();
  if (!fullName) return { ok: false, message: "Please enter your name." };
  if (input.password.length < 6) {
    return { ok: false, message: "Password must be at least 6 characters." };
  }

  const admin = createAdminClient();
  const email = phoneToSyntheticEmail(phone);

  // 1. Make sure no profile already owns this phone (uniqueness on profiles.phone)
  const { data: existingProfile } = await admin
    .from("profiles")
    .select("id")
    .eq("phone", phone)
    .maybeSingle();
  if (existingProfile) {
    return {
      ok: false,
      message: "An account with this phone number already exists. Try signing in.",
    };
  }

  // 2. Create the auth user with the synthesized email + auto-confirmed
  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email,
    password: input.password,
    email_confirm: true,
    user_metadata: { full_name: fullName, phone, role: "villager" },
  });
  if (createErr || !created.user) {
    return {
      ok: false,
      message:
        createErr?.message?.includes("already")
          ? "This phone number is already registered."
          : createErr?.message ?? "Couldn't create the account.",
    };
  }

  // 3. The on_auth_user_created trigger has now inserted a profile row.
  //    Patch in the phone (the trigger doesn't know about it).
  const { error: profileErr } = await admin
    .from("profiles")
    .update({ phone, full_name: fullName })
    .eq("id", created.user.id);
  if (profileErr) {
    return { ok: false, message: profileErr.message };
  }

  // 4. Sign in immediately so cookies are set; client can router.push('/dashboard').
  const supabase = await createClient();
  const { error: signInErr } = await supabase.auth.signInWithPassword({
    email,
    password: input.password,
  });
  if (signInErr) {
    return { ok: false, message: signInErr.message };
  }

  return { ok: true };
}

/**
 * Sign in with phone + password (no OTP). Phone is mapped to the same
 * synthesized email used during signup.
 */
export async function signInWithPhone(input: {
  phone: string;
  password: string;
}): Promise<PhoneSignUpResult> {
  const phone = normalizePhone(input.phone);
  if (!phone) {
    return { ok: false, message: "Phone number looks wrong." };
  }
  const email = phoneToSyntheticEmail(phone);
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: input.password,
  });
  if (error) {
    return { ok: false, message: "Wrong phone or password." };
  }
  return { ok: true };
}

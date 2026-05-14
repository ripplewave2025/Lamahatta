"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/getProfile";
import { createAdminClient } from "@/lib/supabase/admin";

function randomPassword() {
  // 12 chars, mixed case + digits, browser-friendly
  const alphabet = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let pw = "";
  for (let i = 0; i < 12; i++) pw += alphabet[Math.floor(Math.random() * alphabet.length)];
  return pw;
}

export async function inviteHouseholdHead(input: {
  hhCode: string;
  email: string;
  fullName: string;
}): Promise<{ ok: true; tempPassword: string } | { ok: false; message: string }> {
  await requireAdmin();

  const email = input.email.trim().toLowerCase();
  const fullName = input.fullName.trim();
  if (!email || !fullName) return { ok: false, message: "Email and name are required." };

  const admin = createAdminClient();

  const { data: hh } = await admin
    .from("households")
    .select("id")
    .eq("hh_code", input.hhCode)
    .single();
  if (!hh) return { ok: false, message: `Household ${input.hhCode} not found.` };

  const tempPassword = randomPassword();
  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email,
    password: tempPassword,
    email_confirm: true,
    user_metadata: { full_name: fullName, role: "villager" },
  });
  if (createErr || !created.user) {
    return { ok: false, message: createErr?.message ?? "Could not create user." };
  }

  // The on_auth_user_created trigger created a default profile row.
  // Update it with the household link + name.
  const { error: profErr } = await admin
    .from("profiles")
    .update({ full_name: fullName, household_id: hh.id, role: "villager" })
    .eq("id", created.user.id);
  if (profErr) return { ok: false, message: profErr.message };

  revalidatePath("/dashboard/admin/households");
  return { ok: true, tempPassword };
}

export async function promoteToAdmin(userId: string) {
  await requireAdmin();
  const admin = createAdminClient();
  const { error } = await admin.from("profiles").update({ role: "admin" }).eq("id", userId);
  if (error) return { ok: false, message: error.message };
  revalidatePath("/dashboard/admin/households");
  return { ok: true };
}

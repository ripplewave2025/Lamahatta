"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/getProfile";

export async function approveRequest(reqId: string, note?: string) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.rpc("approve_update_request", {
    req_id: reqId,
    note: note ?? null,
  });
  if (error) return { ok: false, message: error.message };
  revalidatePath("/dashboard/admin/approvals");
  revalidatePath("/dashboard");
  return { ok: true };
}

export async function rejectRequest(reqId: string, note?: string) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.rpc("reject_update_request", {
    req_id: reqId,
    note: note ?? null,
  });
  if (error) return { ok: false, message: error.message };
  revalidatePath("/dashboard/admin/approvals");
  revalidatePath("/dashboard");
  return { ok: true };
}

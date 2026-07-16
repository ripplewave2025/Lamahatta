"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/getProfile";

export async function markEnquiryRead(id: string) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_requests")
    .update({ status: "read" })
    .eq("id", id)
    .eq("status", "new");

  if (error) {
    return { ok: false as const, message: error.message };
  }
  revalidatePath("/dashboard/admin/enquiries");
  return { ok: true as const };
}

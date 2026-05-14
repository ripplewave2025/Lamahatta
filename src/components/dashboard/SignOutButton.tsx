"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/context/LanguageContext";

export default function SignOutButton() {
  const router = useRouter();
  const { t } = useLanguage();
  return (
    <button
      onClick={async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
      }}
      className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-red-600 transition-colors hover:text-red-500"
    >
      {t("account.signOut") || "Sign Out"}
    </button>
  );
}

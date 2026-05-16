"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LogOut, ShieldCheck, User, FileText, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/context/LanguageContext";

type AccountState =
  | { status: "signedOut" }
  | { status: "signedIn"; name: string; role: "villager" | "admin"; pendingCount?: number };

interface AccountPillProps {
  variant?: "light" | "dark";
}

export default function AccountPill({ variant = "dark" }: AccountPillProps) {
  const router = useRouter();
  const { t } = useLanguage();
  // Render Sign In immediately. If a session exists, useEffect will swap to the
  // name dropdown once getUser() resolves. Avoids the "breathing skeleton" on every page load.
  const [state, setState] = useState<AccountState>({ status: "signedOut" });
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!active) return;
      if (!user) {
        setState({ status: "signedOut" });
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, role")
        .eq("id", user.id)
        .single();

      const name = profile?.full_name || user.email?.split("@")[0] || "Member";
      const role: "villager" | "admin" = profile?.role === "admin" ? "admin" : "villager";

      let pendingCount: number | undefined;
      if (role === "admin") {
        const { count } = await supabase
          .from("household_update_requests")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending");
        pendingCount = count ?? 0;
      }

      if (active) setState({ status: "signedIn", name, role, pendingCount });
    };

    load();
    const { data: sub } = supabase.auth.onAuthStateChange(() => load());
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  if (state.status === "signedOut") {
    return (
      <Link
        href="/auth"
        className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${variant === "dark"
            ? "border-white/80 bg-white/95 text-stone-900 hover:bg-white"
            : "border-stone-200 bg-white text-stone-900 hover:bg-stone-100"
          }`}
      >
        {t("nav.signIn") || "Sign In"}
      </Link>
    );
  }

  const { name, role, pendingCount } = state;
  const isAdmin = role === "admin";

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${variant === "dark"
            ? "border-white/80 bg-white/95 text-stone-900 hover:bg-white"
            : "border-stone-200 bg-white text-stone-900 hover:bg-stone-100"
          }`}
      >
        {isAdmin ? <ShieldCheck className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
        <span className="max-w-[110px] truncate normal-case tracking-normal">{name}</span>
        {isAdmin && pendingCount && pendingCount > 0 ? (
          <span className="rounded-full bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
            {pendingCount}
          </span>
        ) : null}
        <ChevronDown className="h-3.5 w-3.5 opacity-70" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 top-12 w-60 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.12)]"
          >
            <div className="border-b border-stone-100 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500">
                {isAdmin ? t("account.adminRole") || "Samaj Head" : t("account.villagerRole") || "Villager"}
              </p>
              <p className="truncate text-sm font-semibold text-stone-900">{name}</p>
            </div>
            <nav className="p-2 text-sm text-stone-800">
              <DropdownLink href="/dashboard" icon={<User className="h-4 w-4" />} onClick={() => setOpen(false)}>
                {t("account.overview") || "Overview"}
              </DropdownLink>
              <DropdownLink href="/dashboard/household" icon={<User className="h-4 w-4" />} onClick={() => setOpen(false)}>
                {t("account.myHousehold") || "My Household"}
              </DropdownLink>
              <DropdownLink href="/dashboard/requests" icon={<FileText className="h-4 w-4" />} onClick={() => setOpen(false)}>
                {t("account.myRequests") || "Update Requests"}
              </DropdownLink>
              <DropdownLink href="/dashboard/directory" icon={<Users className="h-4 w-4" />} onClick={() => setOpen(false)}>
                {t("account.directory") || "Village Directory"}
              </DropdownLink>
              {isAdmin && (
                <>
                  <div className="my-2 border-t border-stone-100" />
                  <DropdownLink href="/dashboard/admin/approvals" icon={<ShieldCheck className="h-4 w-4" />} onClick={() => setOpen(false)}>
                    {t("account.approvals") || "Approvals"}
                    {pendingCount ? (
                      <span className="ml-auto rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white">
                        {pendingCount}
                      </span>
                    ) : null}
                  </DropdownLink>
                  <DropdownLink href="/dashboard/admin/households" icon={<Users className="h-4 w-4" />} onClick={() => setOpen(false)}>
                    {t("account.manageHouseholds") || "Manage Households"}
                  </DropdownLink>
                </>
              )}
              <div className="my-2 border-t border-stone-100" />
              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-red-600 transition hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                {t("account.signOut") || "Sign Out"}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DropdownLink({
  href,
  icon,
  onClick,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-stone-100"
    >
      {icon}
      <span className="flex flex-1 items-center">{children}</span>
    </Link>
  );
}

import Link from "next/link";
import { MessageSquareWarning } from "lucide-react";

export default function FloatingReportIssue() {
  return (
    <Link
      href="/voices"
      aria-label="Report a village issue"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber-400 text-stone-950 shadow-[0_18px_40px_rgba(0,0,0,0.22)] transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 md:h-auto md:w-auto md:gap-2 md:px-5 md:py-3"
    >
      <MessageSquareWarning className="h-5 w-5" />
      <span className="hidden text-xs font-bold uppercase tracking-[0.16em] md:inline">
        Report issue
      </span>
    </Link>
  );
}

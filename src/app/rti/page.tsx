import { redirect } from "next/navigation";

/** Short public URL — avoids deep-path confusion on local/prod. */
export default function RtiShortPage() {
  redirect("/governance/rti");
}

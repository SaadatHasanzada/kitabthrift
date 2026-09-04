import { getLocale } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "@/i18n/navigation";

export async function requireUser() {
  const supabase = await createClient();
  const locale = await getLocale();

  const { data } = await supabase.auth.getClaims();

  if (!data) {
    return redirect({ href: "/login", locale });
  }

  return data.claims;
}

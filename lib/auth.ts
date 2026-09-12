import { getLocale } from "next-intl/server";

import { redirect } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireUser() {
  const supabase = await createClient();
  const locale = await getLocale();

  const { data } = await supabase.auth.getClaims();

  if (!data) {
    return redirect({ href: "/login", locale });
  }

  return data.claims;
}

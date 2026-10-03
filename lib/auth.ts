import { getLocale } from "next-intl/server";

import { redirect } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/server";

async function getAuthContext() {
  const supabase = await createClient();
  const locale = await getLocale();

  const { data } = await supabase.auth.getClaims();

  return { claims: data?.claims, locale };
}

export async function requireUser() {
  const { claims, locale } = await getAuthContext();

  if (!claims) {
    return redirect({ href: "/login", locale });
  }

  return claims;
}

export async function requireGuest() {
  const { claims, locale } = await getAuthContext();

  if (claims) {
    return redirect({ href: "/my-books", locale });
  }
}

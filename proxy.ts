import { type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";
import { updateSession } from "@/lib/supabase/proxy";

const handleI18nRouting = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  // 1. next-intl decides the response: rewrite (en) or redirect (az).
  const response = handleI18nRouting(request);

  // 2. Supabase refreshes the auth token and writes its cookies onto that same
  //    response, so the locale decision and the session both survive.
  return await updateSession(request, response);
}

export const config = {
  // Must stay a plain string literal. Next statically analyses this at build
  // time — String.raw or any other expression fails with "Invalid segment
  // configuration export" and the matcher is dropped entirely.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

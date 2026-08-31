"use server";

import { createClient } from "@/lib/supabase/server";
import { getLocale } from "next-intl/server";
import { loginSchema, registerSchema } from "@/lib/validation/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "@/i18n/navigation";
import { headers } from "next/headers";
import { redirect as externalRedirect } from "next/navigation";

export type AuthState = { errorKey?: string; ok?: string } | null;

export async function login(
  _p: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const supabase = await createClient();
  const locale = await getLocale();

  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { errorKey: "genericError" };
  }

  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return {
      errorKey: error.message.includes("Invalid login")
        ? "invalidCredentials"
        : "genericError",
    };
  }

  revalidatePath("/", "layout");
  return redirect({ href: "/my-books", locale });
}

export async function register(
  _p: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const parsed = registerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { errorKey: "genericError" };
  }

  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { display_name: parsed.data.displayName },
      emailRedirectTo: `${origin}/api/auth/callback`,
    },
  });

  if (error) {
    if (error.message.includes("already registered"))
      return { errorKey: "emailInUse" };
    if (error.message.includes("Password")) return { errorKey: "weakPassword" };
    return { errorKey: "genericError" };
  }

  return { ok: "checkEmail" };
}

export async function signInWithGoogle() {
  const supabase = await createClient();
  const locale = await getLocale();
  const origin = (await headers()).get("origin");

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/api/auth/callback?next=/${locale}/my-books`,
    },
  });

  if (data?.url) externalRedirect(data.url);
}

export async function signOut() {
  const supabase = await createClient();
  const locale = await getLocale();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect({ href: "/", locale });
}

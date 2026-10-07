"use client";

import { startTransition, useActionState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { zodResolver } from "@hookform/resolvers/zod";

import { PasswordField } from "@/components/auth/password-field";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MutedText } from "@/components/ui/muted-text";
import { register } from "@/lib/actions/auth";
import { EMAIL_PLACEHOLDER } from "@/lib/constants";
import { registerSchema, type RegisterValues } from "@/lib/validation/auth";

export function RegisterForm() {
  const t = useTranslations("Auth");
  const tv = useTranslations("Validation");
  const locale = useLocale();

  const searchParams = useSearchParams();
  const confirmEmailError = searchParams.get("error");

  const [state, formAction, isPending] = useActionState(register, null);

  const errorKey = state?.errorKey ?? confirmEmailError ?? undefined;

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      displayName: "",
    },
  });

  function onSubmit(data: RegisterValues) {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    formData.append("locale", locale);
    startTransition(() => formAction(formData));
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="displayName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>{t("displayName")}</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                type="text"
                placeholder={t("displayNamePlaceholder")}
                autoComplete="name"
                className="px-5"
              />
              {fieldState.error?.message && (
                <FieldError>{tv(fieldState.error.message)}</FieldError>
              )}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>{t("email")}</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                type="email"
                placeholder={EMAIL_PLACEHOLDER}
                autoComplete="username"
                className="px-5"
              />
              {fieldState.error?.message && (
                <FieldError>{tv(fieldState.error.message)}</FieldError>
              )}
            </Field>
          )}
        />
        <PasswordField
          control={form.control}
          name="password"
          autoComplete="new-password"
          placeholder={t("newPasswordPlaceholder")}
        />
      </FieldGroup>
      {errorKey && <FieldError>{t(errorKey)}</FieldError>}
      {state?.ok && <MutedText>{t(state.ok)}</MutedText>}
      <Button
        type="submit"
        size="lg"
        className="mt-8 w-full"
        disabled={isPending}
      >
        {t("createAccount")}
      </Button>
    </form>
  );
}

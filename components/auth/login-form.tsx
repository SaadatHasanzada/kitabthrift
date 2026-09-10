"use client";

import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel, FieldGroup } from "@/components/ui/field";

import { EMAIL_PLACEHOLDER } from "@/lib/constants";
import { loginSchema, type LoginValues } from "@/lib/validation/auth";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const t = useTranslations("Auth");
  const tv = useTranslations("Validation");

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: LoginValues) {
    // Do something with the form values.
    console.log(data);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
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
                autoComplete="off"
                className="px-5"
              />
              {fieldState.error?.message && (
                <FieldError>{tv(fieldState.error.message)}</FieldError>
              )}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">{t("password")}</FieldLabel>
                <Link
                  href="/forgot-password"
                  className="text-sm text-brand-ink hover:text-ring"
                >
                  {t("forgotPassword")}
                </Link>
              </div>
              <InputGroup>
                <InputGroupInput
                  type={showPassword ? "text" : "password"}
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder={t("passwordPlaceholder")}
                  autoComplete="off"
                  className="px-5"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4.5" />
                    ) : (
                      <Eye className="size-4.5" />
                    )}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>

              {fieldState.error?.message && (
                <FieldError>{tv(fieldState.error.message)}</FieldError>
              )}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit" size="lg" className="mt-8 w-full">
        {t("signIn")}
      </Button>
    </form>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../ui/input";
import { Field, FieldError, FieldLabel, FieldGroup } from "../ui/field";

import { EMAIL_PLACEHOLDER } from "@/lib/constants";
import { loginSchema, type LoginValues } from "@/lib/validation/auth";

export function LoginForm() {
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
                className="px-5 py-2.5 rounded-full"
              />
              {fieldState.error?.message && (
                <FieldError>{tv(fieldState.error.message)}</FieldError>
              )}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}

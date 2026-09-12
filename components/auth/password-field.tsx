"use client";

import { useState } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useTranslations } from "next-intl";

import { Eye, EyeOff } from "lucide-react";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Link } from "@/i18n/navigation";

interface PasswordFieldProps<T extends FieldValues> {
  readonly control: Control<T>;
  readonly name: FieldPath<T>;
}

export function PasswordField<T extends FieldValues>({
  control,
  name,
}: PasswordFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const t = useTranslations("Auth");
  const tv = useTranslations("Validation");

  return (
    <Controller
      name={name}
      control={control}
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
              autoComplete="current-password"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton onClick={() => setShowPassword(!showPassword)}>
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
  );
}

import { z } from "zod";

const email = z
  .string()
  .min(1, { error: "required" })
  .pipe(z.email({ error: "emailInvalid" }));

export const loginSchema = z.object({
  email,
  password: z.string().min(1, { error: "required" }),
});

export const registerSchema = z.object({
  displayName: z
    .string()
    .min(1, { error: "required" })
    .min(2, { error: "displayNameTooShort" }),
  email,
  password: z
    .string()
    .min(1, { error: "required" })
    .min(6, { error: "weakPassword" }),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;

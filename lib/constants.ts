import { Compass, Library } from "lucide-react";

import { routing } from "@/i18n/routing";

export const EMAIL_PLACEHOLDER = "you@gmail.com";

export const QUOTE_MARKS = {
  open: "“",
  close: "”",
} as const;

export const languageNames: Record<(typeof routing.locales)[number], string> = {
  en: "English",
  az: "Azərbaycanca",
} as const;

export const navItems = [
  {
    id: 1,
    url: "/",
    key: "explore",
    icon: Compass,
  },
  { id: 2, url: "/my-books", key: "myBooks", icon: Library },
] as const;

export const loginQuote = {
  author: "Clarissa Pinkola Estés",
  bookName: "Women Who Run With the Wolves",
  quote:
    "Go out in the woods, go out. If you don't go out in the woods nothing will ever happen and your life will never begin.",
} as const;

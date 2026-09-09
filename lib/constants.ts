import { Compass, Library } from "lucide-react";

export const navItems = [
  {
    id: 1,
    url: "/",
    key: "explore",
    icon: Compass,
  },
  { id: 2, url: "/my-books", key: "myBooks", icon: Library },
] as const;

export const EMAIL_PLACEHOLDER = "you@gmail.com";

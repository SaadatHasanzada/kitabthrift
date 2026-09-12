import Image from "next/image";

import { Link } from "@/i18n/navigation";

export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        className="w-12 h-13 md:w-18 md:h-20"
        src="/logo.svg"
        alt="logo"
        width={80}
        height={80}
      />
      <span className="font-logo text-brand text-3xl desktop:text-4xl">
        kitabthrift
      </span>
    </Link>
  );
}

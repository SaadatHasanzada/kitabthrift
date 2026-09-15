import Image from "next/image";
import { useTranslations } from "next-intl";

import googleIcon from "@/assets/images/google-icon.svg";
import { Button } from "@/components/ui/button";

export function GoogleButton() {
  const t = useTranslations("Auth");

  return (
    <Button
      type="submit"
      variant="outline"
      size="lg"
      className="w-full items-center gap-3 font-bold text-foreground bg-card"
    >
      <Image className="size-5" src={googleIcon} alt="Google icon" />
      {t("continueWithGoogle")}
    </Button>
  );
}

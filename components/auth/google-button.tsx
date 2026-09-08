import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function GoogleButton() {
  const t = useTranslations("Auth");

  return (
    <Button
      type="submit"
      variant="outline"
      size="lg"
      className="items-center gap-3 text-base font-bold text-foreground h-auto py-2.5 w-full max-w-150 mx-auto bg-card rounded-full"
    >
      <Image
        className="w-5 h-5"
        src="/google-icon.svg"
        alt="Continue with google"
        width={20}
        height={20}
      />
      {t("continueWithGoogle")}
    </Button>
  );
}

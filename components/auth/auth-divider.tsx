import { useTranslations } from "next-intl";

import { MutedText } from "@/components/ui/muted-text";
import { Separator } from "@/components/ui/separator";

export function AuthDivider() {
  const t = useTranslations("General");

  return (
    <div className="flex items-center gap-3">
      <Separator className="flex-1" />
      <MutedText as="span" size="xs">
        {t("or").toUpperCase()}
      </MutedText>
      <Separator className="flex-1" />
    </div>
  );
}

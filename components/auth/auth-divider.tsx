import { useTranslations } from "next-intl";
import { Separator } from "../ui/separator";

export function AuthDivider() {
  const t = useTranslations("General");

  return (
    <div className="flex items-center gap-3">
      <Separator className="flex-1" />
      <span className="text-sm font-bold text-foreground/60">
        {t("or").toUpperCase()}
      </span>
      <Separator className="flex-1" />
    </div>
  );
}

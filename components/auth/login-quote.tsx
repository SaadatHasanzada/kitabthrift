import { useTranslations } from "next-intl";

import { MutedText } from "@/components/ui/muted-text";
import { LOGIN_QUOTE_AUTHOR, QUOTE_MARKS } from "@/lib/constants";

export function LoginQuote() {
  const t = useTranslations("Auth");
  const tg = useTranslations("General");

  return (
    <div className="relative">
      <figure className="mt-8">
        <blockquote className="text-2xl font-bold leading-[1.24] tracking-[-0.01em] text-pretty text-accent-foreground desktop:text-[28px]">
          <p>
            {QUOTE_MARKS.open}
            {t("loginQuote")}
            {QUOTE_MARKS.close}
          </p>
        </blockquote>
        <figcaption className="mt-3.5 block text-base font-medium text-accent-foreground">
          {LOGIN_QUOTE_AUTHOR}, <cite>{t("loginQuoteBookName")}</cite>
        </figcaption>
      </figure>
      <MutedText className="mt-5 max-w-77.5 font-medium desktop:mt-6">
        {tg("searchTitlesFromOpenLib")}
      </MutedText>
    </div>
  );
}

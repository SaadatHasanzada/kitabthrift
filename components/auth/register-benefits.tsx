import { useTranslations } from "next-intl";

import { MutedText } from "@/components/ui/muted-text";

interface Benefit {
  readonly titleKey: string;
  readonly descriptionKey: string;
}

const benefits: readonly Benefit[] = [
  {
    titleKey: "searchOpenLibraryTitle",
    descriptionKey: "searchOpenLibraryDescription",
  },
  {
    titleKey: "fourSimpleStatusesTitle",
    descriptionKey: "fourSimpleStatusesDescription",
  },
  {
    titleKey: "syncedToAccountTitle",
    descriptionKey: "syncedToAccountDescription",
  },
];

export function RegisterBenefits() {
  const t = useTranslations("Auth");

  return (
    <div className="relative z-999">
      <h2 className="text-[26px] font-bold text-brand mb-8 leading-[1.06] tracking-[-0.04em]">
        {t("threeThingsRightAway")}
      </h2>
      <ul className="flex flex-col gap-8">
        {benefits.map((benefit, index) => (
          <li key={benefit.titleKey} className="flex gap-4">
            <span className="font-bold grid size-10.5 shrink-0 place-items-center rounded-full bg-background text-lg text-primary">
              {index + 1}
            </span>
            <div>
              <span className="text-foreground font-bold text-lg">
                {t(benefit.titleKey)}
              </span>
              <MutedText>{t(benefit.descriptionKey)}</MutedText>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

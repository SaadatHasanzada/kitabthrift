import { useTranslations } from "next-intl";

import { MutedText } from "@/components/ui/muted-text";

interface AuthHeaderProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}

export function AuthHeader({ eyebrow, title, description }: AuthHeaderProps) {
  const t = useTranslations("Auth");

  return (
    <div>
      <span className="font-logo inline-block mb-1  text-[22px] text-primary">
        {t(eyebrow)}
      </span>
      <h1 className="text-[30px] font-bold text-brand mb-3 leading-[1.06] tracking-[-0.04em]">
        {t(title)}
      </h1>
      <MutedText>{t(description)}</MutedText>
    </div>
  );
}

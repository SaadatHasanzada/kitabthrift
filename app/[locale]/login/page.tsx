import { useTranslations } from "next-intl";

import { AuthDivider } from "@/components/auth/auth-divider";
import { AuthHeader } from "@/components/auth/auth-header";
import { BookStack } from "@/components/auth/book-stack";
import { GoogleButton } from "@/components/auth/google-button";
import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/layout/logo";
import { MutedText } from "@/components/ui/muted-text";
import { TextLink } from "@/components/ui/text-link";
import { LOGIN_QUOTE, QUOTE_MARKS } from "@/lib/constants";

export default function Login() {
  const t = useTranslations("Auth");
  const tg = useTranslations("General");

  return (
    <div className="flex flex-col desktop:flex-row">
      <section className="flex flex-1 flex-col gap-3 py-5 md:py-8 px-4 md:px-10 desktop:px-20 max-w-200">
        <Logo />
        <div className="flex flex-col gap-6">
          <AuthHeader
            eyebrow="welcomeBack"
            title="signInToShelf"
            description="yourReadingList"
          />
          <GoogleButton />
          <AuthDivider />
          <LoginForm />
          <p>
            {t("newHere")}{" "}
            <TextLink variant="emphasis" href="/create-account">
              {t("createAccount")}
            </TextLink>
          </p>
          <MutedText size="sm">{tg("bookDataFromOpenLib")}</MutedText>
        </div>
      </section>
      <section className="min-h-[488px] relative bg-accent flex-1  py-5 md:py-8 px-4 md:px-10 desktop:px-20 overflow-hidden">
        <div className="absolute -top-20 -right-[90px] size-[300px] rounded-full bg-blob-sage desktop:-top-[120px] desktop:-right-[140px] desktop:size-[520px]"></div>
        <div className="absolute -bottom-[50px] -left-10 size-40 rounded-full bg-secondary desktop:-bottom-[70px] desktop:-left-[60px] desktop:size-[260px]"></div>
        <BookStack />
        <div className="max-w-200">
          <figure className="relative mt-8">
            <blockquote className="font-bold text-xl leading-[1.24] tracking-[-0.01em] text-pretty text-accent-foreground lg:text-[28px]">
              <p>
                {QUOTE_MARKS.open}
                {LOGIN_QUOTE.quote}
                {QUOTE_MARKS.close}
              </p>
            </blockquote>
            <figcaption className="mt-3.5 not-italic block text-base  text-accent-foreground">
              {LOGIN_QUOTE.author}, <cite>{LOGIN_QUOTE.bookName}</cite>
            </figcaption>
          </figure>
          <MutedText className="relative mt-5 text-accent-foreground/75  max-w-[310px]">
            {tg("searchTitlesFromOpenLib")}
          </MutedText>
        </div>
      </section>
    </div>
  );
}

import { useTranslations } from "next-intl";

import { AuthDivider } from "@/components/auth/auth-divider";
import { AuthHeader } from "@/components/auth/auth-header";
import { GoogleButton } from "@/components/auth/google-button";
import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/layout/logo";
import { MutedText } from "@/components/ui/muted-text";
import { TextLink } from "@/components/ui/text-link";

export default function Login() {
  const t = useTranslations("Auth");
  const tg = useTranslations("General");

  return (
    <div className="flex flex-col desktop:flex-row">
      <section className="flex flex-col gap-3 py-5 md:py-8 px-4 md:px-10 desktop:px-20 max-w-200">
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
      <section className="max-w-200"></section>
    </div>
  );
}

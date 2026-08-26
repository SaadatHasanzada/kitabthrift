import { useTranslations } from "next-intl";

export default function MyBooksPage() {
  const t = useTranslations("MyBooksPage");

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans">
      <main className="flex flex-1 w-full flex-col items-center justify-center py-5 md:py-8 px-4 md:px-10 desktop:px-20 bg-background">
        <p className="text-maroon-deep text-lg">{t("comingSoon")}</p>
      </main>
    </div>
  );
}

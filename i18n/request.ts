import { notFound } from "next/navigation";
import * as rootParams from "next/root-params";
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

export default getRequestConfig(async ({ locale }) => {
  // `locale` is only set when it's passed explicitly, e.g. `getTranslations({locale})`
  if (!locale) {
    const paramValue = await rootParams.locale();

    if (!hasLocale(routing.locales, paramValue)) {
      notFound();
    }

    locale = paramValue;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

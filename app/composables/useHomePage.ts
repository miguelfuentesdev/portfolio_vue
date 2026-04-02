import { getHomePage } from "~/application/use-cases/get-home-page";
import { StrapiHomePageRepository } from "~/infrastructure/repositories/strapi-home-page.repository";

export function useHomePage() {
  const repository = new StrapiHomePageRepository();
  const { locale } = useI18n();

  return useAsyncData(
    () => `home-page-${locale.value}`,
    () => getHomePage(repository, locale.value),
    { watch: [locale] }
  );
}

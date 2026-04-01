import { getHomePage } from "~/application/use-cases/get-home-page";
import { StrapiHomePageRepository } from "~/infrastructure/repositories/strapi-home-page.repository";

export function useHomePage() {
  const repository = new StrapiHomePageRepository();

  return useAsyncData('home-page', () => getHomePage(repository));
}
import type { HomePage } from "~/domain/entities/home-page";
import type { HomePageRepository } from "../ports/home-page-repository";

export async function getHomePage(repository: HomePageRepository): Promise<HomePage> {
  return repository.getHomePage();
}
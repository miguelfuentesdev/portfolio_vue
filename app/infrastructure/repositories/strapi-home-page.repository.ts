import type { HomePageRepository } from "~/application/ports/home-page-repository";
import type { HomePage } from "~/domain/entities/home-page";
import { fetchStrapiHomePage } from "../api/strapi-client";
import { mapHomePageResponse } from "../mappers/home-page.mapper";

export class StrapiHomePageRepository implements HomePageRepository {
  async getHomePage(): Promise<HomePage> {
    const response = await fetchStrapiHomePage();
    return mapHomePageResponse(response);
  }
}
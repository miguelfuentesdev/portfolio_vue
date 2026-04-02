import type { StrapiHomePageResponseDto } from "./dto/strapi-home-page.dto";

const HOME_PAGE_QUERY =
  "https://cms-portfolio.mfuentesdev.com/api/home-page?populate[about][populate][pfp][populate]=*&populate[about][populate][socials][populate]=*&populate[experience][populate][experiences]=*&populate[skills][populate][skills][populate][icon][populate]=*&populate[projects][populate][projects][populate][thumbnail][populate]=*&populate[projects][populate][projects][populate][tech][populate][icon][populate]=*&populate[education][populate][educations][populate]=*&populate[contact][populate]=*";

export async function fetchStrapiHomePage(locale: string): Promise<StrapiHomePageResponseDto> {
  return $fetch<StrapiHomePageResponseDto>(HOME_PAGE_QUERY, {
    query: {
      locale
    }
  });
}
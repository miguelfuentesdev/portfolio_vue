import type { HomePage } from "~/domain/entities/home-page";

export interface HomePageRepository {
  getHomePage(locale: string): Promise<HomePage>;
}
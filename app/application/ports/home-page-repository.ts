import type { HomePage } from "~/domain/entities/home-page";

export interface HomePageRepository {
  getHomePage(): Promise<HomePage>;
}
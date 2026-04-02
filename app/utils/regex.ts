import { EMAIL_REGEX } from "~/constants/constants";

export default class RegexUtilities {
  static isValidEmail(email: string): boolean {
    return EMAIL_REGEX.test(email.trim());
  }
}
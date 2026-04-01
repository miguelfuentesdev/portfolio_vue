import type { AppTheme } from "~/types/AppTheme";

const THEME_STORAGE_KEY = 'portfolio-theme';

export function useTheme() {
  const theme = useState<AppTheme>('theme', () => 'light');
  
  function getSystemTheme(): AppTheme {
    if (!import.meta.client) {
      return 'light';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(value: AppTheme) {
    theme.value = value;

    if (!import.meta.client) {
      return;
    }

    document.documentElement.setAttribute('data-theme', value);
    document.documentElement.classList.toggle("dark", value === "dark");
    localStorage.setItem(THEME_STORAGE_KEY, value);
  }

  function initializeTheme() {
    if (!import.meta.client) {
      return;
    }

    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as AppTheme | null;
    const resolvedTheme = storedTheme ?? getSystemTheme();

    applyTheme(resolvedTheme);
  }

  function toggleTheme() {
    applyTheme(theme.value === 'light' ? 'dark' : 'light');
  }

  return {
    theme,
    initializeTheme,
    toggleTheme,
    applyTheme
  };
}
import type { AppTheme } from "~/types/AppTheme";

const THEME_STORAGE_KEY = 'portfolio-theme';

export function useTheme() {
  const themeCookie = useCookie<AppTheme>("theme", {
    default: () => 'light',
  });
  
  const theme = useState<AppTheme>('theme', () => themeCookie.value ?? 'light');
  
  function getSystemTheme(): AppTheme {
    if (!import.meta.client) {
      return 'light';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(value: AppTheme) {
    theme.value = value;
    themeCookie.value = value;

    if (!import.meta.client) {
      return;
    }

    document.documentElement.setAttribute('data-theme', value);
    document.documentElement.classList.toggle('dark', value === 'dark');
  }

  function initializeTheme() {
    const cookieTheme = themeCookie.value;

    if (cookieTheme) {
      theme.value = cookieTheme;
    } else {
      const resolvedTheme = getSystemTheme();
      theme.value = resolvedTheme;
      themeCookie.value = resolvedTheme;
    }
  
    if (import.meta.client) {
      document.documentElement.setAttribute("data-theme", theme.value);
      document.documentElement.classList.toggle("dark", theme.value === "dark");
    }  
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